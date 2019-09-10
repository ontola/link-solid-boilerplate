import { TopologyProvider } from 'link-redux'
import React from 'react';

import { appNS } from '../helpers/app'

export const browserListTopology = appNS('browserList');

class BrowserList extends TopologyProvider {
  constructor(props) {
    super(props);

    this.topology = browserListTopology;
    this.elementType = 'ul';
    this.className = 'BrowserList';
  }
}

export default BrowserList;
