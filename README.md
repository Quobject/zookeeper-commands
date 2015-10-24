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

conf

```js

zookeeperCommands.command('conf').then(function (data) {
  console.log('data = ', data); 
});

//data = {
//  command: 'conf',
//  raw: 'clientPort=2181\ndataDir=/tmp/zookeeper/data/version-2\ndataLogDir=/tmp/zookeeper/log/version-2\ntickTime=2000\nmaxClientCnxns=60\nminSessionTimeout=4000\nmaxSessionTimeout=40000\nserverId=1\ninitLimit=10\nsyncLimit=5\nelectionAlg=3\nelectionPort=2223\nquorumPort=2222\npeerType=0\n',
//  lines:
//   ['clientPort=2181',
//     'dataDir=/tmp/zookeeper/data/version-2',
//     'dataLogDir=/tmp/zookeeper/log/version-2',
//     'tickTime=2000',
//     'maxClientCnxns=60',
//     'minSessionTimeout=4000',
//     'maxSessionTimeout=40000',
//     'serverId=1',
//     'initLimit=10',
//     'syncLimit=5',
//     'electionAlg=3',
//     'electionPort=2223',
//     'quorumPort=2222',
//     'peerType=0',
//     ''],
//  json:
//   {
//     clientPort: '2181',
//     dataDir: '/tmp/zookeeper/data/version-2',
//     dataLogDir: '/tmp/zookeeper/log/version-2',
//     tickTime: '2000',
//     maxClientCnxns: '60',
//     minSessionTimeout: '4000',
//     maxSessionTimeout: '40000',
//     serverId: '1',
//     initLimit: '10',
//     syncLimit: '5',
//     electionAlg: '3',
//     electionPort: '2223',
//     quorumPort: '2222',
//     peerType: '0'
//   }
//}

```

cons

```js

zookeeperCommands.command('cons').then(function (data) {
  console.log('data = ', data); 
});

//data = {
//  command: 'cons',
//  raw: ' /203.219.47.249:55318[0](queued=0,recved=1,sent=0)\n\n',
//  lines: [' /203.219.47.249:55318[0](queued=0,recved=1,sent=0)', '', ''],
//  json:
//   {
//     clients:
//      [{
//        ip: '203.219.47.249',
//        port: '55318[0]',
//        queued: '0',
//        received: '1',
//        sent: '0'
//      }],
//     latency: {}
//   }
//}

```
crst

```js

zookeeperCommands.command('crst').then(function (data) {
  console.log('data = ', data); 
});

//data = { command: 'crst', raw: 'Connection stats reset.\n' }

```
dump

```js

zookeeperCommands.command('dump').then(function (data) {
  console.log('data = ', data); 
});

//data = {
//  command: 'dump',
//  raw: 'SessionTracker dump:\nSession Sets (4):\n0 expire at Sat Oct 24 05:56:22 UTC 2015:\n0 expire at Sat Oct 24 05:56:24 UTC 2015:\n0 expire at Sat Oct 24 05:56:28 UTC 2015:\n2 expire at Sat Oct 24 05:56:30 UTC 2015:\n\t0x150982bb5b90001\n\t0x150982bb5b90000\nephemeral nodes dump:\nSessions with Ephemerals (2):\n0x150982bb5b90001:\n\t/node3\n0x150982bb5b90000:\n\t/node1\n\t/node2\n',
//  lines:
//   ['SessionTracker dump:',
//     'Session Sets (4):',
//     '0 expire at Sat Oct 24 05:56:22 UTC 2015:',
//     '0 expire at Sat Oct 24 05:56:24 UTC 2015:',
//     '0 expire at Sat Oct 24 05:56:28 UTC 2015:',
//     '2 expire at Sat Oct 24 05:56:30 UTC 2015:',
//     '\t0x150982bb5b90001',
//     '\t0x150982bb5b90000',
//     'ephemeral nodes dump:',
//     'Sessions with Ephemerals (2):',
//     '0x150982bb5b90001:',
//     '\t/node3',
//     '0x150982bb5b90000:',
//     '\t/node1',
//     '\t/node2',
//     '']
//}

```
envi

```js

zookeeperCommands.command('envi').then(function (data) {
  console.log('data = ', data); 
});

//data = {
//  command: 'envi',
//  raw: 'Environment:\nzookeeper.version=3.4.6-1569965, built on 02/20/2014 09:09 GMT\nhost.name=0c18fd6765c0\njava.version=1.7.0_79\njava.vendor=Oracle Corporation\njava.home=/usr/lib/jvm/java-7-openjdk-amd64/jre\njava.class.path=/opt/zookeeper/bin/../build/classes:/opt/zookeeper/bin/../build/lib/*.jar:/opt/zookeeper/bin/../lib/slf4j-log4j12-1.6.1.jar:/opt/zookeeper/bin/../lib/slf4j-api-1.6.1.jar:/opt/zookeeper/bin/../lib/netty-3.7.0.Final.jar:/opt/zookeeper/bin/../lib/log4j-1.2.16.jar:/opt/zookeeper/bin/../lib/jline-0.9.94.jar:/opt/zookeeper/bin/../zookeeper-3.4.6.jar:/opt/zookeeper/bin/../src/java/lib/*.jar:/opt/zookeeper/bin/../conf:\njava.library.path=/usr/java/packages/lib/amd64:/usr/lib/x86_64-linux-gnu/jni:/lib/x86_64-linux-gnu:/usr/lib/x86_64-linux-gnu:/usr/lib/jni:/lib:/usr/lib\njava.io.tmpdir=/tmp\njava.compiler=<NA>\nos.name=Linux\nos.arch=amd64\nos.version=3.13.0-53-generic\nuser.name=root\nuser.home=/root\nuser.dir=/\n',
//  lines:
//   ['Environment:',
//     'zookeeper.version=3.4.6-1569965, built on 02/20/2014 09:09 GMT',
//     'host.name=0c18fd6765c0',
//     'java.version=1.7.0_79',
//     'java.vendor=Oracle Corporation',
//     'java.home=/usr/lib/jvm/java-7-openjdk-amd64/jre',
//     'java.class.path=/opt/zookeeper/bin/../build/classes:/opt/zookeeper/bin/../build/lib/*.jar:/opt/zookeeper/bin/../lib/slf4j-log4j12-1.6.1.jar:/opt/zookeeper/bin/../lib/slf4j-api-1.6.1.jar:/opt/zookeeper/bin/../lib/netty-3.7.0.Final.jar:/opt/zookeeper/bin/../lib/log4j-1.2.16.jar:/opt/zookeeper/bin/../lib/jline-0.9.94.jar:/opt/zookeeper/bin/../zookeeper-3.4.6.jar:/opt/zookeeper/bin/../src/java/lib/*.jar:/opt/zookeeper/bin/../conf:',
//     'java.library.path=/usr/java/packages/lib/amd64:/usr/lib/x86_64-linux-gnu/jni:/lib/x86_64-linux-gnu:/usr/lib/x86_64-linux-gnu:/usr/lib/jni:/lib:/usr/lib',
//     'java.io.tmpdir=/tmp',
//     'java.compiler=<NA>',
//     'os.name=Linux',
//     'os.arch=amd64',
//     'os.version=3.13.0-53-generic',
//     'user.name=root',
//     'user.home=/root',
//     'user.dir=/',
//     ''],
//  json:
//   {
//     'Environment:': undefined,
//     'zookeeper.version': '3.4.6-1569965, built on 02/20/2014 09:09 GMT',
//     'host.name': '0c18fd6765c0',
//     'java.version': '1.7.0_79',
//     'java.vendor': 'Oracle Corporation',
//     'java.home': '/usr/lib/jvm/java-7-openjdk-amd64/jre',
//     'java.class.path': '/opt/zookeeper/bin/../build/classes:/opt/zookeeper/bin/../build/lib/*.jar:/opt/zookeeper/bin/../lib/slf4j-log4j12-1.6.1.jar:/opt/zookeeper/bin/../lib/slf4j-api-1.6.1.jar:/opt/zookeeper/bin/../lib/netty-3.7.0.Final.jar:/opt/zookeeper/bin/../lib/log4j-1.2.16.jar:/opt/zookeeper/bin/../lib/jline-0.9.94.jar:/opt/zookeeper/bin/../zookeeper-3.4.6.jar:/opt/zookeeper/bin/../src/java/lib/*.jar:/opt/zookeeper/bin/../conf:',
//     'java.library.path': '/usr/java/packages/lib/amd64:/usr/lib/x86_64-linux-gnu/jni:/lib/x86_64-linux-gnu:/usr/lib/x86_64-linux-gnu:/usr/lib/jni:/lib:/usr/lib',
//     'java.io.tmpdir': '/tmp',
//     'java.compiler': '<NA>',
//     'os.name': 'Linux',
//     'os.arch': 'amd64',
//     'os.version': '3.13.0-53-generic',
//     'user.name': 'root',
//     'user.home': '/root',
//     'user.dir': '/'
//   }
//}

```
srst

```js

zookeeperCommands.command('srst').then(function (data) {
  console.log('data = ', data); 
});

data =  { command: 'srst', raw: 'Server stats reset.\n' }

```
srvr

```js

zookeeperCommands.command('srvr').then(function (data) {
  console.log('data = ', data); 
});

//data = {
//  command: 'srvr',
//  raw: 'Zookeeper version: 3.4.6-1569965, built on 02/20/2014 09:09 GMT\nLatency min/avg/max: 0/0/0\nReceived: 4\nSent: 4\nConnections: 1\nOutstanding: 0\nZxid: 0x10000000b\nMode: leader\nNode count: 7\n',
//  lines:
//   ['Zookeeper version: 3.4.6-1569965, built on 02/20/2014 09:09 GMT',
//     'Latency min/avg/max: 0/0/0',
//     'Received: 4',
//     'Sent: 4',
//     'Connections: 1',
//     'Outstanding: 0',
//     'Zxid: 0x10000000b',
//     'Mode: leader',
//     'Node count: 7',
//     ''],
//  json:
//   {
//     zookeeperVersion: '3.4.6-1569965, built on 02/20/2014 09',
//     latencyMinAvgMax: '0/0/0',
//     received: '4',
//     sent: '4',
//     connections: '1',
//     outstanding: '0',
//     zxid: '0x10000000b',
//     mode: 'leader',
//     nodeCount: '7'
//   }
//}

```
wchs

```js

zookeeperCommands.command('wchs').then(function (data) {
  console.log('data = ', data); 
});

//data = {
//  command: 'wchs',
//  raw: '0 connections watching 0 paths\nTotal watches:0\n',
//  lines: ['0 connections watching 0 paths', 'Total watches:0', ''],
//  json: { totalWatches: '0' }
//}

```
wchc

```js

zookeeperCommands.command('wchc').then(function (data) {
  console.log('data = ', data); 
});

//data =  { command: 'wchc', raw: '\n' }

```
wchp

```js

zookeeperCommands.command('wchp').then(function (data) {
  console.log('data = ', data); 
});

//data =  { command: 'wchp', raw: '\n' }

```
mntr

```js

zookeeperCommands.command('mntr').then(function (data) {
  console.log('data = ', data); 
});

//data =  { command: 'mntr',                                                                                                     
//  raw: 'zk_version\t3.4.6-1569965, built on 02/20/2014 09:09 GMT\nzk_avg_latency\t0\nzk_max_latency\t0\nzk_min_latency\t0\nzk_packets_received\t13\nzk_packets_sent\t13\nzk_num_alive_connections\t1\nzk_outstanding_requests\t0\nzk_server_state\tleader\nzk_znode_count\t7\nzk_watch_count\t0\nzk_ephemerals_count\t3\nzk_approximate_data_size\t60\nzk_open_file_descriptor_count\t35\nzk_max_file_descriptor_count\t1048576\nzk_followers\t2\nzk_synced_followers\t2\nzk_pending_syncs\t0\n',                           
//lines:                                                                                                                       
//[ 'zk_version\t3.4.6-1569965, built on 02/20/2014 09:09 GMT',                                                               
//  'zk_avg_latency\t0',                                                                                                      
//  'zk_max_latency\t0',                                                                                                      
//  'zk_min_latency\t0',                                                                                                      
//  'zk_packets_received\t13',                                                                                                
//  'zk_packets_sent\t13',                                                                                                    
//  'zk_num_alive_connections\t1',                                                                                            
//  'zk_outstanding_requests\t0',                                                                                             
//  'zk_server_state\tleader',                                                                                                
//  'zk_znode_count\t7',                                                                                                      
//  'zk_watch_count\t0',                                                                                                      
//  'zk_ephemerals_count\t3',                                                                                                 
//  'zk_approximate_data_size\t60',                                                                                           
//  'zk_open_file_descriptor_count\t35',                                                                                      
//  'zk_max_file_descriptor_count\t1048576',                                                                                  
//  'zk_followers\t2',                                                                                                        
//  'zk_synced_followers\t2',                                                                                                 
//  'zk_pending_syncs\t0',                                                                                                    
//  '' ],                                                                                                                     
//json:                                                                                                                        
//{ zkVersion: '3.4.6-1569965, built on 02/20/2014 09:09 GMT',                                                                
//  zkAvgLatency: '0',                                                                                                        
//  zkMaxLatency: '0',                                                                                                        
//  zkMinLatency: '0',                                                                                                        
//  zkPacketsReceived: '13',                                                                                                  
//  zkPacketsSent: '13',                                                                                                      
//  zkNumAliveConnections: '1',                                                                                               
//  zkOutstandingRequests: '0',                                                                                               
//  zkServerState: 'leader',                                                                                                  
//  zkZnodeCount: '7',                                                                                                        
//  zkWatchCount: '0',                                                                                                        
//  zkEphemeralsCount: '3',                                                                                                   
//  zkApproximateDataSize: '60',                                                                                              
//  zkOpenFileDescriptorCount: '35',                                                                                          
//  zkMaxFileDescriptorCount: '1048576',                                                                                      
//  zkFollowers: '2',                                                                                                         
//  zkSyncedFollowers: '2',                                                                                                   
//  zkPendingSyncs: '0' } }               

```
