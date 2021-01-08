let routes = {};

function addRoute(method, url, callback) {
  method = method.toLowerCase();
  url = url.toLowerCase();
  routes[method] = routes[method] || {};
  routes[method][url] = callback;
}

function findRoute(method, url) {
  method = method.toLowerCase();
  url = url.toLowerCase();
  if (!routes[method] || !routes[method][url]) {
    return null;
  } else {
    return routes[method][url];
  }
}

module.exports = {
  addRoute,
  findRoute,
};
