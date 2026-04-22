import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorState from './ErrorState';

describe('ErrorState Component', () => {
  it('renders default error message', () => {
    render(<ErrorState />);
    expect(
      screen.getByText('An error occurred while fetching data...')
    ).toBeInTheDocument();
  });

  it('renders custom error message', () => {
    render(<ErrorState errorMessage="404 Not Found" />);
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
