const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    
    if(!authHeader) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }

    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;

    try {
        //Decode the token and verify if is still is valid (has not expired)
        decodedToken = jwt.verify(token,process.env.JWT_PRIVATE_KEY);  //decode with the private key set in the controller
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    if(!decodedToken) { 
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
};