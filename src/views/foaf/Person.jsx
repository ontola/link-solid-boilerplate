import rdf from '@ontologies/core'
import foaf from '@ontologies/foaf'
import React from 'react';
import { LinkedResourceContainer } from 'link-redux'

import Link from '../../components/Link'
import ldp from '../../ontology/ldp'
import vcard from '../../ontology/vcard'
import PreviewList from '../../topologies/PreviewList'

const styles = {
  padding: '1em',
};

const Person = ({
  hasPhoto,
  inbox,
  knows,
  name,
  organizationName,
  storage,
}) => (
  <div style={styles}>
    <h1>{name.value}</h1>
    {hasPhoto && (
      <img
        src={hasPhoto.value}
        alt="Profile picture"
        style={{
          maxHeight: '8em'
        }}
      />
    )}
    {organizationName && (
      <PropertyDisplayRow label="Inbox">
        {organizationName.value}
      </PropertyDisplayRow>
    )}
    {storage && (
      <PropertyDisplayRow label="Pod">
        <Link to={storage}>
          {storage.value}
        </Link>
      </PropertyDisplayRow>
    )}
    {inbox && (
      <PropertyDisplayRow label="Inbox">
        <Link to={inbox}>
          {inbox.value}
        </Link>
      </PropertyDisplayRow>
    )}
    {knows && knows.length > 0 && (
      <PreviewList>
        <b>Knows</b>
        {knows.map((iri) => (
          <LinkedResourceContainer key={iri.value} subject={iri} />
        ))}
      </PreviewList>
    )}
  </div>
);

Person.type = foaf.Person;

Person.mapDataToProps = {
  inbox: ldp.inbox,
  knows: {
    label: foaf.knows,
    limit: Infinity,
  },
  name: foaf.name,
  hasPhoto: vcard.ns('hasPhoto'),
  organizationName: vcard.ns('organization-name'),
  storage: rdf.namedNode('http://www.w3.org/ns/pim/space#storage'),
}

export default Person;
