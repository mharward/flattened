import { render } from '@testing-library/react';
import Rent from '.';

it('renders without crashing', () => {
    render(<Rent amount={'220'} amountChange={() => {}} />);
});
