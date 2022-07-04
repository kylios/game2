import { GameObject, Bounded } from './GameObject'

import { isEqual } from 'lodash'

abstract class Controller {
	abstract update(gameObject: GameObject): void
}

interface Movement {
  x: number,
  y: number,
  z: number
}

interface Point {
  x: number,
  y: number
}

abstract class MovementController {

  protected abstract _getMovementDelta(): Movement;

  private _collidedOnXGoingLeft(myPoint: Point, myWidth: number, myHeight: number, theirPoint: Point, theirWidth: number, theirHeight: number): boolean {
    return (
      myPoint.x <= theirPoint.x + theirWidth && myPoint.x >= theirPoint.x &&
      (
        (
          myPoint.y >= theirPoint.y && 
          myPoint.y <= theirPoint.y + theirHeight
        )
        ||
        (
          myPoint.y <= theirPoint.y &&
          myPoint.y + myHeight >= theirPoint.y
        )
      )
    )
  }

  private _collidedOnXGoingRight(myPoint: Point, myWidth: number, myHeight: number, theirPoint: Point, theirWidth: number, theirHeight: number): boolean {
    return (
      myPoint.x + myWidth >= theirPoint.x && myPoint.x <= theirPoint.x &&
      (
        (
          myPoint.y >= theirPoint.y && 
          myPoint.y <= theirPoint.y + theirHeight
        )
        ||
        (
          myPoint.y <= theirPoint.y &&
          myPoint.y + myHeight >= theirPoint.y
        )
      )            
    )
  }

  private _collidedOnYGoingUp(myPoint: Point, myWidth: number, myHeight: number, theirPoint: Point, theirWidth: number, theirHeight: number): boolean {
    return (
      myPoint.y <= theirPoint.y + theirHeight && myPoint.y >= theirPoint.y &&
      (
        (
          myPoint.x >= theirPoint.x && 
          myPoint.x <= theirPoint.x + theirWidth
        )
        ||
        (
          myPoint.x <= theirPoint.x &&
          myPoint.x + myWidth >= theirPoint.x
        )
      )
    )
  }

  private _collidedOnYGoingDown(myPoint: Point, myWidth: number, myHeight: number, theirPoint: Point, theirWidth: number, theirHeight: number): boolean {
    return (
      myPoint.y + myHeight >= theirPoint.y && myPoint.y <= theirPoint.y &&
      (
        (
          myPoint.x >= theirPoint.x && 
          myPoint.x <= theirPoint.x + theirWidth
        )
        ||
        (
          myPoint.x <= theirPoint.x &&
          myPoint.x + myWidth >= theirPoint.x
        )
      )            
    )
  }

  private _handleCollision(gameObject: Bounded, movement: Movement): boolean {

    let collidedOnX = false
    let collidedOnY = false

    // collision detection
    const myPoint = {
      x: gameObject.x + gameObject.volume.corner.x,
      y: gameObject.y + gameObject.volume.corner.y
    }

    gameObject.game.objects.forEach(obj => {
      if (obj === gameObject || !(obj instanceof Bounded)) {
        return
      }

      const theirPoint = {
        x: obj.x + obj.volume.corner.x,
        y: obj.y + obj.volume.corner.y
      }

      if (movement.x < 0) {
        const collided = this._collidedOnXGoingLeft(
          { ...myPoint, x: movement.x + myPoint.x }, gameObject.volume.width, gameObject.volume.height, 
          theirPoint, obj.volume.width, obj.volume.height
        )

        if (collided) {
          collidedOnX = true
        }
      } else if (movement.x > 0) {
        const collided = this._collidedOnXGoingRight(
          { ...myPoint, x: movement.x + myPoint.x }, gameObject.volume.width, gameObject.volume.height, 
          theirPoint, obj.volume.width, obj.volume.height
        )

        if (collided) {
          collidedOnX = true
        }
      }

      if (movement.y < 0) { 
        const collided = this._collidedOnYGoingUp(
          { ...myPoint, y: movement.y + myPoint.y }, gameObject.volume.width, gameObject.volume.height,
          theirPoint, obj.volume.width, obj.volume.height
        )

        if (collided) {
          collidedOnY = true
        }
      } else if (movement.y > 0) {
        const collided = this._collidedOnYGoingDown(
          { ...myPoint, y: movement.y + myPoint.y }, gameObject.volume.width, gameObject.volume.height,
          theirPoint, obj.volume.width, obj.volume.height
        )

        if (collided) {
          collidedOnY = true
        }
      }
    })

    if (!collidedOnX) {
      gameObject.x += movement.x
    }
    if (!collidedOnY) {
      gameObject.y += movement.y
    }

    return collidedOnX || collidedOnY
  }

  update(gameObject: GameObject) {
    const movement = this._getMovementDelta()

    let collided = false
    if (gameObject instanceof Bounded) {

      collided = this._handleCollision(gameObject, movement)

      gameObject.isColliding = collided
    } else {
      gameObject.x += movement.x
      gameObject.y += movement.y
    }
  }
}

export type { Movement }
export {Controller, MovementController}