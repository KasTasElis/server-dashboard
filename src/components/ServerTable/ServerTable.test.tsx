import { render } from '@testing-library/react';
import {ServerTable} from './ServerTable';

test('renders ServerTable correctly', () => {
  const serverData = [
    { name: 'Server 1', distance: 100 },
    { name: 'Server 2', distance: 200 },
  ];
  const { getByText } = render(<ServerTable serverData={serverData} sortBy="none" />);

  // Check if table headers are present
  expect(getByText(/Server Name/i)).toBeInTheDocument();
  expect(getByText(/Distance (km)/i)).toBeInTheDocument();

  // Check if server data is present
  expect(getByText('Server 1')).toBeInTheDocument();
  expect(getByText('100')).toBeInTheDocument();
  expect(getByText('Server 2')).toBeInTheDocument();
  expect(getByText('200')).toBeInTheDocument();
});