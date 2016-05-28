import * as _ from 'lodash';

export function array2json(lines, object) {
  console.log('lines', lines);
  console.log('object', object);

  _.reduce(lines, function (result, item: string) {
    let parts;

    item = item.trim();

    if (item.length > 0) {
      parts = item.split('=');
      result[parts[0]] = parts[1];
    }
    return result;
  }, object);
};

export function array2json2(lines, object) {
  console.log('lines', lines);
  console.log('object', object);

  _.reduce(lines, function (result, item: string) {
    let parts;

    item = item.trim();

    if (item.length > 0) {
      parts = item.split(':');
      if (parts.length === 2) {
        result[_.camelCase(parts[0].trim())] = parts[1].trim();
      } else {
        //result[_.camelCase(item.trim())] = null;
      }
    }
    return result;
  }, object);
};

export function array2json3(lines, object) {
  console.log('lines', lines);
  console.log('object', object);

  _.reduce(lines, function (result, item: string) {
    let parts;

    item = item.trim();

    if (item.length > 0) {
      parts = item.split('\t');
      if (parts.length === 2) {
        result[_.camelCase(parts[0].trim())] = parts[1].trim();
      } else {
        //result[_.camelCase(item.trim())] = null;
      }
    }
    return result;
  }, object);
};
