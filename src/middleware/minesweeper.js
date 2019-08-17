import { defaultNS as NS, defaultNS } from 'link-lib'
import { NamedNode } from 'rdflib'
import { minesweeper } from '../helpers/minesweeper'
import { createGame } from './minesweeper/createGame'
import { floodOpen } from './minesweeper/floodOpen'

/**
 * Link-lib has been designed to process delta's. Every action on the server should return a description
 * of the difference between the state before and after the action, thus synchronizing the front-end
 * with the back-end state without duplicate logic.
 *
 * @see https://github.com/ontola/linked-delta for definitions (they're pretty obvious though).
 */
const replaceGraph = (graph) => defaultNS.ll(`replace?graph=${encodeURIComponent(graph.value)}`);

const minesweeperMiddleware = (store) => {
  // Register our namespace, this will contain app-specific models (we could use any RDF minesweeper model)
  store.namespaces.minesweeper = minesweeper;
  const NS = store.namespaces;

  // We build IRI's manually here, but real-world would abstract this into the data via declarative forms.
  function actionIRI(subject, action, payload = {}) {
    const query = [
      subject && `iri=${encodeURIComponent(subject.value)}`,
      ...Object.entries(payload).map(([k, v]) => [k, encodeURIComponent(v.value || v)].join('=')),
    ].filter(Boolean).join('&');

    return NS.minesweeper(`${action}?${query}`);
  }

  const cellContentDigger = [minesweeper('field'), NS.rdfs('member'), minesweeper('cell/content')];
  const cellStateDigger = [minesweeper('field'), NS.rdfs('member'), minesweeper('cell/state')];

  const processDeltaNow = (delta) => {
    return store.processDelta(delta, true);
  }

  const modifyCell = (game, cell, state) => [
    [
      cell,
      minesweeper('cell/state'),
      state,
      replaceGraph(game)
    ]
  ];

  const endGame = (game, state = minesweeper('game/state/ended/lost')) => {
    const cells = store
      .dig(game, [minesweeper('field'), NS.rdfs('member')])
      .flatMap((cell) => modifyCell(game, cell, minesweeper('open')));

    return [
      [
        game,
        minesweeper('game/state'),
        state,
        replaceGraph(game)
      ],
      ...cells,
    ];
  }

  const calculateGameState = (game) => {
    const openedMine = store
      .findSubject(game, cellStateDigger, minesweeper('open'))
      .find((s) => store.getResourceProperty(s, minesweeper('cell/content')) === minesweeper('mine'));

    if (openedMine) {
      return endGame(game, minesweeper('game/state/ended/lost'));
    }

    const flaggedCells = store.findSubject(game, cellStateDigger, minesweeper('flagged'))
    const mines = store.findSubject(game, cellContentDigger, minesweeper('mine'))
    const flaggedAllMines = flaggedCells.length === mines.length
      && flaggedCells.every((s) => mines.includes(s));

    if (flaggedAllMines) {
      return endGame(game, minesweeper('game/state/ended/won'));
    }

    return [];
  }

  /**
   * Create an object for our action dispatchers, this eases executing (application based) actions
   * It also creates a nice interface between components and the action IRI's for faster refactoring
   *
   * When executing these methods from app code, the action will be scheduled for processing. Actual
   * data changes will be made by the middleware handler below.
   */
  store.actions.minesweeper = {};
  store.actions.minesweeper.open = (game, cell) => store.exec(actionIRI(cell, 'open', { game }));
  store.actions.minesweeper.flag = (game, cell) => store.exec(actionIRI(cell, 'flag', { game }));
  store.actions.minesweeper.hide = (game, cell) => store.exec(actionIRI(cell, 'hide', { game }));
  store.actions.minesweeper.end = (game) => store.exec(actionIRI(undefined, 'end', { game }));
  store.actions.minesweeper.initialize = (subject) => store.exec(actionIRI(subject, 'initialize'));
  store.actions.minesweeper.save = (subject) => store.exec(actionIRI(subject, 'save'));

  /**
   * Middleware handler
   */
  return next => (iri, opts) => {
    if (!iri.value.startsWith(NS.minesweeper('').value)) {
      return next(iri, opts);
    }

    if (iri.value.startsWith(NS.minesweeper('initialize').value)) {
      const file = new NamedNode(new URL(iri.value).searchParams.get('iri'));
      const height = Number(new URL(iri.value).searchParams.get('height'));
      const mines = Number(new URL(iri.value).searchParams.get('mines'));
      const width = Number(new URL(iri.value).searchParams.get('width'));

      return store.processDelta(createGame(NS, file, { height, mines, width }))
        .then(() => store.api.fetcher.putBack(file));
    }

    if (iri.value.startsWith(NS.minesweeper('open').value)) {
      const game = new NamedNode(new URL(iri.value).searchParams.get('game'));
      const cell = new NamedNode(new URL(iri.value).searchParams.get('iri'));

      const gameObj = {
        height: Number(store.getResourceProperty(game, minesweeper('height')).value),
        iri: game,
        width: Number(store.getResourceProperty(game, minesweeper('width')).value)
      };

      const additional = store.getResourceProperty(cell, minesweeper('cell/content')) === minesweeper('0')
        ? floodOpen(store, gameObj, cell).flatMap((cell) => modifyCell(game, cell, minesweeper('open')))
        : [];

      return processDeltaNow([
        ...modifyCell(game, cell, minesweeper('open')),
        ...additional,
        [
          game,
          minesweeper('game/state'),
          minesweeper('game/state/sweeping'),
          replaceGraph(game)
        ]
      ]).then(() => processDeltaNow(calculateGameState(game)));
    }

    if (iri.value.startsWith(NS.minesweeper('flag').value)) {
      const game = new NamedNode(new URL(iri.value).searchParams.get('game'));
      const cell = new NamedNode(new URL(iri.value).searchParams.get('iri'));

      return processDeltaNow(modifyCell(game, cell, minesweeper('flagged')))
        .then(() => processDeltaNow(calculateGameState(game)));
    }

    if (iri.value.startsWith(NS.minesweeper('hide').value)) {
      const game = new NamedNode(new URL(iri.value).searchParams.get('game'));
      const cell = new NamedNode(new URL(iri.value).searchParams.get('iri'));

      return processDeltaNow(modifyCell(game, cell, minesweeper('hidden')))
        .then(() => processDeltaNow(calculateGameState(game)));
    }

    if (iri.value.startsWith(NS.minesweeper('end').value)) {
      const game = new NamedNode(new URL(iri.value).searchParams.get('game'));

      return processDeltaNow(endGame(game));
    }

    if (iri.value.startsWith(NS.minesweeper('save').value)) {
      const resource = new URL(iri.value).searchParams.get('iri');
      return store.api.fetcher.putBack(new NamedNode(resource));
    }

    return next(iri, opts);
  };
};

export default minesweeperMiddleware;
