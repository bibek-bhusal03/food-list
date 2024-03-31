import jsonwebtoken from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // Get the token from the request headers
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    console.log("Unauthorized: No authorization header provided");
    return res
      .status(401)
      .json({ message: "Unauthorized: No authorization header provided" });
  }

  const token = authorizationHeader.split(" ")[1];
  console.log("Token from Headers:", token);

  if (!token) {
    console.log("Unauthorized: No token provided");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Verify the token
  jsonwebtoken.verify(token, "your_secret_key", (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        // Token has expired
        console.log("Unauthorized: Token has expired");
        return res
          .status(401)
          .json({ message: "Unauthorized: Token has expired" });
      } else {
        // Token verification failed
        console.log("Unauthorized: Invalid token");
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
    }

    // Attach the decoded user information to the request object for further use
    req.user = decoded;

    // Continue with the next middleware or route handler
    next();
  });
};

export default verifyToken;
