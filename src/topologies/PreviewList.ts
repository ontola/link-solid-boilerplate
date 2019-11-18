import { TopologyProvider } from 'link-redux'

import { appNS } from '../helpers/app'

export const previewListTopology = appNS('previewList');

class PreviewList extends TopologyProvider {
  constructor(props: any) {
    super(props);

    this.topology = previewListTopology;
    this.className = 'PreviewList';
  }
}

export default PreviewList;
