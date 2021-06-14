import {
  LinkedRenderStore,
  ResponseTransformer,
  transformers,
} from 'link-lib';

const PRIO_MAX = 1.0;

export default (lrs: LinkedRenderStore<any>): Array<{
  acceptValue: number;
  mediaTypes: string;
  storeTransformer: boolean;
  transformer: ResponseTransformer;
}> => ([
  {
    acceptValue: PRIO_MAX,
    mediaTypes: 'application/n-quads',
    storeTransformer: true,
    transformer: transformers.linkedDeltaProcessor(lrs),
  },
  {
    acceptValue: PRIO_MAX,
    mediaTypes: 'application/n-triples',
    storeTransformer: false,
    transformer: transformers.linkedDeltaProcessor(lrs),
  },
]);
