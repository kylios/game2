import { MovementController, Movement } from './Controller'

class RandomMotionController extends MovementController {

	protected _getMovementDelta(): Movement {
		const randX = Math.random()
		const randY = Math.random()
		const randZ = Math.random()
		
		return {
			x: randX < 0.25 ? -1 : randX < 0.5 ? 1 : 0,
			y: randY < 0.25 ? -1 : randY < 0.5 ? 1 : 0,
			z: randZ < 0.25 ? -1 : randZ < 0.5 ? 1 : 0
		}
	}
}

export default RandomMotionController