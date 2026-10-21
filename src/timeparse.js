function parseTimestamp(value) {
  const ms = Date.parse(value);
  if (Number.isNaN(ms)) {
    throw new Error(`invalid timestamp: ${value}`);
  }
  return ms;
}

function formatTimestamp(ms) {
  return new Date(ms).toISOString();
}

module.exports = { parseTimestamp, formatTimestamp };
