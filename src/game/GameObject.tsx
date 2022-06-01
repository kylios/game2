
abstract class GameObject {
	public x
	public y

	constructor(x: number = 0, y: number = 0) {
		this.x = x
		this.y = y
	}

	abstract update(): void
	abstract render(ctx: CanvasRenderingContext2D): void
}

export default GameObject