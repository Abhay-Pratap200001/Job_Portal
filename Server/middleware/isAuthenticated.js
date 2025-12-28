import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized  user",
        seccess: false,
      });
    }

    const decode = await jwt.verify(token, process.env.JWT_TOKEN);
    if (!decode) {
      res.status(401).json({
        message: "Inavlid token",
        success: true,
      });
    }
    req.id = decode.userId;  //putting user id inot req.id so user can access that in future to verify user is januan or not
    next();
  } catch (error) {}
};


export default isAuthenticated