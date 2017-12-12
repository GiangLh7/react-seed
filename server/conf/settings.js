const nconf = require('nconf');

nconf.argv().env();

const env = nconf.get('NODE_ENV');
if (env && env !== 'development') {
  nconf.file('override', `src/server/conf/${env}.json`);
}

nconf.file('default', 'src/server/conf/development.json');

module.exports = nconf;
