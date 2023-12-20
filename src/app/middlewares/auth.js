const jwt = require('jsonwebtoken');

const { SECRET } = require('~/config')

const auth = async (req, res, next) => {
        try {
                const authHeaders = req.headers.authorization;
                if (authHeaders) {
                        const token = authHeaders.split(' ')[1];

                        const decoded = jwt.verify(token, SECRET);
                        req.userId = decoded.id;
                        next();
                } else {
                        res.status(401).json({ message: 'Unauthorized User' });
                }
        }
        catch (error) {
                res.status(401).json({ message: 'Unauthorized User' });
        }
}
module.exports = auth;