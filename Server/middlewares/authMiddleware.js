const jwt = require("jsonwebtoken");

/**
 * Middleware to validate JWT tokens.
 * It checks the 'Authorization' header for a Bearer token.
 */
const authorization = (req, res, next) => {
    // 1. Get the token from the header
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    try {
        // 2. Extract the token correctly
        // Supports both "Bearer <token>" and just "<token>"
        const token = authHeader.startsWith("Bearer ") 
            ? authHeader.split(" ")[1] 
            : authHeader;

        // 3. Verify the token
        // Ensure 'jwt_secret_key' matches your .env file exactly
        const verified = jwt.verify(token, process.env.jwt_secret_key);
        
        // 4. Attach the user payload to the request object
        req.user = verified;
        
        // 5. Move to the next middleware/controller
        next();
    } catch (err) {
        res.status(400).json({
            message: "Invalid or expired token"
        });
    }
};

// Exporting as an object to match your current import style
module.exports = { authorization };