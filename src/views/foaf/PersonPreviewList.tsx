import { Literal } from '@ontologies/core';
import foaf from '@ontologies/foaf';
import { FC, useProperty } from "link-redux";
import * as React from 'react';

import Link from '../../components/Link'
import { previewListTopology } from '../../topologies/PreviewList'

const styles = {
  padding: '1em',
};

export interface Props {
  name: Literal;
}

const PersonPreviewList: FC<Props> = () => {
  const [name] = useProperty(foaf.name);

  return (
    <Link style={styles}>
      <p>{name.value}</p>
    </Link>
  );
}
PersonPreviewList.type = foaf.Person;

PersonPreviewList.topology = previewListTopology;

export default PersonPreviewList;
