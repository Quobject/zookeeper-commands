# zookeeper-commands
A node.js client to run [ZooKeeper Commands](https://zookeeper.apache.org/doc/r3.4.6/zookeeperAdmin.html#sc_zkCommands) the four letter words.

[![NPM](https://nodei.co/npm/zookeeper-commands.png?downloads=true&downloadRank=true)](https://nodei.co/npm/zookeeper-commands/)
[![NPM](https://nodei.co/npm-dl/zookeeper-commands.png?months=6&height=3)](https://nodei.co/npm/zookeeper-commands/)

## Installation

   
    npm install zookeeper-commands
    
Then:

```js
var ZookeeperCommands = require('zookeeper-commands');
```

## Usage

With promise

```js

var zookeeperCommands = new ZookeeperCommands({
  host: '127.0.0.1',
  port: 2181,
  timeout_ms: 1000
});

zookeeperCommands.command('ruok').then(function (data) {
  console.log('data = ', data); 
});

//data =  { command: 'ruok', raw: 'imok', ok: true }

```

With callback:

```js

zookeeperCommands.command( 'ruok', function (err, data) {
  console.log('data = ', data);
});

```

stat

```js

zookeeperCommands.command('stat').then(function (data) {
  console.log('data = ', data); 
});

//data =  { command: 'stat', 
//  raw: 'Zookeeper version: 3.4.6-1569965, built on 02/20/2014 09:09 GMT\nClients:\n /203.219.47.249:46775[0](queued=0,recved=1,
//sent=0)\n /203.219.47.249:15285[1](queued=0,recved=5969,sent=5969)\n\nLatency min/avg/max: 0/0/20\nReceived: 6040\nSent: 6039\n
//Connections: 2\nOutstanding: 0\nZxid: 0x100000001\nMode: follower\nNode count: 4\n',   
//lines:    
//[ 'Zookeeper version: 3.4.6-1569965, built on 02/20/2014 09:09 GMT', 
//  'Clients:', 
//  ' /203.219.47.249:46775[0](queued=0,recved=1,sent=0)',   
//  ' /203.219.47.249:15285[1](queued=0,recved=5969,sent=5969)',  
//  '',    
//  'Latency min/avg/max: 0/0/20',  
//  'Received: 6040',
//  'Sent: 6039',    
//  'Connections: 2',
//  'Outstanding: 0',
//  'Zxid: 0x100000001',  
//  'Mode: follower',
//  'Node count: 4', 
//  '' ],  
//json:
//{ clients:    
//    [ { ip: '203.219.47.249', 
// port: '46775[0]',
// queued: '0',
// received: '1',   
// sent: '0' },
// { ip: '203.219.47.249', 
//   port: '15285[1]',
//   queued: '0',
//   received: '5969',
//   sent: '5969' } ],
//  latency: { minimum: '0', average: '0', maximum: '20' },  
//  zookeeperVersion: '3.4.6-1569965',   
//  buildDate: '02/20/2014 09:09 GMT',   
//  reveiced: '6040',
//  sent: '6039',    
//  connections: '2',
//  outstanding: '0',
//  zxid: '0x100000001',  
//  mode: 'follower',
//  nodeCount: '4' } }   

```