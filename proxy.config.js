const proxy = [
  {
    context: ['/auth', '/api'],
    target: 'http://localhost:5000'
  }
];
module.exports = proxy;
