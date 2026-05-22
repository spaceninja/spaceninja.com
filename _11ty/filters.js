import path from 'path';

const imageAssetsPath = path.join('_assets', '_images');

export const resolvedImgPath = (relativeFilePath) => {
  return path.resolve('src', imageAssetsPath, relativeFilePath);
};

export const imgPath = (relativeFilePath) => {
  return path.join('/', imageAssetsPath, relativeFilePath);
};

const filters = {
  // Filter to parse a string as JSON
  fromJson: JSON.parse,

  // Given a relative image file page, return the full path
  imgPath: imgPath,

  // Date formatting (human readable), e.g. "Aug 6, 2014"
  readableDate: (dateObj) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(dateObj);
  },

  // Date formatting (machine readable)
  // @see https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  htmlDateString: (dateObj) => {
    return new Date(dateObj).toISOString().slice(0, 10);
  },

  // Return the whole number of years between an ISO date and today
  diffInYears: (dateISO) => {
    const [year, month, day] = dateISO.split('-').map(Number);
    const now = new Date();
    let years = now.getFullYear() - year;
    const monthDiff = now.getMonth() + 1 - month;
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < day)) {
      years -= 1;
    }
    return years;
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

export default filters;
