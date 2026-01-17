import { render } from '@testing-library/react';
import Room from '.';

it('renders without crashing', () => {
    render(
        <Room
            room={{
                id: 'room1',
                name: 'My Room',
                width: 1,
                height: 2,
                occupantIds: [],
            }}
            updateRoom={() => {}}
            remove={() => {}}
            flatmates={[]}
        />
    );
});
