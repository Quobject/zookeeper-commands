/* tslint:disable:no-shadowed-variable */
/* tslint:disable:no-unused-variable */
import * as Promise from 'bluebird';
import test = require('blue-tape');
import * as path from 'path';
import * as util from 'util';
import { Zookeeper, Options, mkdirp, setData } from './index';



test('zookeeper-commands', t => {

  const connectionString = 'localhost:2181';
  const zk_node_path = '/test';
  const TIMEOUT_MS = 15000;

  t.test('mkdirp', t => {
    return Promise.resolve().then(function () {
      return mkdirp(connectionString, zk_node_path);
    }).then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
    });
  });

  t.test('setData', t => {
    return Promise.resolve().then(function () {
      return setData(connectionString, '/test', 'initiated2');
    }).then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
    });
  });
});

test('zookeeper-commands', t => {

  const HOST = 'localhost';
  const PORT = 2181;
  const TIMEOUT_MS = 15000;
  const options = new Options(
     /* host */ HOST,
     /* port */ PORT,
     /* timeout_ms */ TIMEOUT_MS
  );

  const zookeeper = new Zookeeper(options);

  t.test('ruok', t => {

    return zookeeper.command('ruok').then(function (data) {
      //console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
      t.ok(data.ok);
    });
  });

  t.test('stat', t => {

    return zookeeper.command('stat').then(function (data) {
      //console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
      t.ok(data.json);
    });
  });

  t.test('conf', t => {

    return zookeeper.command('conf').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
    });
  });

  t.test('cons', t => {

    return zookeeper.command('cons').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
    });
  });

  t.test('crst', t => {

    return zookeeper.command('crst').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
    });
  });

  t.test('dump', t => {

    return zookeeper.command('dump').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
    });
  });

  t.test('envi', t => {

    return zookeeper.command('envi').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
    });
  });

  t.test('srst', t => {

    return zookeeper.command('srst').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
    });
  });

  t.test('srvr', t => {

    return zookeeper.command('srvr').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
    });
  });

  t.test('wchs', t => {

    return zookeeper.command('wchs').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
    });
  });

  t.test('wchc', t => {

    return zookeeper.command('wchc').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
    });
  });

  t.test('wchp', t => {

    return zookeeper.command('wchp').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
    });
  });

  t.test('mntr', t => {

    return zookeeper.command('mntr').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
    });
  });
});
