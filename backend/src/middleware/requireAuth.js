const jwt = require("jsonwebtoken");


function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    
    if (type !== "Bearer" || !token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: "JWT_SECRET missing on server" });
    }

    
    const payload = jwt.verify(token, secret);

     
    req.userId = payload.id;
    
    return next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = { requireAuth };