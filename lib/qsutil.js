/**
* Copyright 2015 Matthias Ludwig
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/
'use strict';

var _ = require('lodash');
var debug = require('debug')('zookeeper-commands:util.js');

module.exports.array2json = function (lines, object) {
  debug('lines', lines);
  debug('object', object);

  _.reduce(lines, function (result, item) {
    var parts;

    item = item.trim();

    if (item.length > 0) {
      parts = item.split('=');
      result[parts[0]] = parts[1];
    }
    return result;
  }, object);
};

module.exports.array2json2 = function (lines, object) {
  debug('lines', lines);
  debug('object', object);

  _.reduce(lines, function (result, item) {
    var parts;

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

module.exports.array2json3 = function (lines, object) {
  debug('lines', lines);
  debug('object', object);

  _.reduce(lines, function (result, item) {
    var parts;

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

                                                                                    