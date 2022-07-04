import Game from '../index'
import { Bounded } from '../GameObject'
import { Circle, renderCircle, translateCircle, Cube } from '../Geometry'

interface TreeDef {
	trunkDiameter: number,
	circles: Circle[],
	bounds: Cube
}

function generateRandomTreeDef(width: number, height: number, trunkDiameter: number): TreeDef {
	const numCircles = Math.floor(Math.random() * 3 + 3) // between 3-5 circles

	return {
		trunkDiameter,
		circles: [],
		bounds: {
			width: 0,
			height: 0,
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