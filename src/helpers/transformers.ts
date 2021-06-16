import {
  LinkedRenderStore,
  ResponseTransformer,
  transformers,
} from 'link-lib';
// import N3 from 'n3';
// import rdf from '@ontologies/core';

// N3.DataFactory = rdf

const PRIO_MAX = 1.0;

// const parser = new N3.Parser();
// parser.parse(
//   body,
//   (error, quad, prefixes) => {
//     if (quad)
//       console.log(quad);
//     else
//       console.log("# That's all, folks!", prefixes);
// });

export default (lrs: LinkedRenderStore<any>): Array<{
  acceptValue: number;
  mediaTypes: string;
  storeTransformer: boolean;
  transformer: ResponseTransformer;
}> => ([
  // {
  //   acceptValue: PRIO_MAX,
  //   mediaTypes: 'application/n-triples',
  //   storeTransformer: false,
  //   transformer: transformers.linkedDeltaProcessor(lrs),
  // },
  {
    acceptValue: PRIO_MAX,
    mediaTypes: 'application/n-quads',
    storeTransformer: true,
    transformer: transformers.linkedDeltaProcessor(lrs),
  },
  // {
  //   acceptValue: PRIO_MAX,
  //   mediaTypes: 'text/turtle',
  //   storeTransformer: false,
  //   transformer: transformers.linkedDeltaProcessor(lrs),
  // },
]);
