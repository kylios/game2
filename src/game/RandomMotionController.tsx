import Controller from './Controller'
import GameObject from './GameObject'

class RandomMotionController extends Controller {

	update(gameObject: GameObject): void {
		const rand = Math.random()

		if (rand < 0.25) {
			gameObject.y++
		} else if (rand < .5) {
			gameObject.y--
		} else if (rand < 0.75) {
			gameObject.x++
		} else {
			gameObject.x--
		}
	}
}

export default RandomMotionController