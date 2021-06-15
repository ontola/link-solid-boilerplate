import { DEFAULT_TOPOLOGY } from 'link-lib'
import { FC } from 'link-redux';
import React from 'react';

import ll from '../ontology/ll'
import { browserListTopology } from '../topologies/BrowserList'
import { previewListTopology } from '../topologies/PreviewList'

const LoadingResource: FC = () => (
  <div>loading...</div>
);

LoadingResource.type = ll.LoadingResource;

LoadingResource.topology = [
  DEFAULT_TOPOLOGY,
  browserListTopology,
  previewListTopology,
];

export default LoadingResource;
