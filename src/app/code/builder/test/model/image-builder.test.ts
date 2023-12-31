/**
 * @description Image builder unit test
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import CanvasManager from '../../../core/test/model/canvas-manager'
import PixelManager from '../../../core/test/model/particle/pixel-manager'
import PixelPoolManager from '../../../core/test/model/particle/pixel-pool-manager'
import PixelCreationHandler from '../../model/image-builder/handler/pixel-creation-handler'
import IImageBuilder from '../../api/image-builder'
import ImageBuilder from '../../model/image-builder'

/**
 * @note Init data set to test image build with different situations
 */
type DataSet = Array<{
  pixelSize: number
  width: number
  height: number
  expectedNumPixels: number
}>
const dataSet: DataSet = [
  {pixelSize: 1, width: 100, height: 100, expectedNumPixels: 10000},
  {pixelSize: 2, width: 100, height: 100, expectedNumPixels: 2500},
  {pixelSize: 2, width: 1, height: 1, expectedNumPixels: 1},
]

/**
 * @note Execute test suite for the data set
 * @note It is considered that the image and canvas
 *       have the same dimensions (width and height)
 *       and that the dimensions cannot be 0
 */
describe.each(dataSet)(
  'Image Builder (' +
    'pixelSize: $pixelSize - ' +
    'width: $width - ' +
    'height: $height - ' +
    'expectedNumPixels: $expectedNumPixels' +
    ')',
  ({pixelSize, width, height, expectedNumPixels}) => {
    let context: CanvasRenderingContext2D
    let pixelCreationHandler: PixelCreationHandler
    let imageBuilder: IImageBuilder

    beforeEach(() => {
      const pixelManager = new PixelManager()
      const pixelPoolManager = new PixelPoolManager(pixelManager)
      const canvasManager = new CanvasManager()
      const canvas = canvasManager.createCanvasWithImageData(
        width,
        height,
        pixelPoolManager.generateRawPixels(width, height),
      )
      pixelCreationHandler = new PixelCreationHandler()
      pixelCreationHandler.initPixel = jest.fn()
      context = canvas.getContext('2d') as CanvasRenderingContext2D
      imageBuilder = new ImageBuilder(
        context,
        document.createElement('img'),
        pixelSize,
        pixelCreationHandler,
      )
    })

    it('Build image: draw image on canvas and init pixels', () => {
      imageBuilder.build()
      expect(context.drawImage).toHaveBeenCalledTimes(1)
      expect(pixelCreationHandler.initPixel).toHaveBeenCalledTimes(
        expectedNumPixels,
      )
    })
  },
)
