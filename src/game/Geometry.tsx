interface Vector {
	x: number,
	y: number,
	z: number
}

interface Point {
	x: number,
	y: number,
	z: number
}

interface Polygon {
	point1: Point,
	point2: Point,
	point3: Point
}

function renderPolygon(
		ctx: CanvasRenderingContext2D,
		polygon: Polygon,
		fillStyle: string,
		strokeStyle: string) {

	ctx.fillStyle = fillStyle
	ctx.strokeStyle = strokeStyle

	ctx.beginPath()

	ctx.moveTo(polygon.point1.x, polygon.point1.y)
	ctx.lineTo(polygon.point2.x, polygon.point2.y)
	ctx.lineTo(polygon.point3.x, polygon.point3.y)
	ctx.lineTo(polygon.point1.x, polygon.point1.y)

	ctx.closePath()
	ctx.stroke()
	ctx.fill()
}

interface Shape {
	polygons: Polygon[]
}

function renderShape(
		ctx: CanvasRenderingContext2D,
		shape: Shape,
		fillStyle: string,
		strokeStyle: string) {

	shape.polygons.forEach(polygon => renderPolygon(ctx, polygon, fillStyle, strokeStyle))
}

function translateShape(shape: Shape, translation: Vector): Shape {
	const polygons = shape.polygons.map(polygon => ({
		point1: {
			x: polygon.point1.x + translation.x,
			y: polygon.point1.y + translation.y,
			z: polygon.point1.z + translation.z
		},
		point2: {
			x: polygon.point2.x + translation.x,
			y: polygon.point2.y + translation.y,
			z: polygon.point2.z + translation.z
		},
		point3: {
			x: polygon.point3.x + translation.x,
			y: polygon.point3.y + translation.y,
			z: polygon.point3.z + translation.z
		}
	}))

	return {
		polygons
	}
}

export {
	renderPolygon,
	renderShape,
	translateShape
}

export type {
	Shape,
	Vector,
	Point,
	Polygon
}
