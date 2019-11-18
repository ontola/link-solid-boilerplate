import { Literal } from '@ontologies/core';
import foaf from '@ontologies/foaf';
import { FC } from "link-redux";
import React from 'react';

import Link from '../../components/Link'
import { previewListTopology } from '../../topologies/PreviewList'

const styles = {
  padding: '1em',
};

export interface Props {
  name: Literal;
}

const PersonPreviewList: FC<Props> = ({ name }) => (
  <Link style={styles}>
    <p>{name.value}</p>
  </Link>
);

PersonPreviewList.type = foaf.Person;

PersonPreviewList.topology = previewListTopology;

PersonPreviewList.mapDataToProps = {
  name: foaf.name,
};

export default PersonPreviewList;
