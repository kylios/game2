import Controller from './Controller'
import GameObject from './GameObject'

class KeyboardController extends Controller {

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

	_moveObject(key: string, gameObject: GameObject, num: number): void {
		if (key === 'ArrowDown') {
			gameObject.y += num
		} else if (key === 'ArrowUp') {
			gameObject.y -= num
		} else if (key === 'ArrowLeft') {
			gameObject.x -= num
		} else if (key === 'ArrowRight') {
			gameObject.x += num
		}
	}

	update(gameObject: GameObject): void {
		this.keysPressed.forEach(key => {
			this._moveObject(key, gameObject, 1)
		})
	}
}

export default KeyboardController