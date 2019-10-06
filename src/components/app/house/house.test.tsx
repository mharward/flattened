import React from 'react';
import ReactDOM from 'react-dom';
import House from './';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <House
            area={10}
            rooms={[]}
            addRoom={() => {}}
            updateRoom={() => {}}
            removeRoom={() => {}}
            flatmates={[]}
        />,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
