const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log("the url is " + req.url);
    if ((req.url == '/login' && req.method == 'POST') || (req.url == '/signup' && req.method == 'POST')) { next() }
    else {
        let token = req.headers.jwt;
        if (!token) {
            return res.status(403).send({
                message: "No token provided!"
            });
        }
        jwt.verify(token, 'ChallengeTeamSecret', (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
            req.userId = decoded.id;
            next();
        });
    }

};

module.exports = verifyToken