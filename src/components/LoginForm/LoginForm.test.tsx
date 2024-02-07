import { render, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '.';
import { vitest } from "vitest";

describe('LoginForm', () => {
  test('renders correctly', () => {
    const { getByLabelText, getByRole } = render(<LoginForm />);

    expect(getByLabelText('Username')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  test('calls onSubmit with form data when form is submitted', async () => {
    const handleSubmit = vitest.fn();
    const { getByLabelText, getByRole } = render(<LoginForm onSubmit={handleSubmit} />);

    fireEvent.input(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.input(getByLabelText('Password'), { target: { value: 'testpass' } });
    fireEvent.click(getByRole('button'));

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({ username: 'testuser', password: 'testpass' }));
  });

  test('disables inputs and button while loading', () => {
    const { getByLabelText, getByRole } = render(<LoginForm isLoading />);

    expect(getByLabelText('Username')).toBeDisabled();
    expect(getByLabelText('Password')).toBeDisabled();
    expect(getByRole('button')).toBeDisabled();
  });

  test('prevents submission with invalid data', async () => {
    const handleSubmit = vitest.fn();
    const { getByLabelText, getByRole } = render(<LoginForm onSubmit={handleSubmit} />);
  
    // Case 1: Username is empty
    fireEvent.input(getByLabelText('Username'), { target: { value: '' } });
    fireEvent.input(getByLabelText('Password'), { target: { value: 'testpass' } });
    fireEvent.click(getByRole('button'));
    await waitFor(() => expect(handleSubmit).not.toHaveBeenCalled());
  
    // Case 2: Password is empty
    fireEvent.input(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.input(getByLabelText('Password'), { target: { value: '' } });
    fireEvent.click(getByRole('button'));
    await waitFor(() => expect(handleSubmit).not.toHaveBeenCalled());
  });
});