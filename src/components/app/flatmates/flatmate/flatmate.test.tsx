import { render } from '@testing-library/react';
import Flatmate from '.';

it('renders without crashing', () => {
    render(
        <Flatmate
            amount={220.0}
            area={10}
            rooms={[]}
            flatmate={{ id: '1', name: '', color: '' }}
            removeFlatmate={() => {}}
            updateFlatmateName={() => {}}
            flatmateCount={2}
        />
    );
});
