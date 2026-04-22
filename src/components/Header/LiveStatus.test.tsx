import { render, screen, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import LiveStatus from './LiveStatus';

// 1. Mock the date formatter to return a predictable, stable string
// Match the "HH:mm:ss" part of the real utility's likely output
vi.mock('../../utils/dateFormatter', () => ({
  formatDate: (date: Date) => {
    const h = String(date.getUTCHours()).padStart(2, '0');
    const m = String(date.getUTCMinutes()).padStart(2, '0');
    const s = String(date.getUTCSeconds()).padStart(2, '0');
    return `22 Apr 2026, ${h}:${m}:${s}`;
  },
}));

describe('LiveStatus Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Set system time to a fixed point (UTC for predictability)
    vi.setSystemTime(new Date('2026-04-22T10:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders the LIVE badge', () => {
    render(<LiveStatus />);
    expect(screen.getByText(/live/i)).toBeInTheDocument();
  });

  it('updates the displayed time every second', () => {
    render(<LiveStatus />);

    // 2. Flexible Matcher Function
    // This finds the text even if it's combined with other strings or elements
    const findTime = (timeStr: string) =>
      screen.getByText((_, element) => {
        const hasText = (node: Element | null) =>
          node?.textContent?.includes(timeStr);
        const nodeHasText = hasText(element);
        const childrenDontHaveText = Array.from(element?.children || []).every(
          (child) => !hasText(child as Element)
        );
        return (nodeHasText && childrenDontHaveText) || false;
      });

    // Check initial state (from mocked formatDate)
    expect(findTime('10:00:00')).toBeInTheDocument();

    // 3. Fast-forward 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Verify the update
    expect(findTime('10:00:01')).toBeInTheDocument();
  });

  it('cleans up the interval on unmount', () => {
    // 4. Spy on window.clearInterval to verify cleanup
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    const { unmount } = render(<LiveStatus />);

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it('verifies the interval is cleared via timer count', () => {
    // 5. Verify active timers count
    const { unmount } = render(<LiveStatus />);

    // One timer should be active (from the useEffect)
    expect(vi.getTimerCount()).toBe(1);

    unmount();

    // Timer should be gone
    expect(vi.getTimerCount()).toBe(0);
  });
});
