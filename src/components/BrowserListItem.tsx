import { Node } from "@ontologies/core";
import React, { CSSProperties, FC } from 'react';

import Link from './Link'

const style = {
  listStyle: 'none',
};

const listStyle: CSSProperties = {
  display: 'flex',
  color: '#4d4d4d',
  padding: '.8em',
  fontSize: '1.5em',
  overflowWrap: 'break-word',
};

const nameStyle = {
  flexGrow: 1,
};

export interface Props {
  title: string;
  name: string;
  to: Node;
}

const BrowserListItem: FC<Props> = ({
  title,
  name,
  children,
  to,
}) => (
  <li style={style}>
    <Link style={listStyle} to={to}>
      <span style={nameStyle} title={title} >{name}</span>
      {children}
    </Link>
  </li>
);

export default BrowserListItem;
