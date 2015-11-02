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

'use strict';
var util = require('util');
var Promise = require("bluebird");
var zookeeper = require('node-zookeeper-client');

module.exports.create = function (zookeeper_connect_string, zk_node_path, zk_node_data, create_mode) {
  var debug = require('debug')('fleetmake-validate:zookeeperClient.js create');

  if (!create_mode) {
    create_mode = zookeeper.CreateMode.PERSISTENT;
  }

  return new Promise(function (resolve, reject) {
    var client = zookeeper.createClient(zookeeper_connect_string);

    client.once('connected', function () {
      debug('Connected to the server.');

      client.create(zk_node_path, new Buffer(zk_node_data), create_mode, function (error) {
        client.close();
        if (error) {
          debug('Failed to create node: %s due to: %s.', zk_node_path, error);
          reject(error);
        } else {
          debug('Node: %s is successfully created.', zk_node_path);
          resolve(zk_node_path);
        }
      });
    });
    client.connect();
  });
};


module.exports.mkdirp = function (zookeeper_connect_string, zk_node_path, zk_node_data, create_mode) {
  var debug = require('debug')('fleetmake-validate:zookeeperClient.js mkdirp');

  if (!create_mode) {
    create_mode = zookeeper.CreateMode.PERSISTENT;
  }

  var data = zk_node_data ? new Buffer(zk_node_data) : null;

  return new Promise(function (resolve, reject) {
    var client = zookeeper.createClient(zookeeper_connect_string);

    client.once('connected', function () {
      debug('Connected to the server.');

      client.mkdirp(zk_node_path, data, create_mode, function (error, path) {
        client.close();
        if (error) {
          debug('Failed to create node: %s due to: %s.', zk_node_path, error);
          reject(error);
        } else {
          debug('Node: %s is successfully created.', path);
          resolve(zk_node_path);
        }
      });
    });
    client.connect();
  });
};



module.exports.exists = function (zookeeper_connect_string, zk_node_path) {
  var debug = require('debug')('fleetmake-validate:zookeeperClient.js exists');

  return new Promise(function (resolve, reject) {
    var client = zookeeper.createClient(zookeeper_connect_string);

    client.once('connected', function () {
      debug('Connected to the server.');

      client.exists(zk_node_path, function (error, stat) {
        client.close();
        if (error) {
          debug('Failed exists node: %s due to: %s.', zk_node_path, error);
          reject(error);
        } else {
          if (stat) {
            debug('Node exists.', zk_node_path);
            resolve(true);
          } else {
            debug('Node does not exist.', zk_node_path);
            resolve(false);
          }
        }
      });
    });
    client.connect();
  });
};

module.exports.getData = function (zookeeper_connect_string, zk_node_path) {
  var debug = require('debug')('fleetmake-validate:zookeeperClient.js exists');

  return new Promise(function (resolve, reject) {
    var client = zookeeper.createClient(zookeeper_connect_string);

    client.once('connected', function () {
      debug('Connected to the server.');

      client.getData(zk_node_path, function (error, data, stat) {
        client.close();
        if (error) {
          debug('Failed getData node: %s due to: %s.', zk_node_path, error);
          reject(error);
          return;
        }
        var result = data.toString('utf8');
        debug('Got data: ', result);
        resolve(result);


      });
    });
    client.connect();
  });
};


module.exports.setData = function (zookeeper_connect_string, zk_node_path, zk_node_data) {
  var debug = require('debug')('fleetmake-validate:zookeeperClient.js setData');

  var data = zk_node_data ? new Buffer(zk_node_data) : null;

  return new Promise(function (resolve, reject) {
    var client = zookeeper.createClient(zookeeper_connect_string);

    client.once('connected', function () {
      debug('Connected to the server.');

      client.setData(zk_node_path, data, function (error, stat) {
        client.close();
        if (error) {
          debug('Failed setData node: %s due to: %s.', zk_node_path, error);
          reject(error);
          return;
        }
        var result = data.toString('utf8');
        debug('Data is set');
        resolve(true);
      });
    });
    client.connect();
  });
};


module.exports.remove = function (zookeeper_connect_string, zk_node_path) {
  var debug = require('debug')('fleetmake-validate:zookeeperClient.js remove');


  return new Promise(function (resolve, reject) {
    var client = zookeeper.createClient(zookeeper_connect_string);

    client.once('connected', function () {
      debug('Connected to the server.');

      client.remove(zk_node_path, function (error) {
        client.close();
        if (error) {
          debug('Failed remove node: %s due to: %s.', zk_node_path, error);
          reject(error);
          return;
        }
        debug('Node is deleted');
        resolve(true);
      });
    });
    client.connect();
  });
};