import { render } from '@testing-library/react';
import RoomEdit from '.';

it('renders without crashing', () => {
    render(
        <RoomEdit
            room={{
                id: '',
                name: '',
                width: 1,
                height: 1,
                occupantIds: [],
            }}
            updateRoom={() => {}}
            editDialogOpen={true}
            closeDialog={() => {}}
            flatmates={[]}
        />
    );
});
