const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [2048, 2048],
}

const sketch = () => {
  const colorCount = random.rangeFloor(2, 4)
  const palette = random.shuffle(random.pick(palettes)).slice(colorCount)

  const createGrid = () => {
    const points = []
    const count = 22
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)
        points.push({
          color: random.pick(palette),
          radius: Math.abs(random.gaussian() * 0.03),
          position: [u, v],
        })
      }
    }
    return points
  }

  const points = createGrid()
  const margin = 300

  return /**  @param  {{context: CanvasRenderingContext2D}} */ ({
    context,
    width,
    height,
  }) => {
    context.fillStyle = random.pick(palette)
    context.fillRect(0, 0, width, height)

    points
      .filter(() => random.rangeFloor(0, 2))
      .forEach(({ color, radius, position: [u, v] }) => {
        const x = lerp(margin, width - margin, u)
        const y = lerp(margin, height - margin, v)

        context.beginPath()
        context.arc(x, y, radius * width, 0, Math.PI * 2)
        context.fillStyle = color
        context.fill()
      })
  }
}

canvasSketch(sketch, settings)
