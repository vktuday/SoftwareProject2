const jwt = require("jsonwebtoken");

// Middleware to protect routes using JWT authentication
function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    // Ensure proper Bearer format
    if (type !== "Bearer" || !token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: "JWT_SECRET missing on server" });
    }

    // Verify token
    const payload = jwt.verify(token, secret);

     // Attach user ID to request
    req.userId = payload.sub;
    
    return next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = { requireAuth };