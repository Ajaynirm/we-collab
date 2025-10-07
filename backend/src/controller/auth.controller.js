import bcrypt from "bcrypt";
import { openDb } from "../config/db.js";
import { generateToken } from "../middleware/auth.middleware.js";
import passport from "passport";

export const register = async (req, res) => {
  try {
    const db = await openDb();
    const { name, email, password } = req.body;

    const existing = await db.get(`SELECT email from users where email=?`, [
      email,
    ]);
    if (existing) return res.status(400).json({ message: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await db.run(
      `INSERT INTO USERS (name, email, password) values (?,?,?)`,
      [name, email, hashed]
    );
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error " });
  }
};

export const login = async (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
   
    if (err) return res.status(500).json({ message: "Internal error" });
    if (!user) return res.status(401).json({ message: info?.message || "Unauthorized" });
    

    const token = generateToken(user);
    return res.status(200).json({ message: "Login successful", token });
  })(req, res, next);
};




