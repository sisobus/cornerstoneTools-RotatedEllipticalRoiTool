import cornerstoneTools from 'cornerstone-tools'

const MouseCursor = cornerstoneTools.import('tools/cursors/MouseCursor')
export const rotatedEllipticalRoiCursor = new MouseCursor(
  `<ellipse stroke="ACTIVE_COLOR" fill="none" stroke-width="3" cx="16" cy="16" rx="14" ry="8" transform="rotate(30, 16, 16)"/>`,
  {
    viewBox: {
      x: 32,
      y: 32,
    },
  },
)
