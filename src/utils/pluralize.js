const pluralize = (text, plural, count, inclusive) => count === 1 ? (inclusive ? count+" ": "") + text : (inclusive ? count+" ": "") + text + plural;

export default pluralize;