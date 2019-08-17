import { LinkedResourceContainer, register } from 'link-redux'
import { NamedNode } from 'rdflib'
import React from 'react'

import { GameBar } from '../../components/GameBar'
import { minesweeper } from '../../helpers/minesweeper'

const MinesweeperGame = ({
  field,
  mines,
  subject,
  width,
}) => {

  return (
    <div className="MinesweeperGame">
      <GameBar
        game={subject}
        mines={mines}
      />
      <LinkedResourceContainer
        game={subject}
        subject={field}
        width={width}
      />
    </div>
  );
};

MinesweeperGame.type = minesweeper('MinesweeperGame');

MinesweeperGame.topology = [
  undefined,
  new NamedNode("https://ontola-mash.herokuapp.com/article"),
];

MinesweeperGame.mapDataToProps = {
  field: minesweeper('field'),
  height: minesweeper('height'),
  mines: minesweeper('mines'),
  width: minesweeper('width'),
};

export default register(MinesweeperGame);
