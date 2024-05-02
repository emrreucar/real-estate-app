import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res) => {
  console.log(req.userId); // bu userId jwt.verify yaptığımız yerden geliyor
  res.status(200).json({ message: "You are Authenticated" });
};

export const shouldBeAdmin = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Not Authenticated!" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
      if (err) return res.status(403).json({ message: "Token is not Valid!" });

      if (!payload.isAdmin) {
        return res.status(403).json({ message: "Not authorized!" });
      }
    });

    res.status(200).json({ message: "You are Authenticated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
