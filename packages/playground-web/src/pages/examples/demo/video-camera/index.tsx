import { Dimension2D, IDisposable, Nullable } from '@glyph-cat/foundation'
import { isFunction } from '@glyph-cat/type-checking'
import { ReadOnlyStateManager, SimpleFiniteStateManager, SimpleStateManager } from 'cotton-box'
import { useSimpleStateValue } from 'cotton-box-react'
import { ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react'
import styles from './index.module.css'

export default function App(): ReactNode {
  const [videoCamera, setVideoCamera] = useState<Nullable<VideoCamera>>(null)
  useEffect(() => {
    // Defer instantiation of VideoCamera as relies on some browser-only APIs.
    const newVideoCamera = new VideoCamera()
    setVideoCamera(newVideoCamera)
    return () => { newVideoCamera.dispose() }
  }, [])
  return videoCamera && <DeferredContent videoCamera={videoCamera} />
}

interface DeferredContentProps {
  videoCamera: VideoCamera
}

function DeferredContent({ videoCamera }: DeferredContentProps): ReactNode {

  const videoCameraState = useSimpleStateValue(videoCamera.state)

  const startCamera = useCallback(async () => {
    await videoCamera.start(VideoCamera.DEFAULT_CONSTRAINTS)
  }, [videoCamera])

  const stopCamera = useCallback(async () => {
    await videoCamera.stop()
  }, [videoCamera])

  const disposeCamera = useCallback(async () => {
    await videoCamera.dispose()
  }, [videoCamera])

  const triggerOverconstrainedError = useCallback(async () => {
    try {
      await videoCamera.start(VideoCamera.createConstraintWithExactDeviceId('xyz'))
    } catch (e) {
      console.error(e)
    }
  }, [videoCamera])

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <span>
          {'state: '}
          <code>{VideoCamera.State[videoCameraState]}</code>
        </span>
        <div className={styles.cameraDisplayContainer}>
          <CameraDisplay videoCamera={videoCamera} />
          {videoCameraState === VideoCamera.State.STARTING && (
            <div style={{
              display: 'grid',
              placeItems: 'center',
              position: 'absolute',
              height: '100%',
              width: '100%',
              top: 0,
              left: 0,
            }}>
              <Spinner />
            </div>
          )}
        </div>
        <div style={{ gap: 10, width: '100%' }}>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={startCamera}
              style={{ '--color': '#2b80ff' }}
              disabled={
                videoCameraState !== VideoCamera.State.CREATED &&
                videoCameraState !== VideoCamera.State.STOPPED
              }
            >
              Start
            </button>
            <button
              className={styles.button}
              onClick={stopCamera}
              disabled={videoCameraState !== VideoCamera.State.STARTED}
            >
              Stop
            </button>
            <button
              className={styles.button}
              onClick={disposeCamera}
              disabled={videoCameraState === VideoCamera.State.DISPOSED}
            >
              Dispose
            </button>
          </div>
          <div style={{ marginTop: 10 }}>
            <button
              className={styles.button}
              onClick={triggerOverconstrainedError}
              style={{ '--color': '#ff4b4b', width: '100%' }}
              disabled={
                videoCameraState !== VideoCamera.State.CREATED &&
                videoCameraState !== VideoCamera.State.STOPPED
              }
            >
              Start (OverconstrainedError)
            </button>
          </div>
        </div>
      </div>
    </div>
  )

}

class VideoCamera implements IDisposable {

  static readonly DEFAULT_CONSTRAINTS: MediaStreamConstraints = {
    video: {
      facingMode: 'user',
      height: { min: 240, ideal: 240 },
      width: { min: 320, ideal: 320 },
    },
  }

  static createConstraintWithExactDeviceId(
    deviceId: string,
    otherOptions?: Omit<MediaStreamConstraints, 'video'>
  ): MediaStreamConstraints {
    return {
      ...otherOptions,
      video: {
        deviceId: {
          exact: deviceId,
        },
      },
    }
  }

  private _mediaStream?: MediaStream

  private readonly _state = new SimpleFiniteStateManager(VideoCamera.State.CREATED, [
    [VideoCamera.State.CREATED, VideoCamera.State.STARTING],
    [VideoCamera.State.CREATED, VideoCamera.State.DISPOSED],
    [VideoCamera.State.STARTING, VideoCamera.State.STARTED],
    [VideoCamera.State.STARTING, VideoCamera.State.DENIED],
    [VideoCamera.State.STARTING, VideoCamera.State.OVERCONSTRAINED],
    [VideoCamera.State.DENIED, VideoCamera.State.DISPOSED],
    [VideoCamera.State.OVERCONSTRAINED, VideoCamera.State.DISPOSED],
    [VideoCamera.State.STARTED, VideoCamera.State.STOPPED],
    [VideoCamera.State.STARTED, VideoCamera.State.DENIED],
    [VideoCamera.State.STOPPED, VideoCamera.State.STARTING],
    [VideoCamera.State.STOPPED, VideoCamera.State.DISPOSED],
  ], {
    name: 'VideoCamera',
    serializeState: (value) => String(VideoCamera.State[value] ?? value),
  })

  get state(): ReadOnlyStateManager<VideoCamera.State> {
    return this._state
  }

  private readonly _videoDimensions = new SimpleStateManager<Dimension2D>({
    height: 0,
    width: 0,
  })

  get videoDimensions(): ReadOnlyStateManager<Dimension2D> {
    return this._videoDimensions
  }

  readonly videoElement: HTMLVideoElement

  constructor(appendVideoElement = false) {
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.dispose = this.dispose.bind(this)
    this.videoElement = document.createElement('video')
    this.videoElement.className = styles.hidden
    this.videoElement.controls = false
    this.videoElement.muted = true
    if (appendVideoElement) {
      document.body.append(this.videoElement)
    }
  }

  /**
   * @returns `true` if the operation is successful. Returns `false` if the
   * camera is starting, has already been started, or if permission is denied.
   */
  async start(constraints: MediaStreamConstraints): Promise<boolean> {
    if (!this._state.trySet(VideoCamera.State.STARTING)) {
      return false // Early exit
    }
    try {
      this._mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
      this.videoElement.srcObject = this._mediaStream
      await this.videoElement.play()
      this._videoDimensions.set({
        height: this.videoElement.videoHeight,
        width: this.videoElement.videoWidth,
      })
      this.videoElement.height = this.videoElement.videoHeight
      this.videoElement.width = this.videoElement.videoWidth
      return this._state.trySet(VideoCamera.State.STARTED)
    } catch (error) {
      if (error instanceof OverconstrainedError) {
        this._state.set(VideoCamera.State.OVERCONSTRAINED)
      } else if (error instanceof DOMException) {
        this._state.set(VideoCamera.State.DENIED)
      } else {
        throw error
      }
      return false
    }
  }

  /**
   * @returns `false` if the camera is already stopped, otherwise `true`.
   */
  async stop(): Promise<boolean> {
    await this._state.wait((s) => s !== VideoCamera.State.STARTING)
    return this._stopBase()
  }

  /**
   * @returns A promise that resolves to `false` if the instance is already disposed,
   * otherwise `true`.
   */
  async dispose(): Promise<boolean> {
    await this.state.wait((s) => s !== VideoCamera.State.STARTING)
    this._stopBase()
    this.videoElement?.remove()
    this._videoDimensions.dispose()
    const payload = this._state.trySet(VideoCamera.State.DISPOSED)
    this._state.dispose()
    return payload
  }

  private _stopBase(): boolean {
    // Ref: https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/stop
    if (isFunction(this._mediaStream?.getTracks)) {
      this._mediaStream.getTracks().forEach((track) => track.stop())
    }
    this.videoElement.pause()
    return this._state.trySet(VideoCamera.State.STOPPED)
  }

}

namespace VideoCamera {

  export enum State {
    CREATED,
    STARTING,
    DENIED,
    OVERCONSTRAINED,
    STARTED,
    STOPPED,
    DISPOSED,
  }

}

interface CameraDisplayProps {
  videoCamera: VideoCamera
}

function CameraDisplay({
  videoCamera,
}: CameraDisplayProps): ReactNode {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasDimensions = useCanvasDimensions()

  useLayoutEffect(() => {

    let shouldRun = true
    let lastRequestedAnimationFrame: number

    const cb = () => {

      const canvasContext = canvasRef.current?.getContext('2d')
      if (canvasContext) {

        // NOTE: We do not need to call `clearRect` because the entire canvas
        // will be repainted, either with a new video frame or solid black
        // if no `videoCamera` is provided.

        if (
          videoCamera &&
          videoCamera.state.get() === VideoCamera.State.STARTED
        ) {
          canvasContext.save()
          canvasContext.scale(-1, 1)
          canvasContext.translate(-canvasDimensions.width, 0)
          canvasContext.drawImage(
            videoCamera.videoElement,
            0, 0, canvasDimensions.width, canvasDimensions.height
          )
          canvasContext.restore()
        } else {
          canvasContext.fillStyle = '#000000'
          canvasContext.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height)
        }

      }

      if (shouldRun) { lastRequestedAnimationFrame = requestAnimationFrame(cb) }
    }
    lastRequestedAnimationFrame = requestAnimationFrame(cb)
    return () => {
      shouldRun = false
      cancelAnimationFrame(lastRequestedAnimationFrame)
    }

  }, [canvasDimensions.height, canvasDimensions.width, videoCamera])

  return (
    <canvas
      ref={canvasRef}
      style={{ borderRadius: 5 }}
      {...canvasDimensions}
    />
  )
}

const DEFAULT_WINDOW_DIMENSIONS: Dimension2D = { height: 0, width: 0 }


/**
 * @returns The dimensions that should be used to display the player's camera.
 */
function useCanvasDimensions(): Dimension2D {
  const [windowDimensions, updateWindowDimensions] = useReducer(
    getWindowDimensions,
    DEFAULT_WINDOW_DIMENSIONS,
    getWindowDimensions,
  )
  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions)
    return () => { window.removeEventListener('resize', updateWindowDimensions) }
  }, [])
  const vmin = Math.min(windowDimensions.height, windowDimensions.width)
  return useMemo(() => {
    const width = clamp(Math.round(0.35 * vmin), 320, 600)
    const height = clamp(Math.round(width / 4 * 3), 240, 800)
    return { height, width }
  }, [vmin])
}

function clamp(value: number, lowerBound: number, upperBound: number): number {
  return Math.min(Math.max(lowerBound, value), upperBound)
}

function getWindowDimensions(): Dimension2D {
  if (typeof document !== 'undefined') {
    return {
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth,
    }
  } else {
    return DEFAULT_WINDOW_DIMENSIONS
  }
}


// ====================================================

export function Spinner(): ReactNode {

  // const { palette } = useThemeContext()

  // const tint = Color
  //   .fromString(tryResolvePaletteColor($color, palette, palette.primaryColor))
  //   .toString(ColorFormat.FFFFFF, { suppressAlphaInShortFormats: true })
  // const effectiveSize = isNumber(size) ? size : ((size && sizePresets[size]) ?? sizePresets.m)
  // const indeterminate = !isNumber(value)
  // let clampedValue = indeterminate ? minValue : Math.max(minValue, value)
  // if (!allowOvershoot) { clampedValue = indeterminate ? maxValue : Math.min(value, maxValue) }
  // const angle = indeterminate ? 0 : 360 * getPercentage(clampedValue, minValue, maxValue)
  // const angle = indeterminate ? 0 : (360 * getPercentage(clampedValue, minValue, maxValue)) % 360
  // KIV: Do we need % 360? (and assign background color to the ring when > 360)

  // const containerRef = useRef<View>(null!)
  // useEffect(() => {
  //   const tint = new Color(tryResolvePaletteColor($color, palette, palette.primaryColor))
  //   return injectInlineCSSVariables({
  //     [__TINT]: tint.toString(),
  //     [__TINT_40]: tint.asRGB().transform((prevValues) => ({
  //       ...prevValues,
  //       a: 0.4,
  //     })).toString(),
  //     [__SIZE]: effectiveSize,
  //     [__THICKNESS]: px(thickness),
  //     ...(indeterminate ? {} : { [__ANGLE]: `${angle}deg` })
  //   }, containerRef.current)
  // }, [$color, angle, effectiveSize, indeterminate, palette, thickness])

  return (
    <div
      className={styles.spinner}
      role='progressbar'
      aria-busy={true}
    >
      {/* <div className={styles.cap} /> */}
      <div className={styles.spinnerTrailingCapContainer}>
        <div className={styles.spinnerCap} />
      </div>
    </div>
  )
}

