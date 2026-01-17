import { render } from '@testing-library/react';
import Flatmates from '.';

it('renders without crashing', () => {
    render(
        <Flatmates
            amount={220.0}
            area={10}
            rooms={[]}
            flatmates={[]}
            addFlatmate={() => {}}
            removeFlatmate={() => {}}
            updateFlatmateName={() => {}}
        />
    );
});
