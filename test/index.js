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
var path = require('path');
var should = require('chai').should();
var assert = require('chai').assert;
var util = require('util');

var config = require('../my_config.json');


describe('ZookeeperCommands', function () {

  it('should merge opts', function () {
    var ZookeeperCommands = new ZookeeperCommands({ a: 'a' });
    assert.isNotNull(ZookeeperCommands);
    assert.equal(ZookeeperCommands.a, 'a');
  });

  it('???', function (done) {
    this.timeout(1 * 60 * 1000);//1 minute

    var ZookeeperCommands = new ZookeeperCommands({
      host: '',
      port: '2181'
    });

    assert.isNotNull(ZookeeperCommands);
    ZookeeperCommands.command('ruok').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      assert.isNotNull(data);
      done();
    });
  });



});


