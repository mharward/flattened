import { render } from '@testing-library/react';
import House from './';

it('renders without crashing', () => {
    render(
        <House
            area={10}
            rooms={[]}
            addRoom={() => {}}
            updateRoom={() => {}}
            removeRoom={() => {}}
            flatmates={[]}
        />
    );
});
