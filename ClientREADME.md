# zookeeper-commands (Client)

## Installation

   
    npm install zookeeper-commands
    
Then:

```js
var ZookeeperCommands = require('zookeeper-commands');
var zookeeperClient = new ZookeeperCommands().client;
```

## Usage

Every function call returns a promise. The promises are using (node-zookeeper-client)[https://github.com/alexguan/node-zookeeper-client/] to connect to zookeeper server.

mkdirp

```js

zookeeperClient.mkdirp(zookeeper_connect_string, zk_node_path).then(function () {
  return zookeeperClient.setData(zookeeper_connect_string, zk_node_path, 'initiated2');
});


```


```js

zookeeperClient.create(zookeeper_connect_string, zk_node_path, zk_node_data);
zookeeperClient.exists(zookeeper_connect_string, zk_node_path);
zookeeperClient.getData(zookeeper_connect_string, zk_node_path);
zookeeperClient.setData(zookeeper_connect_string, zk_node_path, zk_node_data);
zookeeperClient.mkdirp(zookeeper_connect_string, zk_node_path, null);
zookeeperClient.remove(zookeeper_connect_string, zk_node_path);

```

