import { SETTINGS } from './settings';

export const FABRIC_SETTINGS = {
  canvas: {
    selection: false,
    backgroundColor: SETTINGS.color.white,
  },
  point: {
    strokeWidth: 1,
    radius: SETTINGS.strokeWidth.point / 2,
    fill: SETTINGS.color.red,
    stroke: SETTINGS.color.red,
    hoverCursor: 'default',
    selectable: false,
    hasControls: false,
    hasBorders: false,
  },
  line: {
    fill: SETTINGS.color.blue,
    stroke: SETTINGS.color.blue,
    strokeWidth: SETTINGS.strokeWidth.line,
    hoverCursor: 'default',
    selectable: false,
  },
  circle: {
    strokeWidth: SETTINGS.strokeWidth.circle,
    stroke: SETTINGS.color.yellow,
    fill: 'transparent',
    hoverCursor: 'default',
    selectable: false,
    hasControls: false,
    hasBorders: false,
  },
};
