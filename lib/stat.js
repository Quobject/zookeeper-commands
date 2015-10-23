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
var debug = require('debug')('zookeeper-commands:stat.js');

module.exports = function (lines, object) {
  debug('lines', lines);
  debug('object', object);

  object.clients = [];
  object.latency = {};

  lines.forEach(function (line) {
    var regexArray = [
      {
        re: /Zookeeper version: (.*), built on (.*)/,
        run: function (mp) {
          //debug('mp', mp);
          object.zookeeperVersion = mp[1];
          object.buildDate = mp[2];
        }
      },
      {
        re: / \/(.*):(.*)\(queued=(\d*),recved=(\d*),sent=(\d*)/,
        run: function (mp) {
          //debug('mp', mp);

          object.clients.push({
            ip: mp[1],
            port: mp[2],
            queued: mp[3],
            received: mp[4],
            sent: mp[5]
          });
        }
      },
      {
        re: /Latency min\/avg\/max: (\d*)\/(\d*)\/(\d*)/,
        run: function (mp) {
          //debug('mp', mp);

          object.latency.minimum = mp[1];
          object.latency.average = mp[2];
          object.latency.maximum = mp[3];
        }
      },
      {
        re: /Received: (\d*)/,
        run: function (mp) {
          object.reveiced = mp[1];
        }
      },
      {
        re: /Sent: (\d*)/,
        run: function (mp) {
          object.sent = mp[1];
        }
      },
      {
        re: /Connections: (\d*)/,
        run: function (mp) {
          object.connections = mp[1];
        }
      },
      {
        re: /Outstanding: (\d*)/,
        run: function (mp) {
          object.outstanding = mp[1];
        }
      },
      {
        re: /Zxid: (0x\d*)/,
        run: function (mp) {
          debug('mp', mp);
          object.zxid = mp[1];
        }
      },
      {
        re: /Mode: (.*)/,
        run: function (mp) {
          debug('mp', mp);
          object.mode = mp[1];
        }
      },
      {
        re: /Node count: (.*)/,
        run: function (mp) {
          debug('mp', mp);
          object.nodeCount = mp[1];
        }
      },



    ];

    regexArray.forEach(function (extracter) {
      var re = extracter.re;
      var str = line;
      var m;

      if ((m = re.exec(str)) !== null) {
        if (m.index === re.lastIndex) {
          re.lastIndex++;
        }
        // View your result using the m-variable.
        // eg m[0] etc.
        return extracter.run(m);
      }
    });

  });


                                                                                                     

};