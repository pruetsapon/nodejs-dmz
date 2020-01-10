module.exports.register = (server, serviceLocator) => {
    const routes = serviceLocator.get('routes');
    routes.forEach(route => {
        route.methods.forEach(method => {
            switch(method) {
                case 'get':
                    server.route(route.path).get(
                        (req, res, next) =>
                            serviceLocator.get('requestController').requested(req, res, next)
                    );
                    break;
                case 'post':
                    server.route(route.path).post(
                        (req, res, next) =>
                            serviceLocator.get('requestController').requested(req, res, next)
                    );
                    break;
                case 'put':
                    server.route(route.path).put(
                        (req, res, next) =>
                            serviceLocator.get('requestController').requested(req, res, next)
                    );
                    break;
                case 'delete':
                    server.route(route.path).delete(
                        (req, res, next) =>
                            serviceLocator.get('requestController').requested(req, res, next)
                    );
                    break;
            }
        });
    });
};