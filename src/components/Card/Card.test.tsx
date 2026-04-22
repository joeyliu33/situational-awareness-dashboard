import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';

describe('Card Component', () => {
  it('renders title and children content', () => {
    render(
      <Card title="Network Traffic">
        <div data-testid="card-content">Main Content</div>
      </Card>
    );

    expect(screen.getByText('Network Traffic')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
  });

  it('renders a badge in the header when provided', () => {
    render(
      <Card title="Title" badge={<span data-testid="test-badge">Active</span>}>
        <p>Content</p>
      </Card>
    );

    expect(screen.getByTestId('test-badge')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies custom className to the section element', () => {
    const customClass = 'custom-test-class';
    // Use container.firstChild to target the <section> tag
    const { container } = render(
      <Card title="T" className={customClass}>
        <div />
      </Card>
    );

    expect(container.firstChild).toHaveClass(customClass);
    // Verify base classes are still present
    expect(container.firstChild).toHaveClass('bg-[#191d2e]');
  });

  it('renders correctly without a badge', () => {
    render(
      <Card title="No Badge">
        <div />
      </Card>
    );

    // Header should exist but contain no extra div for badge
    const header = screen.getByRole('heading', {
      name: /no badge/i,
    }).parentElement;
    expect(header?.children.length).toBe(1); // Only the h2
  });
});
