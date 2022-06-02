import GameObject from '../GameObject'
import Shape, { render as renderShape, translate } from '../Shape'

interface FlatPoint {
	x: number,
	y: number
}

interface MountainDef {
	corner1: FlatPoint,
	corner2: FlatPoint,
	corner3: FlatPoint,
	height: number
}

function mountainDefToShape(def: MountainDef): Shape {

	const centroid = {
		x: (def.corner1.x + def.corner2.x + def.corner3.x) / 3.0,
		y: (def.corner1.y + def.corner2.y + def.corner3.y) / 3.0
	}

	const polygon1 = {
		point1: {
			x: def.corner1.x,
			y: def.corner1.y,
			z: 0
		},
		point2: {
			x: def.corner2.x,
			y: def.corner2.y,
			z: 0
		},
		point3: {
			x: centroid.x,
			y: centroid.y,
			z: def.height
		}
	}
	const polygon2 = {
		point1: {
			x: def.corner2.x,
			y: def.corner2.y,
			z: 0
		},
		point2: {
			x: def.corner3.x,
			y: def.corner3.y,
			z: 0
		},
		point3: {
			x: centroid.x,
			y: centroid.y,
			z: def.height
		}
	}
	const polygon3 = {
		point1: {
			x: def.corner3.x,
			y: def.corner3.y,
			z: 0
		},
		point2: {
			x: def.corner1.x,
			y: def.corner1.y,
			z: 0
		},
		point3: {
			x: centroid.x,
			y: centroid.y,
			z: def.height
		}
	}

	return {
		polygons: [
			polygon1,
			polygon2,
			polygon3
		]
	}
}

class Mountain extends GameObject {

	shape: Shape
	def: MountainDef

	constructor(x: number, y: number, def: MountainDef) {
		super(x, y)

		this.def = def
		this.shape = translate(mountainDefToShape(def), { x, y, z: 0 })
	}

	update(): void {
		this.shape = translate(
			mountainDefToShape(this.def),
			{ x: this.x, y: this.y, z: 0}
		)
	}

	render(ctx: CanvasRenderingContext2D): void {
		ctx.save()
		renderShape(ctx, this.shape, 'grey', 'black')
		ctx.restore()
	}
}

export default Mountain