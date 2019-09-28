import React from 'react';
import ReactDOM from 'react-dom';
import Room from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Room name="Test" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
