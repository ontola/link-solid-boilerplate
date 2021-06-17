import {
  LinkedRenderStore,
  ResponseTransformer,
  transformers,
} from 'link-lib';
import { n3Processor } from "./n3Processor";

const PRIO_HIGH = .9;
const PRIO_MAX = 1.0;

export default (lrs: LinkedRenderStore<any>): Array<{
  acceptValue: number;
  mediaTypes: string;
  transformer: ResponseTransformer;
}> => ([
  {
    acceptValue: PRIO_MAX,
    mediaTypes: 'application/n-triples',
    transformer: transformers.linkedDeltaProcessor(lrs),
  },
  {
    acceptValue: PRIO_MAX,
    mediaTypes: 'application/n-quads',
    transformer: transformers.linkedDeltaProcessor(lrs),
  },
  {
    acceptValue: PRIO_HIGH,
    mediaTypes: 'text/turtle',
    transformer: n3Processor(lrs),
  },
  {
    acceptValue: PRIO_HIGH,
    mediaTypes: 'text/n3',
    transformer: n3Processor(lrs),
  },
]);
