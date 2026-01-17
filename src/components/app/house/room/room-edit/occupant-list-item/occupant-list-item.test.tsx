import { render } from '@testing-library/react';
import OccupantListItem from '.';

it('renders without crashing', () => {
    render(
        <OccupantListItem
            flatmate={{
                id: '',
                name: '',
                color: '',
            }}
            room={{
                id: '',
                name: '',
                width: 1,
                height: 1,
                occupantIds: [],
            }}
            updateRoom={() => {}}
        />
    );
});
