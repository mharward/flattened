import React from 'react';
import ReactDOM from 'react-dom';
import Help from '.';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Help>Content</Help>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
