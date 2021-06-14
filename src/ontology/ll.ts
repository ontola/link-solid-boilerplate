import { createNS } from '@ontologies/core';

const ll = createNS('http://purl.org/link-lib/');

export default {
  ns: ll,

  /* classes */
  // eslint-disable-next-line sort-keys
  ErrorResource: ll('ErrorResource'),
  ErrorResponse: ll('ErrorResponse'),
  LoadingResource: ll('LoadingResource'),

  /* properties */
  actionBody: ll('actionBody'),
  /** @deprecated use {ld.add} instead */
  add: ll('add'),
  blob: ll('blob'),
  dataSubject: ll('dataSubject'),
  errorResponse: ll('errorResponse'),
  loadingResource: ll('loadingResource'),
  meta: ll('meta'),
  /** @deprecated use {ld.purge} instead */
  purge: ll('purge'),
  /** @deprecated use {ld.remove} instead */
  remove: ll('remove'),
  /** @deprecated use {ld.replace} instead */
  replace: ll('replace'),
  /** @deprecated use {ld.slice} instead */
  slice: ll('slice'),
  /** @deprecated use {ld.supplant} instead */
  supplant: ll('supplant'),
  view: ll('view'),
};
