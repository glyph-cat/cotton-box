import { IDisposable, Nullable } from '@glyph-cat/foundation'
import { SimpleFiniteStateManager, SimpleStateManager } from 'cotton-box'
import { useSimpleStateValue, useStateValue } from 'cotton-box-react'
import { produce } from 'immer'
import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
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
    setGameInstance(null)
  }, [gameInstance])

  const resetAndStartNewGame = useCallback(() => {
    endCurrentGame()
    startNewGame()
  }, [endCurrentGame, startNewGame])

  // TODO: Show a banner at start of game indicating who starts first

  return (
    <div className={styles.container}>
      {gameInstance ? (
        <GameInstanceContext value={gameInstance}>
          <div className={styles.gameContainer}>
            <HeadsUpDisplay
              onExit={endCurrentGame}
              onReset={resetAndStartNewGame}
            />
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

interface HeadsUpDisplayProps {
  onExit(): void
  onReset(): void
}

function HeadsUpDisplay({
  onReset,
  onExit,
}: HeadsUpDisplayProps): ReactNode {
  const gameInstance = useGameInstance()
  const hasConcluded = useSimpleStateValue(
    gameInstance.state,
    (s) => s === GameInstanceState.CONCLUDED,
  )
  const isPlayersTurn = usePlayersTurn(gameInstance)
  const winner = useSimpleStateValue(gameInstance.winInfo, (s) => s?.winner)
  return (
    <div style={{
      alignItems: 'center',
      display: 'grid',
      gap: 10,
      gridAutoColumns: 'auto',
      gridTemplateColumns: '1fr repeat(2, auto)',
      width: '100%',
      paddingInline: 30,
    }}>
      <span style={{
        fontSize: '20pt',
        fontWeight: 'bold',
      }}>
        {hasConcluded
          ? winner === gameInstance.playerSymbol
            ? 'Congratulations, you won!'
            : winner === gameInstance.botSymbol
              ? 'The bot has won!'
              : 'It\'s a tie!'
          : isPlayersTurn ? 'It\'s your turn' : 'The bot is thinking'
        }
      </span>
      <button
        className={styles.menuButton}
        onClick={onReset}
      >Reset</button>
      <button
        className={styles.menuButton}
        onClick={onExit}
      >Quit</button>
    </div>
  )
}

function GameBoard(): ReactNode {
  const gameInstance = useGameInstance()
  const tiles = useStateValue(gameInstance.tiles)
  return (
    <div
      className={styles.gameBoard}
      style={{
        '--marker-preview-symbol': `"${gameInstance.playerSymbol === 'x' ? '╳' : '◯'}"`,
        '--marker-preview-color': gameInstance.playerSymbol === 'x' ? '#ff2b80' : '#2b80ff',
      }}
    >
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
  const highlightPattern = useSimpleStateValue(gameInstance.winInfo, (s) => s?.pattern)
  return (
    <button
      className={styles.gameTile}
      onClick={useCallback(() => {
        gameInstance.onSelectTile(index)
      }, [gameInstance])}
      disabled={!!value || !isPlayersTurn || !isActive}
      data-marker={value}
      data-highlight={highlightPattern?.has(index)}
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

interface IWinInfo {
  winner: XO
  pattern: Set<number>
}

enum GameInstanceState {
  ONGOING,
  CONCLUDED,
  DISPOSED,
}

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

  readonly winInfo = new SimpleStateManager<Nullable<IWinInfo>>(null)

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
    await delay(getRandomNumber(500, 1500))
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
    let victoryPattern: Set<number> | undefined

    // Player wins
    victoryPattern = findVictoryPattern(this.playerSymbol, tiles)
    if (victoryPattern) {
      this.conclude(this.playerSymbol, victoryPattern)
      return
    }

    // Bot wins
    victoryPattern = findVictoryPattern(this.botSymbol, tiles)
    if (victoryPattern) {
      this.conclude(this.botSymbol, victoryPattern)
      return
    }

    // Tie
    if (tiles.every((tile) => tile)) {
      this.conclude('', new Set())
      return
    }

    // Can proceed to next turn
    this.currentTurnSymbol.set((currentTurnSymbol) => {
      return currentTurnSymbol === this.playerSymbol
        ? this.botSymbol
        : this.playerSymbol
    })

  }

  private conclude(winner: XO, pattern: Set<number>): void {
    this.stopBot()
    this.winInfo.set({ winner, pattern })
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

const VICTORY_PATTERNS = [
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
].map((pattern) => getPatternIndices('*', pattern))

function getPatternIndices(symbol: string, tiles: Array<string>): Set<number> {
  return tiles.reduce((acc, tile, index) => {
    if (tile === symbol) {
      acc.add(index)
    }
    return acc
  }, new Set<number>())
}

function findVictoryPattern(symbol: XO, tiles: IGameTiles): Set<number> | undefined {
  const serializedTiles = getPatternIndices(symbol, tiles)
  return VICTORY_PATTERNS.find((victoryPattern) => {
    return victoryPattern.isSubsetOf(serializedTiles)
  })
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
