import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Layout from './Layout';

describe('Layout Component', () => {
  it('renders title and children correctly', () => {
    render(
      <Layout title="Dashboard">
        <div data-testid="child">Content</div>
      </Layout>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders subtitle only when provided', () => {
    const { rerender } = render(
      <Layout title="T">
        <div />
      </Layout>
    );
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();

    rerender(
      <Layout title="T" subtitle="System Online">
        <div />
      </Layout>
    );
    expect(screen.getByText('System Online')).toBeInTheDocument();
  });

  it('renders action buttons in the header', () => {
    render(
      <Layout title="T" actions={<button>Refresh</button>}>
        <div />
      </Layout>
    );
    expect(
      screen.getByRole('button', { name: /refresh/i })
    ).toBeInTheDocument();
  });
});
