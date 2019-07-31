const zookeeper = require('node-zookeeper-client');

export function create (zookeeper_connect_string, zk_node_path, zk_node_data, create_mode) {

  if (!create_mode) {
    create_mode = zookeeper.CreateMode.PERSISTENT;
  }

  return new Promise(function (resolve, reject) {
    const client = zookeeper.createClient(zookeeper_connect_string);

    client.once('connected', function () {
      //console.log('Connected to the server.');

      client.create(zk_node_path, new Buffer(zk_node_data), create_mode, function (error) {
        client.close();
        if (error) {
          //console.log('Failed to create node: %s due to: %s.', zk_node_path, error);
          reject(error);
        } else {
          //console.log('Node: %s is successfully created.', zk_node_path);
          resolve(zk_node_path);
        }
      });
    });
    client.connect();
  });
}

export function mkdirp (zookeeper_connect_string: string, zk_node_path: string, zk_node_data?: string, create_mode?: number ) {
  //console.log('mkdirp started');

  if (!create_mode) {
    //https://github.com/alexguan/node-zookeeper-client/blob/master/lib/CreateMode.js
    create_mode = zookeeper.CreateMode.PERSISTENT;
  }

  const data = zk_node_data ? new Buffer(zk_node_data) : null;

  return new Promise(function (resolve, reject) {
    const client = zookeeper.createClient(zookeeper_connect_string);

    client.once('connected', function () {
      //console.log('Connected to the server.');

      client.mkdirp(zk_node_path, data, create_mode, function (error, path) {
        client.close();
        if (error) {
          //console.log('Failed to create node: %s due to: %s.', zk_node_path, error);
          reject(error);
        } else {
          //console.log('Node: %s is successfully created.', path);
          resolve(zk_node_path);
        }
      });
    });
    client.connect();
  });
}



export function exists (zookeeper_connect_string, zk_node_path) {

  return new Promise(function (resolve, reject) {
    const client = zookeeper.createClient(zookeeper_connect_string);

    client.once('connected', function () {
      //console.log('Connected to the server.');

      client.exists(zk_node_path, function (error, stat) {
        client.close();
        if (error) {
          //console.log('Failed exists node: %s due to: %s.', zk_node_path, error);
          reject(error);
        } else {
          if (stat) {
            //console.log('Node exists.', zk_node_path);
            resolve(true);
          } else {
            //console.log('Node does not exist.', zk_node_path);
            resolve(false);
          }
        }
      });
    });
    client.connect();
  });
}

export function getData (zookeeper_connect_string, zk_node_path) {

  return new Promise(function (resolve, reject) {
    const client = zookeeper.createClient(zookeeper_connect_string);

    client.once('connected', function () {
      //console.log('Connected to the server.');

      client.getData(zk_node_path, function (error, data, stat) {
        client.close();
        if (error) {
          //console.log('Failed getData node: %s due to: %s.', zk_node_path, error);
          reject(error);
          return;
        }
        const result = data.toString('utf8');
        //console.log('Got data: ', result);
        resolve(result);


      });
    });
    client.connect();
  });
}


export function setData (zookeeper_connect_string: string, zk_node_path: string, zk_node_data: string) {

  const data = zk_node_data ? new Buffer(zk_node_data) : null;

  return new Promise(function (resolve, reject) {
    const client = zookeeper.createClient(zookeeper_connect_string);

    client.once('connected', function () {
      //console.log('Connected to the server.');

      client.setData(zk_node_path, data, function (error, stat) {
        client.close();
        if (error) {
          console.log('Failed setData node: %s due to: %s.', zk_node_path, error);
          reject(error);
          return;
        }
        //const result = data.toString('utf8');
        console.log('Data is set');
        resolve(true);
      });
    });
    client.connect();
  });
}


export function remove (zookeeper_connect_string, zk_node_path) {

  return new Promise(function (resolve, reject) {
    const client = zookeeper.createClient(zookeeper_connect_string);

    client.once('connected', function () {
      //console.log('Connected to the server.');

      client.remove(zk_node_path, function (error) {
        client.close();
        if (error) {
          //console.log('Failed remove node: %s due to: %s.', zk_node_path, error);
          reject(error);
          return;
        }
        //console.log('Node is deleted');
        resolve(true);
      });
    });
    client.connect();
  });
}
