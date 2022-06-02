import Point from './Point'

interface Polygon {
	point1: Point,
	point2: Point,
	point3: Point
}

export function render(
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

export default Polygon