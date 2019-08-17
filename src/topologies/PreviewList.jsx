import { TopologyProvider } from 'link-redux'
import React from 'react';

import { minesweeper } from '../helpers/minesweeper'

export const previewListTopology = minesweeper('previewList');

class PreviewList extends TopologyProvider {
  constructor(props) {
    super(props);

    this.topology = previewListTopology;
    this.className = 'PreviewList';
  }
}

export default PreviewList;
