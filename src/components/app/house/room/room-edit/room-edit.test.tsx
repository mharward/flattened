import React from 'react';
import ReactDOM from 'react-dom';
import RoomEdit from '.';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <RoomEdit
            room={{
                id: '',
                name: '',
                width: 1,
                height: 1,
                occupants: [],
            }}
            updateRoom={() => {}}
            editDialogOpen={true}
            closeDialog={() => {}}
        />,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
