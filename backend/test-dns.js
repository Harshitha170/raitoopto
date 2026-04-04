const dns = require('dns');
const host = 'cluster0.uacfenr.mongodb.net';

dns.resolveSrv('_mongodb._tcp.' + host, (err, records) => {
  if (err) {
    console.error('SRV Resolution failed:', err);
  } else {
    console.log('SRV Records found:', records);
  }
});

dns.resolveTxt(host, (err, records) => {
    if (err) {
        console.error('TXT Resolution failed:', err);
    } else {
        console.log('TXT Records found:', records);
    }
});
