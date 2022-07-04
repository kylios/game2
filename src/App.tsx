import React from 'react';
import './App.css';
import Canvas from './Canvas'
import Game, {
  Player,
  KeyboardController,
  RandomMotionController,
  Mountain,
  Tree
} from './game'

const GAME_WIDTH = 640
const GAME_HEIGHT = 480


interface Props {}
interface State {}

const TREE_DEF = {
  trunkDiameter: 6,
  circles: [
    {
      radius: 4,
      center: {
        x: -6,
        y: -5,
        z: 0
      }
    },
    {
      radius: 8,
      center: {
        x: 4,
        y: -3,
        z: 0
      }
    },
    {
      radius: 7,
      center: {
        x: -2,
        y: 4,
        z: 0
      }
    }
  ],
  bounds: {
    corner: {
      x: -8,
      y: -7,
      z: 0
    },
    width: 16,
    height: 14,
    depth: 0
  }
}


class App extends React.Component<Props, State> {

  private canvasRef = React.createRef<HTMLCanvasElement>()
  private game: Game | null = null
  private keyboardController = new KeyboardController()
  private randomMotionController = new RandomMotionController()

  componentDidMount() {

    const canvas = this.canvasRef.current
    if (canvas === null) {
      console.error('Could not get ref for <canvas>')
      return
    }

    const ctx = canvas.getContext('2d')
    if (ctx === null) {
      console.error('Cannot get rendering context for canvas')
      return
    }
    ctx.strokeText('hello world', 20, 20)
    this.game = new Game(GAME_WIDTH, GAME_HEIGHT, ctx)

    const player = new Player(this.game, GAME_WIDTH / 2, GAME_HEIGHT / 2)

    const mountain1 = new Mountain(this.game, 120, 120, {
      corner1: {
        x: 30,
        y: -30
      },
      corner2: {
        x: 80,
        y: 50
      },
      corner3: {
        x: -20,
        y: 60
      },
      height: 180,
      bounds: {
        corner: {
          x: -20,
          y: -30,
          z: 0
        },
        width: 100,
        height: 90,
        depth: 180
      }
    })
    const tree1 = new Tree(this.game, 280, 360, TREE_DEF)
    const tree2 = new Tree(this.game, 305, 360, TREE_DEF)
    const tree3 = new Tree(this.game, 330, 360, TREE_DEF)

    player.setMovementController(this.keyboardController)
    this.keyboardController.startCapturing()

    this.game.addObject(mountain1)
    this.game.addObject(player)
    this.game.addObject(tree1)
    this.game.addObject(tree2)
    this.game.addObject(tree3)
    this.game.start()
  }

  componentWillUnmount() {
    this.keyboardController.stopCapturing()
  }

  render() {
    return <div>
      <div>
        <Canvas width={GAME_WIDTH} height={GAME_HEIGHT} ref={this.canvasRef} />
      </div>
    </div>
  }
}

export default App;
