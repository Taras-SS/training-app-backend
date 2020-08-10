import { Request, Response } from "express";
import { authenticate } from "passport";
import User from "../models/user-model";

export const SignUp = async (
  { body }: Request,
  res: Response
): Promise<Response | null> => {
  if (!body.email || !body.name || !body.password)
    return res
      .status(422)
      .json({ message: "Email, name and password are required" });
  try {
    const { email, name, password } = body;
    const userExist = await User.findOne({ email: email });
    if (userExist)
      return res
        .status(422)
        .json({ email: "User with this email is already exist" });
    const user = new User();
    user.email = email;
    user.name = name;
    user.surName = "";
    user.imageUrl = "";
    user.setPassword(password);
    const response = await user.save();
    return res.status(201).json({
      message: "user created",
      user,
    });
  } catch (e) {
    return res.status(500).json(e);
  }
  return null;
};

export const SignIn = (req: Request, res: Response) => {
  const { body } = req;
  if (!body.email || !body.password)
    res.status(422).json({ email: "Email and password are required" });
  authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json(err);
    if (user) {
      res.header("Access-Token", user.generateJwt());
      return res.status(200).json(user);
    }
    return res.status(422).json({ email: "Email or password is invalid" });
  })(req, res);
};
