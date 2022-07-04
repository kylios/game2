import { MovementController, Movement } from './Controller'
import { GameObject, Bounded } from './GameObject'

class KeyboardController extends MovementController {

	private keysPressed: Set<string> = new Set()

	startCapturing(): void {
		document.addEventListener('keydown', this.captureKeyDown.bind(this))
		document.addEventListener('keyup', this.captureKeyUp.bind(this))
	}

	stopCapturing(): void {
		document.removeEventListener('keydown', this.captureKeyDown.bind(this))
		document.removeEventListener('keyup', this.captureKeyUp.bind(this))
	}

	captureKeyDown(keyEvent: KeyboardEvent): void {
		this.keysPressed.add(keyEvent.key)
	}

	captureKeyUp(keyEvent: KeyboardEvent): void {
		this.keysPressed.delete(keyEvent.key)
	}

	protected _getMovementDelta(): Movement {
		const movement = {
			x: 0,
			y: 0,
			z: 0
		}
		this.keysPressed.forEach(key => {
			if (key === 'ArrowLeft') {
				movement.x -= 1
			} else if (key === 'ArrowRight') {
				movement.x += 1
			} else if (key === 'ArrowUp') {
				movement.y -= 1
			} else if (key === 'ArrowDown') {
				movement.y += 1
			}
		})

		return movement
	}

	// _moveObject(key: string, gameObject: Bounded, num: number): void {
	// 	if (key === 'ArrowDown') {
	// 		const newY = gameObject.y += num
	// 		gameObject.y = newY	
	// 	} else if (key === 'ArrowUp') {
	// 		const newY = gameObject.y -= num
	// 		gameObject.y = newY	
	// 	} else if (key === 'ArrowLeft') {
	// 		const newX = gameObject.x -= num
	// 		gameObject.x = newX
	// 	} else if (key === 'ArrowRight') {
	// 		const newX = gameObject.x += num
	// 		gameObject.x = newX
	// 	}
	// }

	// update(gameObject: GameObject): void {
	// 	this.keysPressed.forEach(key => {
	// 		this._moveObject(key, gameObject as Bounded, 1)
	// 	})
	// }
}

export default KeyboardController