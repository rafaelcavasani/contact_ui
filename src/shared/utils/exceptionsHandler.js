import { isEmpty, isString } from 'lodash';

export function parseExceptionMessage(data) {
  if (!isEmpty(data)) {
    if (isString(data)) return data;

    return Object.keys(data)
      .map(key => `${key.toUpperCase()}: ${[data[key]]}`)
      .join('\n');
  }

  return null;
}
