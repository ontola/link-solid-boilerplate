import { filename } from "@ontola/mash";
import dcterms from '@ontologies/dcterms'
import { Literal, NamedNode } from "@ontologies/core";
import foaf from '@ontologies/foaf'
import rdfs from '@ontologies/rdfs'
import schema from '@ontologies/schema'
import { FC, Property } from "link-redux";
import React from 'react';

import BrowserListItem from '../../components/BrowserListItem'
import { browserListTopology } from '../../topologies/BrowserList'

export interface Props {
  name: Literal;
}

const ResourceBrowserList: FC<Props> = ({
  name,
  subject,
}) => {
  const displayName = name?.value || filename(subject as NamedNode);

  return (
    <BrowserListItem
      name={displayName}
      title={subject.value}
      to={subject}
    >
        <Property label={dcterms.modified} />
    </BrowserListItem>
  );
};

ResourceBrowserList.type = rdfs.Resource;

ResourceBrowserList.topology = browserListTopology;

ResourceBrowserList.mapDataToProps = {
  name: [
    schema.name,
    rdfs.label,
    dcterms.title,
    foaf.name,
  ],
};

ResourceBrowserList.linkOpts = { forceRender: true };

export default ResourceBrowserList;
