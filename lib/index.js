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

var Promise = require("bluebird");
//var exec = Promise.promisify(require('child_process').exec);
var Netcat = require('node-netcat');

var os = require('os');
var util = require('util');
var _ = require('lodash');
var debug = require('debug')('zookeeper-commands:lib/index.js');



var ZookeeperCommands = function (opts) {
  debug('opts = ', opts);
  if (!(this instanceof ZookeeperCommands)) {
    return new ZookeeperCommands(opts);
  }

  _.merge(this, opts); 
};

ZookeeperCommands.prototype.command = function (command, options, callback) {
  var self = this;

  if (!callback) {
    if (typeof options === 'function') {
      callback = options;
      options = null;
    }
  }

  return Promise.resolve().then(function () {
    //debug('command = ', command);
    if (!command || command.length !== 4) {
      throw 'Each command must be composed of four letters https://zookeeper.apache.org/doc/r3.4.6/zookeeperAdmin.html#sc_zkCommands';
    }

    if (!self.host) {
      throw 'missing host';
    }

    if (!self.host) {
      throw 'missing port';
    }

    //debug('command =', command);
    debug('host =', self.host);
    debug('port =', self.port);
    debug('timeout_ms =', self.timeout_ms);

    var options = {     
      timeout: self.timeout_ms ? self.timeout_ms : 60000,
      read_encoding: 'utf8'
    };

    return new Promise(function (resolve, reject) {
     
      debug('options =', options);
      var client = Netcat.client(self.port, self.host, options);

      client.on('open', function () {
        debug('on open');
        client.send(command);
      });

      client.on('data', function (data) {
        var response = data.toString('utf8');
        debug('response ', response);
        resolve(response);
      });

      client.on('error', function (err) {
        debug(err);
        reject(err);
      });

      client.on('close', function () {
        debug('close');
      });

      client.start();
    });

    

  }).then(function (data) {

    var result = {
      command: command,
      raw: data
    };
    //return result;
    return extractResult(result);

  }).finally(function () {
    debug('finally');
    //connection.end();
  }).nodeify(callback);
};

module.exports = ZookeeperCommands;

var extractResult = function (result) {

  var extracterArray = [
  {
    re: /ruok/,
    run: function (resultp) {
      resultp.ok = resultp.raw === 'imok';

      return resultp;
    }
  }
  ];

  extracterArray.forEach(function (extracter) {
    var re = extracter.re;
    var str = result.command;
    var m;

    if ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      // View your result using the m-variable.
      // eg m[0] etc.
      return extracter.run(result);
    }
  });



  return result;
};
