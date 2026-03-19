import { StateManager } from 'cotton-box'
import { useStateValue } from 'cotton-box-react'
import { ReactNode, useCallback } from 'react'
import styles from './index.module.css'

type XO = 'x' | 'o' | ''

interface IGameState {
  tiles: [
    XO, XO, XO,
    XO, XO, XO,
    XO, XO, XO,
  ]
}

const GameState = new StateManager<IGameState>({
  tiles: [
    '', '', '',
    '', '', '',
    '', '', '',
  ],
})

export default function App(): ReactNode {
  const { tiles } = useStateValue(GameState)
  return (
    <div className={styles.container}>
      <div className={styles.gameBoard}>
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            value={tile}
            index={index}
          />
        ))}
      </div>
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
  return (
    <div
      className={styles.gameTile}
      onClick={useCallback(() => {
        // GameState.set((prevState) => { })
      }, [])}
    >
      {value}
    </div>
  )
}
