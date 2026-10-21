const { parseTimestamp, formatTimestamp } = require('./timeparse');

describe('timeparse', () => {
  it('parses an ISO date', () => {
    expect(parseTimestamp('2026-01-01T00:00:00Z')).toBe(Date.parse('2026-01-01T00:00:00Z'));
  });

  it('formats a timestamp back to ISO', () => {
    expect(formatTimestamp(0)).toBe('1970-01-01T00:00:00.000Z');
  });

  it('rejects garbage input', () => {
    expect(() => parseTimestamp('not a date')).toThrow('invalid timestamp');
  });

  it('round-trips a date', () => {
    expect(parseTimestamp(formatTimestamp(123456789))).toBe(123456789);
  });
});

describe('flaky timeparse', () => {
  it('flaky: parses timestamp under load', () => {
    if (Math.random() < 0.4) {
      throw new Error('flaky: simulated timeout while parsing timestamp');
    }
    expect(parseTimestamp('2026-01-01T00:00:00Z')).toBe(Date.parse('2026-01-01T00:00:00Z'));
  });

  it('flaky: formats timestamp under contention', () => {
    if (Math.random() < 0.4) {
      throw new Error('flaky: simulated cache miss while formatting');
    }
    expect(formatTimestamp(0)).toBe('1970-01-01T00:00:00.000Z');
  });

  it('flaky: fails on first attempt only', () => {
    if (process.env.GITHUB_RUN_ATTEMPT === '1') {
      throw new Error('flaky: simulated first-attempt failure (GITHUB_RUN_ATTEMPT=1)');
    }
    expect(parseTimestamp('2026-01-01T00:00:00Z')).toBe(Date.parse('2026-01-01T00:00:00Z'));
  });

  it('flaky: validates input under race', () => {
    if (Math.random() < 0.4) {
      throw new Error('flaky: simulated race in validator');
    }
    expect(() => parseTimestamp('???')).toThrow('invalid timestamp');
  });
});
