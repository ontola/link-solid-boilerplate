import foaf from '@ontologies/foaf'
import { Property } from 'link-redux'
import React from 'react';

const PersonalProfileDocument = () => <Property label={foaf.primaryTopic} />;

PersonalProfileDocument.type = foaf.PersonalProfileDocument;

export default PersonalProfileDocument;
