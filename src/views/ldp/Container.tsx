import { Resource, useProperty } from "link-redux";
import React from 'react';

import BrowserListHeader from '../../components/BrowserListHeader'
import ldp from '../../ontology/ldp'
import BrowserList from '../../topologies/BrowserList'

const Container = () => {
  const contains = useProperty(ldp.contains);

  return (
    <BrowserList>
      <BrowserListHeader name="name">
        <span>modified</span>
      </BrowserListHeader>
      {contains.map(member => (
        <Resource
          key={member.value}
          subject={member}
        />
      ))}
    </BrowserList>
  );
};

Container.type = ldp.Container;

export default Container;
