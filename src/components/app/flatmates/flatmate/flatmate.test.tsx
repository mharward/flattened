import React from 'react';
import ReactDOM from 'react-dom';
import Flatmate from '.';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Flatmate
            amount={220.0}
            area={10}
            rooms={[]}
            flatmate={{ id: '1', name: '', color: '' }}
            removeFlatmate={() => {}}
            flatmateCount={2}
        />,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
