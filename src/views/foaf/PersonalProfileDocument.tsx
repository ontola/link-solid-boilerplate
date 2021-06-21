import foaf from '@ontologies/foaf'
import { FC, Property } from "link-redux";
import * as React from 'react';

const PersonalProfileDocument: FC = () => <Property label={foaf.primaryTopic} />;

PersonalProfileDocument.type = foaf.PersonalProfileDocument;

export default PersonalProfileDocument;
