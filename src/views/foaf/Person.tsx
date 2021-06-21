import rdf, { Literal, Node } from "@ontologies/core";
import foaf from '@ontologies/foaf'
import * as React from 'react';
import { FC, Resource } from "link-redux";

import Link from '../../components/Link'
import ldp from '../../ontology/ldp'
import vcard from '../../ontology/vcard'
import PreviewList from '../../topologies/PreviewList'

const styles = {
  padding: '1em',
};

export interface Props {
  hasPhoto: Node;
  inbox: Node;
  knows: Node[];
  name: Literal;
  organizationName: Node;
  storage: Node;
}

const Person: FC<Props> = ({
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
      <div>
        <p>Inbox</p>
        {organizationName.value}
      </div>
    )}
    {storage && (
      <div>
        <p>Pod</p>
        <Link to={storage}>
          {storage.value}
        </Link>
      </div>
    )}
    {inbox && (
      <div>
        <p>Inbox</p>
        <Link to={inbox}>
          {inbox.value}
        </Link>
      </div>
    )}
    {knows && knows.length > 0 && (
      <PreviewList>
        <b>Knows</b>
        {knows.map((iri) => (
          <Resource key={iri.value} subject={iri} />
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
};

export default Person;
