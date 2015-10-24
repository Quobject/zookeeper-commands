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

/*global describe, it, before */
var ZookeeperCommands = require('../lib/index.js');
var Promise = require("bluebird");
var path = require('path');
var should = require('chai').should();
var assert = require('chai').assert;
var util = require('util');
var debug = require('debug')('zookeeper-commands:test/index.js');
var HOST = '52.64.51.40';
var PORT = 2183;
var TIMEOUT_MS = 15000;


describe('ZookeeperCommands', function () {

  //it('should merge opts', function () {
  //  var zookeeperCommands = new ZookeeperCommands({ a: 'a' });
  //  //debug('ZookeeperCommands', zookeeperCommands);

  //  assert.isNotNull(zookeeperCommands);
  //  assert.equal(zookeeperCommands.a, 'a');
  //});

  //it('should allow only four letters', function (done) {
  //  this.timeout(1 * 60 * 1000);//1 minute

  //  var promises = [];

  //  [null, '', 'a', 'aaa', 'aaaaa'].forEach(function (item) {
  //    debug('command = ', item);
  //    var error;
  //    var zookeeperCommands = new ZookeeperCommands({
  //      host: HOST,
  //      port: PORT
  //    });
  //    var promise = zookeeperCommands.command(item).then(function (data) {
  //      console.log('data = ', util.inspect(data, { depth: 10 }));
  //      assert.isNotNull(data);
  //      done();
  //    }).catch(function (error2) {
  //      debug('error = ' + error2);
  //      error = error2;
  //    }).finally(function () {
  //      assert.equal(error, 'Each command must be composed of four letters https://zookeeper.apache.org/doc/r3.4.6/zookeeperAdmin.html#sc_zkCommands');
  //      debug('finally');
  //    });

  //    promises.push(promise);

  //  });

  //  Promise.all(promises).then(function () {
  //    done();
  //  });
  //});


  //it('callback', function (done) {
  //  this.timeout(1 * 60 * 1000);//1 minute

  //  var zookeeperCommands = new ZookeeperCommands({
  //    host: HOST,
  //    port: PORT       
  //  });

  //  zookeeperCommands.command('ruok', function (err, data) {
  //    console.log('err = ', err);
  //    console.log('data = ', data);
  //    done();
  //  });
  //});


  it('four letter words', function (done) {
    this.timeout(1 * 60 * 1000);//1 minute

    var testFunction = function (command, resultHandler) {
      var zookeeperCommands = new ZookeeperCommands({
        host: HOST,
        port: PORT,
        timeout_ms: TIMEOUT_MS
      });
      return zookeeperCommands.command(command).then(function (data) {
        //debug('data = ', util.inspect(data, { depth: 10 }));
        //console.log('data = ', util.inspect(data, { depth: 20 }));
        assert.isNotNull(data);
        resultHandler(data);
      });
    };

    var promises = [];

    var testArray = [
      //['ruok', function (data) {
      //  assert.isTrue(data.ok);
      //}],
      //['stat', function (data) {
      //  debug('stat data = ', data);
      //  assert.isNotNull(data);
      //  //(data.a).should.be.true;
      //  assert.isObject(data.json);
      //}],
      //['conf', function (data) {
      //  //debug('conf data = ', data);
      //  console.log('data = ', data);
      //  assert.isNotNull(data);
      //  //assert.isObject(data.json);
      //}],
      //['cons', function (data) {
      //  console.log('data = ', util.inspect(data, { depth: 20 }));
      //  assert.isNotNull(data);
      //  //assert.isObject(data.json);
      //}],
      //['crst', function (data) {
      //  debug('crst data = ', data);
      //  console.log('data = ', data);
      //  assert.isNotNull(data);
      //  //assert.isObject(data.json);
      //}],
      //['dump', function (data) {
      //  debug('dump data = ', data);
      //  console.log('data = ', data);
      //  assert.isNotNull(data);
      //  //assert.isObject(data.json);
      //}],
      //['envi', function (data) {
      //  //debug('envi data = ', data);
      //  console.log('data = ', data);
      //  assert.isNotNull(data);
      //  //assert.isObject(data.json);
      //}],
      //['srst', function (data) {
      //  //debug('srst data = ', data);
      //  console.log('data = ', data);
      //  assert.isNotNull(data);
      //  //assert.isObject(data.json);
      //}],
      //['srvr', function (data) {
      //  debug('srvr data = ', data);
      //  console.log('data = ', data);
      //  assert.isNotNull(data);
      //  //assert.isObject(data.json);
      //}],
      //['wchs', function (data) {
      //  debug('wchs data = ', data);
      //  console.log('data = ', data);
      //  assert.isNotNull(data);
      //  //assert.isObject(data.json);
      //}],
      //['wchc', function (data) {
      //  debug('wchc data = ', data);
      //  console.log('data = ', data);
      //  assert.isNotNull(data);
      //  //assert.isObject(data.json);
      //}],
      //['wchp', function (data) {
      //  debug('wchp data = ', data);
      //  console.log('data = ', data);
      //  assert.isNotNull(data);
      //  //assert.isObject(data.json);
      //}],
      ['mntr', function (data) {
        debug('mntr data = ', data);
        console.log('data = ', data);
        assert.isNotNull(data);
        //assert.isObject(data.json);
      }],

    ].forEach(function (test) {
      promises.push(testFunction(test[0], test[1]));
    });

    Promise.all(promises).then(function () {

    }).finally(function () {
      debug('finally');
      done();
    });

  });


});


