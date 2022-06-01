import GameObject from './GameObject'
import Controller from './Controller'

const PLAYER_WIDTH: number = 16
const PLAYER_HEIGHT: number = 16

const PLAYER_COLOR: string = 'red'


interface Dictionary<T> {
    [Key: string]: T;
}

const logOnce = (() => {
	const logged: Dictionary<boolean> = {}
	return function _logOnce(toLog: any): void {
		const key = `${toLog}`
		if (!logged[key]) {
			console.log(toLog)
			logged[key] = true
		}
	}
})()

class Player extends GameObject {
	private movementController: Controller | null = null

	setMovementController(movementController: Controller) {
		this.movementController = movementController
	}

	update(): void {
		if (this.movementController !== null) {
			this.movementController.update(this)
		}
	}

	render(ctx: CanvasRenderingContext2D): void {
		ctx.save()

		ctx.beginPath()
		ctx.fillStyle = PLAYER_COLOR
		ctx.lineWidth = 1
		ctx.rect(this.x - PLAYER_WIDTH / 2.0, this.y - PLAYER_HEIGHT / 2.0, PLAYER_WIDTH, PLAYER_HEIGHT)
		ctx.fill()

		ctx.fillStyle = 'black'
		ctx.fillText(`${this.x}, ${this.y}`, 20, 20)

		ctx.restore()
	}
}

export default Player