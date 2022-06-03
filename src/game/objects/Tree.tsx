import GameObject from '../GameObject'
import { Circle, renderCircle, translateCircle } from '../Geometry'

interface TreeDef {
	trunkDiameter: number,
	circle1: Circle,
	circle2: Circle,
	circle3: Circle
}

class Tree extends GameObject {

	def: TreeDef
	circle1: Circle
	circle2: Circle
	circle3: Circle

	constructor(x: number, y: number, def: TreeDef) {
		super(x, y)

		this.def = def

		const vector = {x: this.x, y: this.y, z: 0}
		this.circle1 = translateCircle(this.def.circle1, vector)
		this.circle2 = translateCircle(this.def.circle2, vector)
		this.circle3 = translateCircle(this.def.circle3, vector)
	}

	update(): void {
		const vector = {x: this.x, y: this.y, z: 0}
		this.circle1 = translateCircle(this.def.circle1, vector)
		this.circle2 = translateCircle(this.def.circle2, vector)
		this.circle3 = translateCircle(this.def.circle3, vector)
	}

	render(ctx: CanvasRenderingContext2D): void {
		renderCircle(ctx, this.circle1, 'green', 'black')
		renderCircle(ctx, this.circle2, 'green', 'black')
		renderCircle(ctx, this.circle3, 'green', 'black')
	}
}

export default Tree