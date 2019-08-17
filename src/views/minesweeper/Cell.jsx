import { makeStyles } from '@material-ui/styles'
import BugReportIcon from '@material-ui/icons/BugReport'
import FlagIcon from '@material-ui/icons/Flag'
import clsx from 'clsx'
import { NamedNode } from 'rdflib'
import { register, useLRS } from 'link-redux'
import React from 'react';

import { minesweeper } from '../../helpers/minesweeper'

const useStyles = makeStyles({
  cell: {
    alignItems: 'center',
    background: '#8fa5f0',
    cursor: 'pointer',
    color: 'aliceblue',
    display: 'flex',
    fontSize: '2rem',
    height: '100%',
    justifyContent: 'center',
    minWidth: '3.7rem',
    minHeight: '3.7rem',
    width: '100%',
  },
  inactionable: {
    background: '#7488cf',
    cursor: 'default',
  }
});

const Cell = ({
  content,
  game,
  state,
  subject,
}) => {
  const lrs = useLRS();
  const classes = useStyles();

  if (state === minesweeper('hidden')) {
    return (
      <div
        className={classes.cell}
        onClick={() => lrs.actions.minesweeper.open(game, subject)}
        onContextMenu={(e) => {
          e.preventDefault();
          lrs.actions.minesweeper.flag(game, subject);
        }}
      />
    );
  } else if (state === minesweeper('flagged')) {
    return (
      <div
        className={classes.cell}
        onContextMenu={(e) => {
          e.preventDefault();
          lrs.actions.minesweeper.hide(game, subject);
        }}
      >
        <FlagIcon />
      </div>
    );
  }

  const prefixTrim = minesweeper('').value.length
  const child = content === minesweeper('mine')
    ? <BugReportIcon />
    : content.value.substring(prefixTrim);

  return (
    <div className={clsx(classes.cell, classes.inactionable)}>
      {child === '0' ? '' : child}
    </div>
  );
};

Cell.type = minesweeper('Cell');

Cell.topology = [
  undefined,
  new NamedNode("https://ontola-mash.herokuapp.com/article"),
];

Cell.mapDataToProps = {
  content: minesweeper('cell/content'),
  state: minesweeper('cell/state'),
};

export default register(Cell);
