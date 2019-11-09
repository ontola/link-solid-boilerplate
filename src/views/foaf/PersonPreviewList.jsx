import foaf from '@ontologies/foaf';
import React from 'react';

import Link from '../../components/Link'
import { previewListTopology } from '../../topologies/PreviewList'

const styles = {
  padding: '1em',
};

const PersonPreviewList = ({ name }) => (
  <Link style={styles}>
    <p>{name.value}</p>
  </Link>
);

PersonPreviewList.type = foaf.Person;

PersonPreviewList.topology = previewListTopology;

PersonPreviewList.mapDataToProps = {
  name: foaf.name,
}

export default PersonPreviewList;
