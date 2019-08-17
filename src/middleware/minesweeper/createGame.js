import { Literal } from "rdflib";

import { minesweeper } from '../../helpers/minesweeper';
import { addGraph, MINE_KERNEL, namespaceForList, outOfBounds } from './utilities';

export const calculateMines = (gameField, width, height, x, y) => {
  const valueForCoord = (xOffset, yOffset) => {
    if (outOfBounds(width, height, x, y, xOffset, yOffset)) {
      return 0;
    }
    const targetIndex = (y + yOffset) * width + (x + xOffset);

    return gameField[targetIndex] === "mine" ? 1 : 0;
  }

  /**
   * Sum mask;
   * 1 1 1
   * 1 0 1
   * 1 1 1
   */
  return MINE_KERNEL.reduce((acc, [x, y]) => {
    return acc + valueForCoord(x, y);
  }, 0);
}

export const createGame = (NS, listIRI, settings = {}) => {
  const gameNS = namespaceForList(listIRI);

  const height = settings.height || 9;
  const width = settings.width || 9;
  const mines = settings.mines || 10;
  const size = height * width;

  if (mines >= size || size === 0 || mines === 0) {
    throw new Error("Unplayable game")
  }

  const gameField = new Array(size);
  for (let i = 0; i < mines; i++) {
    let setMine = false;
    while(!setMine) {
      const pos = Math.floor(Math.random() * size + 1);
      if (gameField[pos] === undefined) {
        gameField[pos] = "mine";
        setMine = true;
      }
    }
  }

  const fieldStatements = new Array(size);
  const cellStatements = [];
  for (let i = 0; i < gameField.length; i++) {
    const x = i % width;
    const y = Math.floor(i / width);

    const content = gameField[i] || calculateMines(gameField, width, height, x, y);

    fieldStatements[i] = [
      gameNS('field'),
      NS.rdf(`_${i}`),
      gameNS(`field/${y}/${x}`),
      addGraph(listIRI)
    ];
    cellStatements.push(
      [
        gameNS(`field/${y}/${x}`),
        NS.rdf("type"),
        minesweeper("Cell"),
        addGraph(listIRI)
      ],
      [
        gameNS(`field/${y}/${x}`),
        minesweeper('cell/content'),
        minesweeper(content.toString()),
        addGraph(listIRI)
      ],
      [
        gameNS(`field/${y}/${x}`),
        minesweeper('cell/state'),
        minesweeper('hidden'),
        addGraph(listIRI)
      ]
    );
  }

  return [
    [listIRI, NS.rdf('type'), NS.minesweeper('MinesweeperGame'), addGraph(listIRI)],
    [listIRI, NS.rdf('type'), NS.rdfs('Bag'), addGraph(listIRI)],
    [listIRI, NS.minesweeper('game/state'), minesweeper('game/state/pending'), addGraph(listIRI)],
    [listIRI, NS.minesweeper('height'), Literal.fromNumber(height), addGraph(listIRI)],
    [listIRI, NS.minesweeper('width'), Literal.fromNumber(width), addGraph(listIRI)],
    [listIRI, NS.minesweeper('mines'), Literal.fromNumber(mines), addGraph(listIRI)],
    [listIRI, NS.minesweeper('field'), gameNS('field'), addGraph(listIRI)],

    [gameNS('field'), NS.rdf('type'), NS.minesweeper('MineField'), addGraph(listIRI)],
    ...fieldStatements,
    ...cellStatements,
  ];
}
