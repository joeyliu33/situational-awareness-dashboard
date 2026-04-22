import LoadingState from './LoadingState';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('LoadingState Component', () => {
  it('renders default message', () => {
    render(<LoadingState />);
    expect(screen.getByText('Waiting for live data...')).toBeInTheDocument();
  });

  it('renders custom message', () => {
    render(<LoadingState message="Fetching config..." />);
    expect(screen.getByText('Fetching config...')).toBeInTheDocument();
  });
});
