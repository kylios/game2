import GameObject from './GameObject'

abstract class Controller {
	abstract update(gameObject: GameObject): void
}

export default Controller