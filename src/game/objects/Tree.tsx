import Game from '../index'
import { Bounded } from '../GameObject'
import { Circle, renderCircle, translateCircle, Cube } from '../Geometry'

interface TreeDef {
	trunkDiameter: number,
	circles: Circle[],
	bounds: Cube
}

export function generateRandomTreeDef(width: number, height: number, trunkDiameter: number): TreeDef {
	const numCircles = Math.floor(Math.random() * 3 + 3) // between 3-5 circles

	const circles: Circle[] = []

	const dim = Math.min(width, height)
	let radius = 0
	for (let i = 0; i < numCircles; i++) {

		if (radius !== 0) {
			radius = (Math.random() * 0.6 * radius) + (0.4 * radius)
		} else {
			radius = (Math.random() * 0.4 * dim / 2) + (0.6 * dim / 2)
		}

		const x = Math.random() * (width - radius * 2) + radius
		const y = Math.random() * (height - radius * 2) + radius

		circles.push({
			center: {
				x,
				y,
				z: 0
			},
			radius
		})
	}

	return {
		trunkDiameter,
		circles,
		bounds: {
			width,
			height,
			depth: 0,
			corner: {
				x: 0,
				y: 0,
				z: 0
			}
		}
	}
}

class Tree extends Bounded {

	def: TreeDef
	circles: Circle[]

	constructor(game: Game, x: number, y: number, def: TreeDef) {
		super(game, x, y, def.bounds)

		this.def = def

		const vector = {x: this.x, y: this.y, z: 0}
		this.circles = this.def.circles.map(circle => translateCircle(circle, vector))
	}

	update(): void {
		const vector = {x: this.x, y: this.y, z: 0}
		this.circles = this.def.circles.map(circle => translateCircle(circle, vector))
	}

	render(ctx: CanvasRenderingContext2D): void {
		this.circles.forEach(circle => renderCircle(ctx, circle, 'green', 'black'))

		ctx.strokeStyle = 'red'
		ctx.strokeRect(this.x + this.volume.corner.x, this.y + this.volume.corner.y, this.volume.width, this.volume.height)
	}
}

export default Tree