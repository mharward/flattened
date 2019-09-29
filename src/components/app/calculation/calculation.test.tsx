import React from 'react';
import ReactDOM from 'react-dom';
import Calculation from '.';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Calculation amount={220.0} rooms={[]} flatmates={[]} />,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
