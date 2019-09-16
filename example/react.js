import React from "react"
import ReactDOM from 'react-dom'
import cornerstone from "cornerstone-core"
import cornerstoneTools from "cornerstone-tools"
import RotatedEllipticalRoiTool from "cornerstone-tools-rotated-elliptical-roi-tool"
import cornerstoneWebImageLoader from "cornerstone-web-image-loader"
import cornerstoneMath from "cornerstone-math"
import Hammer from "hammerjs"

export default class Viewer extends React.Component {
  componentDidMount() {
    cornerstoneTools.external.cornerstone = cornerstone
    cornerstoneWebImageLoader.external.cornerstone = cornerstone
    cornerstoneTools.external.Hammer = Hammer
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath
    cornerstone.registerImageLoader("http", cornerstoneWebImageLoader.loadImage)
    cornerstone.registerImageLoader(
      "https",
      cornerstoneWebImageLoader.loadImage,
    )
    cornerstoneTools.init({
      showSVGCursors: true,
    })
    cornerstoneTools.toolColors.setToolColor("orange")
    // Enable Element
    const element = document.querySelector("#cornerstone-element")
    cornerstone.enable(element)
    // Load and Display Image
    const exampleImageId =
      "https://rawgit.com/dannyrb/cornerstone-vuejs-poc/master/static/simple-study/1.2.276.0.74.3.1167540280.200511.112514.1.1.10.jpg"
    cornerstone.loadImage(exampleImageId).then(function(image) {
      cornerstone.displayImage(element, image)

      const WwwcTool = cornerstoneTools.WwwcTool
      const PanTool = cornerstoneTools.PanTool
      const EraserTool = cornerstoneTools.EraserTool
      cornerstoneTools.addTool(WwwcTool)
      cornerstoneTools.addTool(PanTool)
      cornerstoneTools.addTool(EraserTool)
      cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 4 })
      cornerstoneTools.setToolActive("Eraser", { mouseButtonMask: 2 })

      cornerstoneTools.addTool(RotatedEllipticalRoiTool)
      cornerstoneTools.setToolActive("RotatedEllipticalRoi", {
        mouseButtonMask: 1,
      })
    })
  }
  render() {
    return (
      <div
        id="cornerstone-element"
        onContextMenu={() => {
          return false
        }}
        style={{
          width: 512,
          height: 512,
          margin: "0 auto",
          background: "black",
        }}
      ></div>
    )
  }
}

ReactDOM.render(<Viewer />, document.getElementById('root'))

