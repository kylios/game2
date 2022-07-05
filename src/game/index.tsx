import { GameObject, Bounded } from './GameObject'
import { Controller, MovementController } from './Controller'
import KeyboardController from './KeyboardController'
import RandomMotionController from './RandomMotionController'
import Player from './objects/Player'
import Mountain from './objects/Mountain'
import Tree, { generateRandomTreeDef } from './objects/Tree'

class Game {
	private width: number
	private height: number
	private ctx: CanvasRenderingContext2D

	public objects: GameObject[] = []

	private bufferCanvas: HTMLCanvasElement = document.createElement('canvas')
	private bufferCtx: CanvasRenderingContext2D

	constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
		this.width = width
		this.height = height
		this.ctx = ctx

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
	Bounded,
	Controller,
	MovementController,
	KeyboardController,
	Player,
	Mountain,
	Tree,
	generateRandomTreeDef,
	RandomMotionController
}
