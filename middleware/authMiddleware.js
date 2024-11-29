import verifyToken from "../utils/jwtUtils.js";

const protectRoute = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];
  
  // If no token is provided, return a 401 Unauthorized status
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token using the utility function
    const decoded = verifyToken(token);
    
    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If the token is invalid, return a 401 Unauthorized status
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default protectRoute;
