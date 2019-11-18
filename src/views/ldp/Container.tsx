import { Node } from '@ontologies/core';
import { LinkedResourceContainer } from 'link-redux'
import React from 'react';

import BrowserListHeader from '../../components/BrowserListHeader'
import ldp from '../../ontology/ldp'
import BrowserList from '../../topologies/BrowserList'

export interface Props {
  contains: Node[];
}

const Container = ({ contains }: Props) => (
  <BrowserList>
    <BrowserListHeader name="name">
      <span>modified</span>
    </BrowserListHeader>
    {contains.map(member => (
      <LinkedResourceContainer
        fetch
        key={member.value}
        subject={member}
      />
    ))}
  </BrowserList>
);

Container.type = ldp.Container;

Container.mapDataToProps = {
  contains: {
    label: ldp.contains,
    limit: Infinity,
  }
};

export default Container;
