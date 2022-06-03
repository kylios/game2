import GameObject from './GameObject'
import Controller from './Controller'
import KeyboardController from './KeyboardController'
import RandomMotionController from './RandomMotionController'
import Player from './objects/Player'
import Mountain from './objects/Mountain'
import Tree from './objects/Tree'

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

class Game {
	private width: number
	private height: number
	private ctx: CanvasRenderingContext2D

	private objects: GameObject[] = []

	private bufferCanvas: HTMLCanvasElement = document.createElement('canvas')
	private bufferCtx: CanvasRenderingContext2D

	constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
		this.width = width
		this.height = height
		this.ctx = ctx

		console.log(this.width, this.height)

		this.bufferCanvas.width = this.width
		this.bufferCanvas.height = this.height

		this.bufferCtx = this.bufferCanvas.getContext('2d')!
	}

	addObject(gameObject: GameObject): void {
		this.objects.push(gameObject)
	}

	start() {
		window.requestAnimationFrame(this.updateLoop.bind(this))
	}

	_clearBuffer() {
		this.bufferCtx.fillStyle = 'white'
		this.bufferCtx.fillRect(0, 0, this.width, this.height)
	}

	updateLoop() {
		// Perform state updates on each game object
		this.objects.forEach(object => object.update())

		this._clearBuffer()

		// this.ctx.clearRect(0, 0, this.width, this.height)
		this.objects.forEach(object => object.render(this.bufferCtx))
		this.ctx.drawImage(this.bufferCanvas, 0, 0)

		window.requestAnimationFrame(this.updateLoop.bind(this))
		// setTimeout(this.updateLoop.bind(this), 0)
	}
}

export default Game
export {
	GameObject,
	Controller,
	KeyboardController,
	Player,
	Mountain,
	Tree,
	RandomMotionController
}
