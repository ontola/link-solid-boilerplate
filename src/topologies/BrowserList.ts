import { TopologyProvider } from 'link-redux'

import { appNS } from '../helpers/app'

export const browserListTopology = appNS('browserList');

class BrowserList extends TopologyProvider {
  constructor(props: any) {
    super(props);

    this.topology = browserListTopology;
    this.elementType = 'ul';
    this.className = 'BrowserList';
  }
}

export default BrowserList;
