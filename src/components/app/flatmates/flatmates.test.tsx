import React from 'react';
import ReactDOM from 'react-dom';
import Flatmates from '.';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Flatmates
            amount={220.0}
            area={10}
            rooms={[]}
            flatmates={[]}
            addFlatmate={() => {}}
            removeFlatmate={() => {}}
        />,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
