import { describe, expect, it } from 'vitest';
import { formatDate } from './dateFormatter';

describe('dateFormatter', () => {
  // Test 1: Standard Ordinals (st, nd, rd, th)
  describe('Ordinal Logic', () => {
    it('should format 1st correctly', () => {
      const date = new Date('2026-04-01T10:00:00');
      expect(formatDate(date)).toMatch(/1st/);
    });

    it('should format 2nd correctly', () => {
      const date = new Date('2026-04-02T10:00:00');
      expect(formatDate(date)).toMatch(/2nd/);
    });

    it('should format 3rd correctly', () => {
      const date = new Date('2026-04-03T10:00:00');
      expect(formatDate(date)).toMatch(/3rd/);
    });

    it('should format 4th correctly', () => {
      const date = new Date('2026-04-04T10:00:00');
      expect(formatDate(date)).toMatch(/4th/);
    });

    it('should handle the "teen" exceptions (11th, 12th, 13th)', () => {
      const d11 = new Date('2026-04-11T10:00:00');
      const d12 = new Date('2026-04-12T10:00:00');
      const d13 = new Date('2026-04-13T10:00:00');

      expect(formatDate(d11)).toMatch(/11th/);
      expect(formatDate(d12)).toMatch(/12th/);
      expect(formatDate(d13)).toMatch(/13th/);
    });
  });

  // Test 2: Time Formatting & AM/PM Capitalization
  describe('Time and AM/PM Formatting', () => {
    it('should format morning times with uppercase AM', () => {
      const date = new Date('2026-04-21T09:05:00');
      // Expected: "Tue 21st 9:05 AM"
      const result = formatDate(date);
      expect(result).toContain('9:05 AM');
    });

    it('should format evening times with uppercase PM', () => {
      const date = new Date('2026-04-21T21:45:00');
      // Expected: "Tue 21st 9:45 PM"
      const result = formatDate(date);
      expect(result).toContain('9:45 PM');
    });

    it('should handle midnight correctly', () => {
      const date = new Date('2026-04-21T00:00:00');
      expect(formatDate(date)).toContain('12:00 AM');
    });

    it('should handle noon correctly', () => {
      const date = new Date('2026-04-21T12:00:00');
      expect(formatDate(date)).toContain('12:00 PM');
    });
  });

  // Test 3: Day Name and Full Output
  describe('Full String Construction', () => {
    it('should return the complete formatted string for a specific day', () => {
      // April 21, 2026 is a Tuesday
      const date = new Date('2026-04-21T15:30:00');
      const result = formatDate(date);

      expect(result).toBe('Tue 21st 3:30 PM');
    });
  });
});
