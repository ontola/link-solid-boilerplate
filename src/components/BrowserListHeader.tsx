import { CSSProperties, FC } from 'react';
import * as React from 'react';

const style = {
  listStyle: 'none',
};

const listStyle: CSSProperties = {
  display: 'flex',
  padding: '.8em',
  fontSize: '1.5em',
  overflowWrap: 'break-word',
};

const nameStyle = {
  flexGrow: 1,
};

export interface Props {
  name: string;
}

const BrowserListHeader: FC<Props> = ({
  name,
  children,
}) => (
  <li style={style}>
    <span style={listStyle}>
      <span style={nameStyle}>{name}</span>
      {children}
    </span>
  </li>
);

export default BrowserListHeader;
