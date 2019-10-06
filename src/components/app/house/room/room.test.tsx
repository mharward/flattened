import React from 'react';
import ReactDOM from 'react-dom';
import Room from '.';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Room
            room={{
                id: 'room1',
                name: 'My Room',
                width: 1,
                height: 2,
                occupants: [],
            }}
            updateRoom={() => {}}
            remove={() => {}}
            flatmates={[]}
        />,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
