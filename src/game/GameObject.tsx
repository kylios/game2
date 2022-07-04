import { Cube } from './Geometry'
// import { Constructor } from '../lib/mixins'
import Game from './index'

abstract class GameObject {
  public x
  public y
  public game

  constructor(game: Game, x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
    this.game = game
  }

  abstract update(): void
  abstract render(ctx: CanvasRenderingContext2D): void
}


// function Bound<TBase extends Constructor>(Base: TBase) {
//  return class Bounded extends Base {
//    volume: Cube = { corner: { x: 0, y: 0, z: 0 }, width: 0, height: 0, depth: 0 }

//    _collidesOnAxis(myPoint: number, theirPoint: number, myLength: number, theirLength: number): boolean {
//      return myPoint < theirPoint + theirLength || myPoint + myLength > theirPoint
//    }

//    collidesWith(other: Bounded): boolean {

//      const collidesX = this._collidesOnAxis(this.volume.corner.x, other.volume.corner.x, this.volume.width, other.volume.width)
//      const collidesY = this._collidesOnAxis(this.volume.corner.y, other.volume.corner.y, this.volume.height, other.volume.height)
//      const collidesZ = this._collidesOnAxis(this.volume.corner.z, other.volume.corner.z, this.volume.depth, other.volume.depth)

//      return collidesX && collidesY && collidesZ
//    }
//  }
// }

interface Collision {
  x: boolean,
  y: boolean,
  z: boolean
}

/**
 * Boundaries are used for collision detection.
 */
abstract class Bounded extends GameObject {
  // The `volume` property defines the object's collision boundary in three dimensions.
  // Use a cube for simplicity. The cube's `corner` property defines the start of the
  // boundary relative to the object's position.
  volume: Cube

  isColliding: boolean

  constructor(game: Game, x: number, y: number, volume: Cube) {
    super(game, x, y)
    this.volume = volume
    this.isColliding = false
  }

  /*
                   myPoint
      me      *-------*
      them        *--------*
  */
  _collidesOnAxis(myPoint: number, theirPoint: number, myLength: number, theirLength: number): boolean {
    return (myPoint + myLength >= theirPoint && myPoint <= theirPoint)
  }

  collidesWith(other: Bounded): Collision {

    const myPoint = {
      x: this.x + this.volume.corner.x,
      y: this.y + this.volume.corner.y,
      z: this.volume.corner.z
    }

    const theirPoint = {
      x: other.x + other.volume.corner.x,
      y: other.y + other.volume.corner.y,
      z: other.volume.corner.z
    }

    const collidesX = this._collidesOnAxis(myPoint.x, theirPoint.x, this.volume.width, other.volume.width)
    const collidesY = this._collidesOnAxis(myPoint.y, theirPoint.y, this.volume.height, other.volume.height)
    const collidesZ = this._collidesOnAxis(myPoint.z, theirPoint.z, this.volume.depth, other.volume.depth)

    return {
      x: collidesX,
      y: collidesY,
      z: collidesZ
    }
  }
}


export { GameObject, Bounded }