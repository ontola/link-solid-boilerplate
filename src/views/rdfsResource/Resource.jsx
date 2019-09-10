import { defaultNS as NS } from 'link-lib'
import { register, useLRS } from 'link-redux'
import React from 'react';

const messageStyle = {
	padding: '1.0em',
};
const buttonStyle = {
	margin: '0 .5em',
}

/**
 * Everything is a rdfs:Resource, so if we hit this view, it means the loaded app list hasn't got
 * the right type (app:TodoList), so we ask the user to initialize the datastructure we need.
 */
const Resource = ({ subject }) => {
	const lrs = useLRS();

	return (
		<p className="TodoMessage" style={messageStyle}>
			It looks like the resource isn't a known type, do you want to initialize the file?
			<button
				className="Button"
				style={buttonStyle}
				onClick={() => lrs.actions.app.initialize(subject)}
			>
				Initialize now
			</button>
		</p>
	);
};

Resource.type = NS.rdfs('Resource');

export default register(Resource);
