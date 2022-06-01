import React from 'react'

interface Props {
	width: number,
	height: number
}

const Canvas = React.forwardRef<HTMLCanvasElement, Props>((props, ref) => {
	const style = {
		width: `${props.width}px`,
		height: `${props.height}px`,
		border: '1px solid black'
	}
	return <canvas width={props.width} height={props.height} style={style} ref={ref} />
})

export default Canvas