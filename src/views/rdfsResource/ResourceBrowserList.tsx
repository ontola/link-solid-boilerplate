import dcterms from '@ontologies/dcterms'
import { Literal, NamedNode } from "@ontologies/core";
import foaf from '@ontologies/foaf'
import rdfs from '@ontologies/rdfs'
import schema from '@ontologies/schema'
import { FC, Property, useProperty } from "link-redux";
import React from 'react';

import BrowserListItem from '../../components/BrowserListItem'
import { browserListTopology } from '../../topologies/BrowserList'
import { filename } from '@rdfdev/iri';

export interface Props {
  name: Literal;
}

const namePredicates = [
  schema.name,
  rdfs.label,
  dcterms.title,
  foaf.name,
]

const ResourceBrowserList: FC<Props> = ({
  subject,
}) => {
  const [name] = useProperty(namePredicates)
  const [modified] = useProperty(dcterms.modified);
  const displayName = name?.value || filename(subject as NamedNode);

  return (
    <BrowserListItem
      name={displayName}
      title={subject.value}
      to={subject}
    >
      {modified.value}
    </BrowserListItem>
  );
};

ResourceBrowserList.type = rdfs.Resource;

ResourceBrowserList.topology = browserListTopology;

export default ResourceBrowserList;
