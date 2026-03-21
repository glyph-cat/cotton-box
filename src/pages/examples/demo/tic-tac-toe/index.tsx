import { IDisposable, Nullable } from '@glyph-cat/foundation'
import { SimpleFiniteStateManager, SimpleStateManager } from 'cotton-box'
import { useSimpleStateValue, useSimpleStateValueOnly, useStateValue } from 'cotton-box-react'
import { produce } from 'immer'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import styles from './index.module.css'

export default function App(): ReactNode {

  const [gameInstance, setGameInstance] = useState<Nullable<GameInstance>>(null)

  const startNewGame = useCallback(() => {
    const playerStartsFirst = getRandomNumber(0, 10) % 2 === 0
    const newGameInstance = new GameInstance(playerStartsFirst)
    setGameInstance(newGameInstance)
  }, [])

  const endCurrentGame = useCallback(() => {
    gameInstance?.dispose()
  }, [])

  return (
    <div className={styles.container}>
      {gameInstance ? (
        <GameInstanceContext value={gameInstance}>
          <div className={styles.gameContainer}>
            <InstructionBoard />
            <GameBoard />
          </div>
        </GameInstanceContext>
      ) : (
        <div className={styles.mainMenu}>
          <h1>Tic-Tac-Toe</h1>
          <button
            className={styles.menuButton}
            onClick={startNewGame}
          >Start</button>
        </div>
      )}
    </div>
  )
}

function InstructionBoard(): ReactNode {
  const gameInstance = useGameInstance()
  const isPlayersTurn = usePlayersTurn(gameInstance)
  return (
    <div style={{
      display: 'grid',
      fontSize: '24pt',
      fontWeight: 'bold',
      textAlign: 'center',
    }}>
      {isPlayersTurn ? 'It\'s your turn' : 'Please wait a moment'}
    </div>
  )
}

function GameBoard(): ReactNode {
  const gameInstance = useGameInstance()
  const tiles = useStateValue(gameInstance.tiles)
  return (
    <div className={styles.gameBoard}>
      {tiles.map((tile, index) => (
        <Tile
          key={index}
          value={tile}
          index={index}
        />
      ))}
    </div>
  )
}

interface TileProps {
  value: XO
  index: number
}

function Tile({
  value,
  index,
}: TileProps): ReactNode {
  const gameInstance = useGameInstance()
  const isPlayersTurn = usePlayersTurn(gameInstance)
  const isActive = useStateValue(
    gameInstance.state,
    (state) => state === GameInstanceState.ONGOING,
  )
  return (
    <button
      className={styles.gameTile}
      onClick={useCallback(() => {
        gameInstance.onSelectTile(index)
      }, [])}
      disabled={!!value || !isPlayersTurn || !isActive}
      data-marker={value}
    >
      {value === 'x' ? '╳' : (value === 'o' ? '◯' : '')}
    </button>
  )
}

const GameInstanceContext = createContext<Nullable<GameInstance>>(null)

function useGameInstance(): GameInstance {
  const gameInstance = useContext(GameInstanceContext)
  if (!gameInstance) {
    throw new Error('`useGameInstance` can only be called inside <GameInstanceContext>')
  }
  return gameInstance
}

type XO = 'x' | 'o' | ''

type IGameTiles = [
  XO, XO, XO,
  XO, XO, XO,
  XO, XO, XO,
]

enum GameInstanceState {
  ONGOING,
  CONCLUDED,
  DISPOSED,
}

type ConcludeType = 'TIE' | XO

class GameInstance implements IDisposable {

  readonly state = new SimpleFiniteStateManager(GameInstanceState.ONGOING, [
    [GameInstanceState.ONGOING, GameInstanceState.CONCLUDED],
    [GameInstanceState.ONGOING, GameInstanceState.DISPOSED],
    [GameInstanceState.CONCLUDED, GameInstanceState.DISPOSED],
  ], {
    name: 'GameInstance',
    serializeState: (state) => GameInstanceState[state] ?? String(state),
  })

  readonly tiles = new SimpleStateManager<IGameTiles>([
    '', '', '',
    '', '', '',
    '', '', '',
  ])

  readonly currentTurnSymbol = new SimpleStateManager<XO>('x')

  // readonly victoryState

  readonly playerSymbol: XO
  readonly botSymbol: XO

  readonly stopBot: () => void

  constructor(playerStartsFirst: boolean) {
    this.playerSymbol = playerStartsFirst ? 'x' : 'o'
    this.botSymbol = playerStartsFirst ? 'o' : 'x'
    if (!playerStartsFirst) {
      this.performBotTurn()
    }
    this.stopBot = this.currentTurnSymbol.watch(async (currentTurnSymbol) => {
      if (currentTurnSymbol !== this.playerSymbol) {
        this.performBotTurn()
      }
    })
  }

  onSelectTile(index: number): void {
    this.tiles.set((prevTiles) => {
      if (prevTiles[index]) {
        // This is not supposed to happen
        throw new Error(`Tile at index ${index} is already marked with ${prevTiles[index]}`)
      }
      return produce(prevTiles, (nextTiles) => {
        nextTiles[index] = this.playerSymbol
        return nextTiles
      })
    })
    this.commitTurn()
  }

  private async performBotTurn(): Promise<void> {
    await delay(getRandomNumber(250, 750))
    this.tiles.set((prevTiles) => {
      // Find empty tiles
      const availableTileIndices = prevTiles.map((tile, index) => {
        return tile ? null : index
      }).filter(Boolean) as Array<number>
      const indexOfTileToFill = availableTileIndices[
        getRandomNumber(0, availableTileIndices.length - 1)
      ]
      return produce(prevTiles, (nextTiles) => {
        nextTiles[indexOfTileToFill] = this.botSymbol
        return nextTiles
      })
    })
    this.commitTurn()
  }

  private commitTurn(): void {
    const tiles = this.tiles.get()
    if (hasVictoryPattern(this.playerSymbol, tiles)) {
      // Player wins
      this.conclude(this.playerSymbol)
      alert('Player wins')
    } else if (hasVictoryPattern(this.botSymbol, tiles)) {
      // Bot wins
      this.conclude(this.botSymbol)
      alert('Bot wins')
    } else if (tiles.every((tile) => tile)) {
      // Tie
      this.conclude(null)
      alert('Tie')
    } else {
      this.currentTurnSymbol.set((currentTurnSymbol) => {
        return currentTurnSymbol === this.playerSymbol
          ? this.botSymbol
          : this.playerSymbol
      })
    }
  }

  private conclude(winner: Nullable<XO>): void {
    this.stopBot()
    this.state.set(GameInstanceState.CONCLUDED)
  }

  dispose(): void {
    this.currentTurnSymbol.dispose()
    this.tiles.dispose()
    this.state.dispose()
  }

}

function usePlayersTurn(gameInstance: GameInstance): boolean {
  const isPlayersTurn = useSimpleStateValue(
    gameInstance.currentTurnSymbol,
    (currentTurnSymbol) => currentTurnSymbol === gameInstance.playerSymbol
  )
  return isPlayersTurn
}

const VICTORY_PATTERNS = new Set([
  [
    '*', '*', '*',
    '', '', '',
    '', '', '',
  ],
  [
    '', '', '',
    '*', '*', '*',
    '', '', '',
  ],
  [
    '', '', '',
    '', '', '',
    '*', '*', '*',
  ],
  [
    '*', '', '',
    '*', '', '',
    '*', '', '',
  ],
  [
    '', '*', '',
    '', '*', '',
    '', '*', '',
  ],
  [
    '', '', '*',
    '', '', '*',
    '', '', '*',
  ],
  [
    '*', '', '',
    '', '*', '',
    '', '', '*',
  ],
  [
    '', '', '*',
    '', '*', '',
    '*', '', '',
  ],
].map((pattern) => serializePattern('*', pattern)))

function serializePattern(symbol: string, tiles: Array<string>): string {
  return tiles.reduce((acc, tile, index) => {
    if (tile === symbol) {
      acc.push(index)
    }
    return acc
  }, [] as Array<number>).join(',')
}

function hasVictoryPattern(symbol: XO, tiles: IGameTiles): boolean {
  const serializedTiles = serializePattern(symbol, tiles)
  return VICTORY_PATTERNS.has(serializedTiles)
}

/**
 * @returns a promise that resolves after the specified timeout.
 */
function delay(timeout: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

/**
 * @returns a random number `minimumValue` and `maximumValue`.
 */
function getRandomNumber(
  minimumValue: number,
  maximumValue: number,
): number {
  return minimumValue + Math.round(Math.random() * maximumValue)
}
