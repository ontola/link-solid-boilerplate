import { register, useLRS } from 'link-redux'
import { NamedNode } from "rdflib"
import React from 'react';

import { minesweeper } from '../../helpers/minesweeper'

const MinesweeperInit = ({ subject }) => {
  const lrs = useLRS();

  React.useEffect(() => {
    lrs.actions.minesweeper.initialize(subject);
  }, [false]);

  return null;
}

MinesweeperInit.type = minesweeper('MinesweeperInit');

MinesweeperInit.topology = [
  undefined,
  new NamedNode("https://ontola-mash.herokuapp.com/article"),
];

export default register(MinesweeperInit);
