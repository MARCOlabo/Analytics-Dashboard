import axios from "axios";

export const verifyUser = async (req, res, next) => {

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }
    const response = await axios.get(
      `${process.env.AUTH_SERVICE_URL}/api/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    req.user = response.data;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};