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
var zookeeperCommands = new ZookeeperCommands({host:'localhost', port:'2181'});

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

