import { makeStyles } from '@material-ui/styles'
import { defaultNS as NS } from 'link-lib';
import { LinkedResourceContainer, register, useLRS } from 'link-redux'
import { NamedNode } from 'rdflib'
import React from 'react';

import { minesweeper } from '../../helpers/minesweeper'

const useStyles = makeStyles({
  minefield: {
    background: '#0c2099',
    justifyItems: 'center',
    display: 'grid',
    gridGap: '1px',
    userSelect: 'none',
  }
});
const memberPrefixLen = NS.rdf('_').value.length;
const memberToNumber = (nn) => Number(nn.value.substring(memberPrefixLen));

const MineField = ({
  game,
  subject,
  width,
}) => {
  const lrs = useLRS();
  const classes = useStyles();
  const fields = lrs
    .getResourcePropertyRaw(subject, NS.rdfs('member'))
    .sort((stA, stB) => memberToNumber(stA.predicate) - memberToNumber(stB.predicate));

  return (
    <div
      className={classes.minefield}
      style={{ gridTemplateColumns: `repeat(${Number(width.value)}, 1fr)` }}
    >
      {fields.map(cell => (
        <LinkedResourceContainer
          game={game}
          key={cell.object.value}
          subject={cell.object}
        />
      ))}
    </div>
  );
};

MineField.type = minesweeper('MineField');

MineField.topology = [
  undefined,
  new NamedNode("https://ontola-mash.herokuapp.com/article"),
];

export default register(MineField);
