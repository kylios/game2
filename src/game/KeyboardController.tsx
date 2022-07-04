import { MovementController, Movement } from './Controller'

const SPEED = 4

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
				movement.x -= SPEED
			} else if (key === 'ArrowRight') {
				movement.x += SPEED
			} else if (key === 'ArrowUp') {
				movement.y -= SPEED
			} else if (key === 'ArrowDown') {
				movement.y += SPEED
			}
		})

		return movement
	}
}

export default KeyboardController