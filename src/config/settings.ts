export const settings = {
  color: {
    white: '#d6d6d6',
    red: '#be3e2b',
    blue: '#34738f',
    yellow: '#f6de6c',
  },
  strokeWidth: {
    point: 11,
    line: 3,
    circle: 3,
  },
};

export const fabricSettings = {
  canvas: {
    selection: false,
    backgroundColor: settings.color.white,
  },
  point: {
    strokeWidth: 1,
    radius: settings.strokeWidth.point / 2,
    fill: settings.color.red,
    stroke: settings.color.red,
    hoverCursor: 'default',
    selectable: false,
    hasControls: false,
    hasBorders: false,
  },
  line: {
    fill: settings.color.blue,
    stroke: settings.color.blue,
    strokeWidth: settings.strokeWidth.line,
    hoverCursor: 'default',
    selectable: false,
  },
  circle: {
    strokeWidth: settings.strokeWidth.circle,
    stroke: settings.color.yellow,
    fill: 'transparent',
    hoverCursor: 'default',
    selectable: false,
    hasControls: false,
    hasBorders: false,
  }
};
