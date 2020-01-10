const getRequestIp = (req) => {
    const requestip = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress || 
    req.connection.socket.remoteAddress || req.ip;
    const requestips = requestip.split(':');
    return requestips[requestips.length-1];
}

module.exports = getRequestIp;