import { GameObject, Bounded } from '../GameObject'
import { MovementController } from '../Controller'
import Game from '../index'

const PLAYER_WIDTH: number = 16
const PLAYER_HEIGHT: number = 16

const PLAYER_COLOR: string = 'black'

interface Collisions {
	x: GameObject[],
	y: GameObject[],
	z: GameObject[]
}

class Player extends Bounded {
	private movementController: MovementController | null = null

	constructor(game: Game, width: number, height: number) {
		super(game, width, height, {
			corner: {
				x: -PLAYER_WIDTH / 2,
				y: -PLAYER_HEIGHT / 2,
				z: 0
			},
			width: PLAYER_WIDTH,
			height: PLAYER_HEIGHT,
			depth: 0
		})
	}

	setMovementController(movementController: MovementController): void {
		this.movementController = movementController
	}

	_checkCollisions(game: Game): Collisions {
		const allCollisions: Collisions = {
			x: [],
			y: [],
			z: []
		}		

		game.objects.forEach(obj => {
			if (obj !== this && obj instanceof Bounded) {
				const collisions = this.collidesWith(obj as Bounded)
				if (collisions.x) {
					allCollisions.x.push(obj)
				}
				if (collisions.y) {
					allCollisions.y.push(obj)
				}
				if (collisions.z) {
					allCollisions.z.push(obj)
				}
			}
		})

		return allCollisions
	}

	update(): void {
		if (this.movementController === null) {
			return
		}

		this.movementController.update(this)
	}

	render(ctx: CanvasRenderingContext2D): void {
		ctx.save()

		ctx.beginPath()
		ctx.fillStyle = this.isColliding ? 'red' : 'black'
		ctx.lineWidth = 1
		ctx.rect(this.x + this.volume.corner.x, this.y + this.volume.corner.y, PLAYER_WIDTH, PLAYER_HEIGHT)
		ctx.fill()

		ctx.fillStyle = 'black'
		ctx.fillText(`${this.x}, ${this.y}`, 20, 20)

		ctx.restore()
	}
}

export default Player