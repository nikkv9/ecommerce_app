import jwt from "jsonwebtoken";

const tokenGen = (id, admin) => {
  return jwt.sign({ id, admin }, process.env.JWT_KEY, {
    expiresIn: "3d",
  });
};

export default tokenGen;
