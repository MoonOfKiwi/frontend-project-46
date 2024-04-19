import getResultInStylishFormat from './stylish.js';
import getResultInPlainFormat from './plain.js';
import getResultInJSONFormat from './json.js';

const formatComparedData = (comparedData, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return `${getResultInStylishFormat(comparedData)}\n`;
    case 'plain':
      return `${getResultInPlainFormat(comparedData)}\n`;
    case 'json':
      return getResultInJSONFormat(comparedData);
    default:
      throw Error(`Format ${formatName} is not supported!`);
  }
};

export default formatComparedData;
