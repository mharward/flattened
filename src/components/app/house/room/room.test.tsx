import React from 'react';
import ReactDOM from 'react-dom';
import Room from '.';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Room
            name="My Room"
            width={1}
            height={2}
            occupants={[]}
            remove={() => {}}
        />,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
