import React from 'react';
import { NamedNode, Namespace } from 'rdflib'
import { defaultNS as NS } from 'link-lib'
import { LinkedResourceContainer, register } from 'link-redux'
import Link from '../../components/Link'

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

Person.type = NS.foaf('Person');
const vcard = Namespace('http://www.w3.org/2006/vcard/ns#')
Person.mapDataToProps = {
  inbox: { label: new NamedNode('http://www.w3.org/ns/ldp#inbox')},
  knows: {
    label: NS.foaf('knows'),
    limit: Infinity,
  },
  name: { label: NS.foaf('name')},
  hasPhoto: { label: vcard('hasPhoto')},
  organizationName: { label: vcard('organization-name')},
  storage: { label: new NamedNode('http://www.w3.org/ns/pim/space#storage')},
}

export default register(Person);
