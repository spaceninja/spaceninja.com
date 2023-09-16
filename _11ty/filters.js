const path = require('path');
const { DateTime } = require('luxon');

const filters = {
  // Filter to parse a string as JSON
  fromJson: JSON.parse,

  // Given a relative image file page, return the full path
  imgPath: (relativeFilePath) => {
    const imageAssetsPath = path.join('src', '_assets', '_images');
    return path.resolve(imageAssetsPath, relativeFilePath);
  },

  // Date formatting (human readable)
  // @see https://moment.github.io/luxon/#/formatting?id=table-of-tokens
  readableDate: (dateObj, format, zone) => {
    return DateTime.fromJSDate(dateObj, { zone: zone || 'utc' }).toFormat(
      format || 'DDD',
    );
  },

  // Date formatting (machine readable)
  // @see https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  htmlDateString: (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  },

  // Get the first `n` elements of a collection.
  head: (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  },

  // Return the smallest number argument
  min: (...numbers) => {
    return Math.min.apply(null, numbers);
  },

  // Return all the tags used in a collection
  getAllTags: (collection) => {
    let tagSet = new Set();
    for (let item of collection) {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    }
    return Array.from(tagSet);
  },

  // Return all the tags used in a collection, except some
  filterTagList: (tags) => {
    return (tags || []).filter(
      (tag) => ['all', 'nav', 'blog'].indexOf(tag) === -1,
    );
  },
};

module.exports = filters;
