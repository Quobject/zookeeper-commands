import * as _ from 'lodash';
import * as Promise from 'bluebird';
//import * as child_process from 'child_process';
import * as os from 'os';
import stat from './stat';
import * as qsutil from './qsutil';
//const exec = child_process.exec;
var Netcat = require('node-netcat');

export * from './client'


var extractResult = function (result) {

  var extracterArray = [
    {
      re: /ruok/,
      run: function (resultp) {
        resultp.ok = resultp.raw === 'imok';
        return resultp;
      }
    },
    //----------------------------------
    {
      re: /stat/,
      run: function (resultp) {
        resultp.lines = resultp.raw.split(os.EOL);
        resultp.json = {};
        stat(resultp.lines, resultp.json);
        return resultp;
      }
    },
    //----------------------------------
    {
      re: /conf/,
      run: function (resultp) {
        resultp.lines = resultp.raw.split(os.EOL);
        resultp.json = {};
        qsutil.array2json(resultp.lines, resultp.json);
        //conf(resultp.lines, resultp.json);
        return resultp;
      }
    },
    //----------------------------------
    {
      re: /cons/,
      run: function (resultp) {
        resultp.lines = resultp.raw.split(os.EOL);
        resultp.json = {};
        stat(resultp.lines, resultp.json);
        return resultp;
      },
    },
    ////----------------------------------
    //{
    //  re: /crst/,
    //  run: function (resultp) {
    //    resultp.lines = resultp.raw.split(os.EOL);
    //    resultp.json = {};
    //    crst(resultp.lines, resultp.json);
    //    return resultp;
    //  },
    //},
    //----------------------------------
    {
      re: /dump/,
      run: function (resultp) {
        resultp.lines = resultp.raw.split(os.EOL);
        return resultp;
      },
    },
    //----------------------------------
    {
      re: /envi/,
      run: function (resultp) {
        resultp.lines = resultp.raw.split(os.EOL);
        resultp.json = {};
        qsutil.array2json(resultp.lines, resultp.json);
        //envi(resultp.lines, resultp.json);
        return resultp;
      },
    },
    ////----------------------------------
    //{
    //  re: /srst/,
    //  run: function (resultp) {
    //    resultp.lines = resultp.raw.split(os.EOL);
    //    resultp.json = {};
    //    srst(resultp.lines, resultp.json);
    //    return resultp;
    //  },
    //},
    //----------------------------------
    {
      re: /srvr/,
      run: function (resultp) {
        resultp.lines = resultp.raw.split(os.EOL);
        resultp.json = {};
        qsutil.array2json2(resultp.lines, resultp.json);
        return resultp;
      },
    },
    //----------------------------------
    {
      re: /wchs/,
      run: function (resultp) {
        resultp.lines = resultp.raw.split(os.EOL);
        resultp.json = {};
        qsutil.array2json2(resultp.lines, resultp.json);
        return resultp;
      },
    },
    ////----------------------------------
    //{
    //  re: /wchc/,
    //  run: function (resultp) {
    //    resultp.lines = resultp.raw.split(os.EOL);
    //    resultp.json = {};
    //    wchc(resultp.lines, resultp.json);
    //    return resultp;
    //  },
    //},
    ////----------------------------------
    //{
    //  re: /wchp/,
    //  run: function (resultp) {
    //    resultp.lines = resultp.raw.split(os.EOL);
    //    resultp.json = {};
    //    wchp(resultp.lines, resultp.json);
    //    return resultp;
    //  },
    //},
    ////----------------------------------
    {
      re: /mntr/,
      run: function (resultp) {
        resultp.lines = resultp.raw.split(os.EOL);
        resultp.json = {};
        qsutil.array2json3(resultp.lines, resultp.json);
        return resultp;
      },
    }


  ];

  extracterArray.forEach(function (extracter) {
    var re = extracter.re;
    var str = result.command;
    var m;

    if ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      // View your result using the m-variable.
      // eg m[0] etc.
      return extracter.run(result);
    }
  });



  return result;
};

export class Zookeeper {

  constructor(private options: IOptions = new Options()) { }

  public command(command: string, callback?: (err, data) => void) {
    let zookeeper = this;

    return Promise.resolve().then(function () {
      //console.log('command = ', command);
      if (!command || command.length !== 4) {
        throw new Error(`Each command must be 
          composed of four letters https://zookeeper.apache.org/doc/r3.4.6/zookeeperAdmin.html#sc_zkCommands`);
      }

      //console.log('command =', command);
      //console.log('host =', self.host);
      //console.log('port =', self.port);
      //console.log('timeout_ms =', self.timeout_ms);

      var options = {
        timeout: zookeeper.options.timeout_ms ? zookeeper.options.timeout_ms : 60000,
        read_encoding: 'utf8'
      };

      return new Promise(function (resolve, reject) {

        //console.log('options =', options);
        var client = Netcat.client(zookeeper.options.port, zookeeper.options.host, options);

        client.on('open', function () {
          //console.log('on open');
          client.send(command);
        });

        client.on('data', function (data) {
          var response = data.toString('utf8');
          //console.log('response ', response);
          resolve(response);
        });

        client.on('error', function (err) {
          console.log(err);
          reject(err);
        });

        client.on('close', function () {
          //console.log('close');
        });

        client.start();
      });



    }).then(function (data) {

      var result = {
        command: command,
        raw: data
      };
      //return result;
      return extractResult(result);

    }).finally(function () {
      //console.log('finally');
      //connection.end();
    }).nodeify(callback);



  }
}


export interface IOptions {
  host: string;
  port: number;
  timeout_ms: number;
}

export class Options implements IOptions {
  public constructor(public host = 'localhost',
    public port = 2181,
    public timeout_ms = 1000) { }
}

