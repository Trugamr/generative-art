const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [2048, 2048],
}

const sketch = () => {
  const colorCount = random.rangeFloor(1, 5)
  const palette = random.shuffle(random.pick(palettes)).slice(colorCount)

  const createGrid = () => {
    const points = []
    const count = 100
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)
        const radius = Math.abs(random.noise2D(u, v) * 0.1)
        points.push({
          color: random.pick(palette),
          radius,
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
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    context.arc(width / 2, height / 2, 400, 0, Math.PI * 2)
    context.fillStyle = 'black'
    context.fill()

    points
      // .filter(() => random.rangeFloor(0, 2))
      .forEach(({ color, radius, position: [u, v] }) => {
        const x = lerp(margin, width - margin, u)
        const y = lerp(margin, height - margin, v)

        // context.beginPath()
        // context.arc(x, y, radius * width, 0, Math.PI * 2)
        // context.fillStyle = color
        // context.fill()

        context.fillStyle = random.rangeFloor(0, 2) ? 'pink' : 'black'
        context.fillText('.', x, y)
        context.font = `${radius * width}px "Fira Code"`
        context.fill()
      })

    context.fillStyle = 'black'
    context.font = `600px "Fira Code"`
    context.fillText('🌸', width / 2 - 400, height / 2 + 190)
  }
}

canvasSketch(sketch, settings)
