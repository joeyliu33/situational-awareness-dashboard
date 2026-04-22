import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Badge from './Badge';

describe('Badge Component', () => {
  it('renders children correctly', () => {
    render(<Badge>Operational</Badge>);
    expect(screen.getByText('Operational')).toBeInTheDocument();
  });

  it('applies success classes by default', () => {
    render(<Badge>Success</Badge>);
    const badge = screen.getByText('Success');

    // Checking the specific Tailwind classes from your Record
    expect(badge).toHaveClass('bg-emerald-400/10');
    expect(badge).toHaveClass('text-emerald-400');
  });

  it('applies warning classes when variant is set to warning', () => {
    render(<Badge variant="warning">Warning</Badge>);
    const badge = screen.getByText('Warning');

    expect(badge).toHaveClass('bg-amber-400/20');
    expect(badge).toHaveClass('text-amber-500');
  });

  it('maintains common utility classes regardless of variant', () => {
    const { rerender } = render(<Badge variant="success">Test</Badge>);
    let badge = screen.getByText('Test');
    expect(badge).toHaveClass('rounded-full', 'whitespace-nowrap');

    rerender(<Badge variant="warning">Test</Badge>);
    badge = screen.getByText('Test');
    expect(badge).toHaveClass('rounded-full', 'whitespace-nowrap');
  });
});
