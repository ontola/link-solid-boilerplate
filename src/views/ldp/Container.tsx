import { Resource, useProperty } from "link-redux";
import React from 'react';

import BrowserListHeader from '../../components/BrowserListHeader'
import ldp from '../../ontology/ldp'
import BrowserList from '../../topologies/BrowserList'

const Container = () => {
  // This hook allows you to get any property / value combination from the resource.
  // The ldp.contains essentially contains a URL for the predicate.
  const contains = useProperty(ldp.contains);

  return (
    <BrowserList>
      <BrowserListHeader name="name">
        <span>modified</span>
      </BrowserListHeader>
      {contains.map(member => (
        // This renders a nested Resource.
        // Each subject will be fetcher by Link
        <Resource
          key={member.value}
          subject={member}
        />
      ))}
    </BrowserList>
  );
};

// The Type attribute dictates for which RDF Classes
Container.type = ldp.Container;

export default Container;
