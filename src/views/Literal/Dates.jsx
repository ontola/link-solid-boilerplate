import rdfs from '@ontologies/rdfs'
import xsd from '@ontologies/xsd'
import React from 'react';

import { browserListTopology } from '../../topologies/BrowserList'

const Dates = ({ linkedProp }) => (
  <span>
    {new Date(linkedProp.value).toLocaleString()}
  </span>
);

// Set the type to Literal to render individual values.
Dates.type = rdfs.Literal;

/**
 * The `property` field now acts to resolve the data type rather than the predicate.
 * In this case, the dbpedia `usDollar` type.
 */
Dates.property = xsd.dateTime;

// Here too, we can adjust rendering for the appropriate context.
Dates.topology = browserListTopology;

export default Dates;
