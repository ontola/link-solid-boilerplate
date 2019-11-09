import dcterms from '@ontologies/dcterms'
import rdf from '@ontologies/core'
import foaf from '@ontologies/foaf'
import rdfs from '@ontologies/rdfs'
import schema from '@ontologies/schema'
import { Property } from 'link-redux'
import React from 'react';

import BrowserListItem from '../../components/BrowserListItem'
import { browserListTopology } from '../../topologies/BrowserList'

const retrieveFilename = (iri, folder) => {
  if (typeof folder === "undefined") {
    const url = new URL(iri.value)
    folder = rdf.namedNode(`${url.origin}${url.pathname.split('/').slice(0, -1).join('/')}`)
  }
  let file = iri.value.replace(folder.value, '');
  // There is some issue in redirection or parsing where paths without trailing slash will cause
  // the embedded files to be root-relative IRI's.
  if (file.includes('://')) {
    file = iri.value.replace(folder.site().value, '');
  }

  return file;
};

const ResourceBrowserList = ({
  name,
  subject,
}) => {
  const displayName = name?.value || retrieveFilename(subject);

  return (
    <BrowserListItem
      name={displayName}
      title={subject.value}
      to={subject}
    >
        <Property label={dcterms.modified} />
    </BrowserListItem>
  );
}

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

ResourceBrowserList.linkOpts = { forceRender: true }

export default ResourceBrowserList;
