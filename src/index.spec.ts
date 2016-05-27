/* tslint:disable:no-shadowed-variable */
/* tslint:disable:no-unused-variable */
import test = require('blue-tape');
import * as path from 'path';
import * as util from 'util';
import { Zookeeper, Options } from './index';

const HOST = 'localhost';
const PORT = 2181;
const TIMEOUT_MS = 15000;


test('zookeeper-commands', t => {

  t.test('four letter words', t => {
    const options = new Options(
     /* host */ HOST, 
     /* port */ PORT,
     /* timeout_ms */ TIMEOUT_MS       
    );

    const zookeeper = new Zookeeper(options);

    return zookeeper.command('mntr').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
    });

  });


});
