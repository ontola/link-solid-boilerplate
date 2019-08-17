import { defaultNS } from 'link-lib';
import { Namespace } from 'rdflib';

export const MINE_KERNEL = [
  [-1, -1],
  [0, -1],
  [1, -1],

  [-1, 0],
  [1, 0],

  [-1, 1],
  [0, 1],
  [1, 1],
];

export const addGraph = (graph) => defaultNS.ll(`add?graph=${encodeURIComponent(graph.value)}`);

export const namespaceForList = (listIRI) => Namespace(`${listIRI.value}#`);

export const outOfBounds = (width, height, x, y, xOffset, yOffset) => x + xOffset < 0
  || x + xOffset >= width
  || y + yOffset < 0
  || y + yOffset >= height;
