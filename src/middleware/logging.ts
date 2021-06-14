import { NamedNode } from '@ontologies/core';
import { MiddlewareActionHandler, MiddlewareWithBoundLRS } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

const logging = () => (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {
  (store as any).actions = {};

  return (next: MiddlewareActionHandler) => (iri: NamedNode, opts: any): Promise<any> => {
    console.log('Link action:', iri, opts);

    return next(iri, opts);
  };
};

export function handle(exception: Error): void {
  console.log(exception)
}

export default logging;
