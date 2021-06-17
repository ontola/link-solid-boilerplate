import { TopologyProvider } from 'link-redux'

import { appNS } from '../helpers/app'

// This is the same as `new NamedNode("myappurl/browserlist")`
export const browserListTopology = appNS('browserList');

// The link-redux TopologyProvider deals with most of the complexity
class BrowserList extends TopologyProvider {
  constructor(props: any) {
    super(props);

    // Create a NamedNode for your Topology, and bind it to this.topology
    this.topology = browserListTopology;
    // This determines the HTML element type (optional)
    this.elementType = 'ul';
    // The CSS Classname (optional)
    this.className = 'BrowserList';
  }
}

export default BrowserList;
