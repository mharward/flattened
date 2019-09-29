import React from 'react';
import ReactDOM from 'react-dom';
import Rent from '.';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Rent amount={220.0} amountChange={() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
