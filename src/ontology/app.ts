import rdf, { createNS } from '@ontologies/core';
import * as dcterms from '@ontologies/dcterms';
import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { arrayToSeqQuads } from '@rdfdev/collections';

export const website = 'https://example.com';
export const frontendIRI = rdf.namedNode(website!);
export const frontendIRIStr = frontendIRI.value;
export const frontendPathname = new URL(frontendIRIStr).pathname;
export const frontendOrigin = new URL(frontendIRIStr).origin;

const app = createNS(frontendIRIStr.endsWith('/') ? frontendIRIStr : `${frontendIRIStr}/`);

const contents = app('contents');
const parent = app('parent');
const thumbnail = app('thumbnail');
const title = app('title');

export const contentsProps = [schema.text, schema.description, dcterms.description];
export const titleProps = [schema.name, rdfs.label, foaf.name, dcterms.title];
export const parentProps = [schema.isPartOf, schema.superEvent, dcterms.isReferencedBy];

export const appOntology = [
  ...arrayToSeqQuads(contentsProps, contents),
  ...arrayToSeqQuads(titleProps, title),
  ...arrayToSeqQuads(parentProps, parent),
];

export default {
  ns: app,

  // eslint-disable-next-line sort-keys
  contents,
  parent,
  thumbnail,
  title,

  /* classes */
  // eslint-disable-next-line sort-keys
  AppSignOut: app('AppSignOut'),
  Menu: app('Menu'),

  /* properties */
  bannerMembers: app('banners?page=1#members'),
  c_a: app('c_a'),
  collectionResource: app('collectionResource'),
  currentTab: app('currentTab'),
  empty: app('empty'),
  menu: app('menu'),
  menuTabs: app('menuTabs'),
  n: app('n'),
  omniform: app('omniform'),
  pagination: app('pagination'),
  policy: app('policy'),
  privacy: app('privacy'),
  search: app('search'),
  target: app('target'),

  /* individuals */
  // eslint-disable-next-line sort-keys
  ['individuals/searchTarget']: app('individuals/searchTarget'),
};
