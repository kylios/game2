import React from 'react';
import './App.css';
import Canvas from './Canvas'
import Game, { Player, KeyboardController, RandomMotionController } from './game'

const GAME_WIDTH = 640
const GAME_HEIGHT = 480


interface Props {}
interface State {}


class App extends React.Component<Props, State> {

  private canvasRef = React.createRef<HTMLCanvasElement>()
  private game: Game | null = null
  private keyboardController = new KeyboardController()
  private randomMotionController = new RandomMotionController()
  private player = new Player(GAME_WIDTH / 2, GAME_HEIGHT / 2)

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
    this.player.setMovementController(this.keyboardController)
    this.keyboardController.startCapturing()

    this.game.addObject(this.player)
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
