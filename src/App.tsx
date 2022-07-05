import React from 'react';
import './App.css';
import Canvas from './Canvas'
import Game, {
  Player,
  KeyboardController,
  RandomMotionController,
  Mountain,
  Tree,
  generateRandomTreeDef
} from './game'

const GAME_WIDTH = 640
const GAME_HEIGHT = 480

interface Props {}
interface State {}

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
    const tree1 = new Tree(this.game, 280, 360, generateRandomTreeDef(32, 32, 8))
    const tree2 = new Tree(this.game, 312, 360, generateRandomTreeDef(32, 32, 8))
    const tree3 = new Tree(this.game, 344, 360, generateRandomTreeDef(32, 32, 8))
    const tree4 = new Tree(this.game, 312, 392, generateRandomTreeDef(32, 32, 8))
    const tree5 = new Tree(this.game, 312, 424, generateRandomTreeDef(32, 32, 8))

    player.setMovementController(this.keyboardController)
    this.keyboardController.startCapturing()

    this.game.addObject(mountain1)
    this.game.addObject(player)
    this.game.addObject(tree1)
    this.game.addObject(tree2)
    this.game.addObject(tree3)
    this.game.addObject(tree4)
    this.game.addObject(tree5)
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
