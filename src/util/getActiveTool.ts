import cornerstoneTools from 'cornerstone-tools'
const { getters, state } = cornerstoneTools.store
const BaseAnnotationTool = cornerstoneTools.import('base/baseAnnotationTool')
const BaseBrushTool = cornerstoneTools.import('base/BaseBrushTool')

const getActiveToolsForElement = (
  element: HTMLElement,
  tools: any,
  handlerType: any = undefined,
) => {
  return tools.filter(
    (tool: any) =>
      tool.element === element &&
      tool.mode === 'active' &&
      (handlerType === undefined || tool.options[`is${handlerType}Active`]),
  )
}

const filterToolsUseableWithMultiPartTools = (tools: any) => {
  return tools.filter(
    (tool: any) =>
      !tool.isMultiPartTool &&
      !(tool instanceof BaseAnnotationTool) &&
      !(tool instanceof BaseBrushTool),
  )
}

export default function getActiveTool(
  element: HTMLElement,
  buttons: any,
  interactionType = 'mouse',
) {
  let tools

  if (interactionType === 'touch') {
    tools = getActiveToolsForElement(element, getters.touchTools())
    tools = tools.filter((tool: any) => tool.options.isTouchActive)
  } else {
    // Filter out disabled, enabled, and passive
    tools = getActiveToolsForElement(element, getters.mouseTools())

    // Filter out tools that do not match mouseButtonMask
    tools = tools.filter(
      (tool: any) =>
        Array.isArray(tool.options.mouseButtonMask) &&
        buttons &&
        tool.options.mouseButtonMask.includes(buttons) &&
        tool.options.isMouseActive,
    )

    if (state.isMultiPartToolActive) {
      tools = filterToolsUseableWithMultiPartTools(tools)
    }
  }

  if (tools.length === 0) {
    return
  }

  return tools[0]
}
