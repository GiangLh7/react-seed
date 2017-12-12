module.exports = [
  {
    method: 'GET',
    path: '/{path*}',
    handler: homePageHandler
  },
  {
    method: 'GET',
    path: '/public/{path*}',
    handler: {
      directory: { path: `${__dirname}/public/` },
    },
  }
];

function homePageHandler(request, reply) {
  const attributes = {};
  reply.view('public/index', attributes);
}