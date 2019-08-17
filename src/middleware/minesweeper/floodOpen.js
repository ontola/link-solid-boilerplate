import { minesweeper } from '../../helpers/minesweeper';

import { MINE_KERNEL, namespaceForList, outOfBounds } from './utilities'

export const floodOpen = (store, gameObj, cell, acc = []) => {
  const fieldTest = /field\/(\d+)\/(\d+)/
  const gameNS = namespaceForList(gameObj.iri);
  const [, matchY, matchX] = cell.value.match(fieldTest);
  const x = Number(matchX);
  const y = Number(matchY);

  return MINE_KERNEL.reduce((acc, [xOffset, yOffset]) => {
    if (outOfBounds(gameObj.width, gameObj.height, x, y, xOffset, yOffset)) {
      return acc;
    }
    const targetX = x + xOffset;
    const targetY = y + yOffset;
    const adjacentCell = gameNS(`field/${targetY}/${targetX}`);

    if (acc.includes(adjacentCell)) {
      return acc;
    }

    if (store.getResourceProperty(adjacentCell, minesweeper('cell/content')) === minesweeper('0')) {
      return floodOpen(store, gameObj, adjacentCell, [adjacentCell, ...acc]);
    }

    return [adjacentCell, ...acc];
  }, acc);
}
