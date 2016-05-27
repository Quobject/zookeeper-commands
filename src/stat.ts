import * as _ from 'lodash';
import * as Promise from 'bluebird';

export default function (lines, object) {
  console.log('lines', lines);
  console.log('object', object);

  object.clients = [];
  object.latency = {};

  lines.forEach(function (line) {
    const regexArray = [
      {
        re: /Zookeeper version: (.*), built on (.*)/,
        run: function (mp) {
          //console.log('mp', mp);
          object.zookeeperVersion = mp[1];
          object.buildDate = mp[2];
        },
      },
      {
        re: / \/(.*):(.*)\(queued=(\d*),recved=(\d*),sent=(\d*)/,
        run: function (mp) {
          //console.log('mp', mp);

          object.clients.push({
            ip: mp[1],
            port: mp[2],
            queued: mp[3],
            received: mp[4],
            sent: mp[5]
          });
        },
      },
      {
        re: /Latency min\/avg\/max: (\d*)\/(\d*)\/(\d*)/,
        run: function (mp) {
          //console.log('mp', mp);

          object.latency.minimum = mp[1];
          object.latency.average = mp[2];
          object.latency.maximum = mp[3];
        },
      },
      {
        re: /Received: (\d*)/,
        run: function (mp) {
          object.reveiced = mp[1];
        },
      },
      {
        re: /Sent: (\d*)/,
        run: function (mp) {
          object.sent = mp[1];
        },
      },
      {
        re: /Connections: (\d*)/,
        run: function (mp) {
          object.connections = mp[1];
        },
      },
      {
        re: /Outstanding: (\d*)/,
        run: function (mp) {
          object.outstanding = mp[1];
        },
      },
      {
        re: /Zxid: (0x\d*)/,
        run: function (mp) {
          console.log('mp', mp);
          object.zxid = mp[1];
        },
      },
      {
        re: /Mode: (.*)/,
        run: function (mp) {
          console.log('mp', mp);
          object.mode = mp[1];
        },
      },
      {
        re: /Node count: (.*)/,
        run: function (mp) {
          console.log('mp', mp);
          object.nodeCount = mp[1];
        },
      },
    ];

    regexArray.forEach(function (extracter) {
      const re = extracter.re;
      const str = line;
      let m;

      if ((m = re.exec(str)) !== null) {
        if (m.index === re.lastIndex) {
          re.lastIndex++;
        }
        // View your result using the m-constiable.
        // eg m[0] etc.
        return extracter.run(m);
      }
    });

  });
};
