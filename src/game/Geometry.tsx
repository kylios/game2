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

interface Circle {
	center: Point,
	radius: number
}

function renderCircle(
		ctx: CanvasRenderingContext2D,
		circle: Circle,
		fillStyle: string,
		strokeStyle: string) {

	ctx.fillStyle = fillStyle
	ctx.strokeStyle = strokeStyle

	ctx.beginPath()
	ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI)
	ctx.fill()
	ctx.stroke()
}

function translateCircle(circle: Circle, translation: Vector): Circle {
	return {
		...circle,
		center: {
			x: circle.center.x + translation.x,
			y: circle.center.y + translation.y,
			z: circle.center.z + translation.z
		}
	}
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

interface Cube {
	/*
	 * This is the top-left corner looking straight down from the canvas.
	 * The positive axes run to the right, down, and towards the viewer.
	 */
	corner: Point,

	width: number,
	height: number,
	depth: number
}

export {
	renderPolygon,
	renderShape,
	renderCircle,
	translateShape,
	translateCircle
}

export type {
	Shape,
	Vector,
	Point,
	Polygon,
	Circle,
	Cube
}
