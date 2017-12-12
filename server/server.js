const Hapi  = require('hapi');
const conf = require('./conf/settings');
const routes = require('./routes');
const pug = require('pug');

const server = new Hapi.Server(conf.get('hapi:conf'));

server.connection({ port: 3000, routes: {cors: true}});

server.register(require('inert'), (err) => {
  if (err) {
    console.log('Fail to register inert');
    return;
  }
  server.route(routes);
});

server.register(require('vision'), (err) => {
  if (err) {
    debug('Failed to load vision');
  }
  
  server.views({
    engines: { pug },
    path: __dirname,
    compileOptions: { pretty: true },
    isCached: conf.get('NODE_ENV') !== 'development',
  });
});

server.start(() => {
  console.log('Server is running on ' + server.info.uri);
});