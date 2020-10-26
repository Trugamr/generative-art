const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [2048, 2048],
}

// random.setSeed(49238)

const sketch = () => {
  const getGrid = () => {
    const points = []
    const count = 6
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)
        points.push({
          position: [u, v],
          color: random.pick(random.pick(palettes)),
        })
      }
    }
    return points
  }

  let points = getGrid()
  const margin = 200

  return /** @param {{context: CanvasRenderingContext2D}} */ ({
    context,
    width,
    height,
  }) => {
    const background = random.pick(random.pick(palettes))
    context.fillStyle = background
    context.fillRect(0, 0, width, height)

    // Taking margin into consideration for all points
    points = points.map(point => ({
      ...point,
      position: [
        lerp(margin, width - margin, point.position[0]),
        lerp(margin, height - margin, point.position[1]),
      ],
    }))

    let i = 0
    while (i < 12) {
      // Shuffling points
      points = random.shuffle(points)

      // Taking two points at random
      const [
        {
          position: [x1, y1],
          color,
        },
        {
          position: [x2, y2],
        },
      ] = points.splice(0, 2)

      context.beginPath()
      context.moveTo(x1, y1)
      context.lineTo(x2, y2)
      context.lineTo(x2, height)
      context.lineTo(x1, height)
      context.fillStyle = color
      context.strokeStyle = background
      context.lineWidth = 54
      context.closePath()
      context.stroke()
      context.fill()

      i++
    }
  }
}

canvasSketch(sketch, settings)
