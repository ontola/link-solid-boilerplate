import { makeStyles } from '@material-ui/styles'
import { defaultNS as NS } from 'link-lib';
import { useDataInvalidation, useLRS } from 'link-redux'
import React from 'react';

import { minesweeper } from '../helpers/minesweeper'

const useStyles = makeStyles({
  gameBar: {
    display: 'flex',
    fontSize: '2em',
    justifyContent: 'space-between',
    padding: '.5em',
  }
});

const cellStateDigger = [minesweeper('field'), NS.rdfs('member'), minesweeper('cell/state')];

export const GameBar = ({
  game,
  mines,
}) => {
  const classes = useStyles();
  const lrs = useLRS();
  const totalMines = Number(mines.value);
  const fields = LRS.dig(game, [minesweeper('field'), NS.rdfs('member')]);
  useDataInvalidation({
    subject: game,
    dataSubjects: [game, ...fields],
  });
  const [time, setTime] = React.useState(0);

  const openedMine = lrs
    .findSubject(game, cellStateDigger, minesweeper('open'))
    .find((s) => lrs.getResourceProperty(s, minesweeper('cell/content')) === minesweeper('mine'));

  const state = lrs.getResourceProperty(game, minesweeper('game/state'));
  const isSweeping = state.value.includes('/game/state/sweeping');
  React.useEffect(() => {
    if (isSweeping) {
      const interval = window.setInterval(() => setTime(prevTime => prevTime + 1), 1000);
      return () => window.clearInterval(interval);
    }

    return () => undefined;
  }, [isSweeping]);

  const flagged = lrs.findSubject(game, cellStateDigger, minesweeper('flagged')).length
  const minesLeft = totalMines - flagged;

  const gameState = state.value.includes('/ended/')
    ? (state.value.includes('/ended/lost') ? 'dead' : 'You win!')
    : (openedMine ? 'dead' : 'alive');

  return (
    <div className={classes.gameBar}>
      <div>{minesLeft.toString().padStart(3, '0')}</div>
      <div>{gameState}</div>
      <div>{time.toString().padStart(3, '0')}</div>
    </div>
  );
}
