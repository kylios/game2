import Polygon, { render as renderPolygon } from './Polygon'
import Vector from './Vector'

interface Shape {
	polygons: Polygon[]
}

export function render(
		ctx: CanvasRenderingContext2D,
		shape: Shape,
		fillStyle: string,
		strokeStyle: string) {

	shape.polygons.forEach(polygon => renderPolygon(ctx, polygon, fillStyle, strokeStyle))
}

export function translate(shape: Shape, translation: Vector): Shape {
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

export default Shape