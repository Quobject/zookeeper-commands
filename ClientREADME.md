# zookeeper-commands (Client)

## Installation

   
    npm install zookeeper-commands
    
Then:

```js
var zookeeperCommands = require('zookeeper-commands');
```

## Usage

Every function call returns a promise. The promises are using [node-zookeeper-client](https://github.com/alexguan/node-zookeeper-client) to connect to zookeeper server.

mkdirp

```js

zookeeperCommands.mkdirp(zookeeper_connect_string, zk_node_path).then(function () {
  return zookeeperCommands.setData(zookeeper_connect_string, zk_node_path, 'initiated');
});

zookeeperCommands.create(zookeeper_connect_string, zk_node_path, zk_node_data);
zookeeperCommands.exists(zookeeper_connect_string, zk_node_path);
zookeeperCommands.getData(zookeeper_connect_string, zk_node_path);
zookeeperCommands.setData(zookeeper_connect_string, zk_node_path, zk_node_data);
zookeeperCommands.mkdirp(zookeeper_connect_string, zk_node_path, null);
zookeeperCommands.remove(zookeeper_connect_string, zk_node_path);

```


* Typescript

```js
import { mkdirp, setData } from 'zookeeper-commands';

mkdirp('localhost:2181', '/test').then(function () {
  return setData('localhost:2181', '/test', 'initiated');
});

```
