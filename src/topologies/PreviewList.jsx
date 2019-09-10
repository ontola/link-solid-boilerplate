import { TopologyProvider } from 'link-redux'
import React from 'react';

import { appNS } from '../helpers/app'

export const previewListTopology = appNS('previewList');

class PreviewList extends TopologyProvider {
  constructor(props) {
    super(props);

    this.topology = previewListTopology;
    this.className = 'PreviewList';
  }
}

export default PreviewList;
