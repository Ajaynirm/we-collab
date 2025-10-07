import { Router } from "express";
import passport from "passport";
import { register, login } from "../controller/auth.controller.js";
import { authenticateJWT } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and authorization
 */

// Local auth


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with name, email, and password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: mySecurePassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
router.post("/register", register);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login an existing user
 *     description: Authenticates user credentials and returns a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: mySecurePassword123
 *     responses:
 *       200:
 *         description: Successful login with JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       403:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login", login);
//, passport.authenticate("local", { session: false }) 
// Protected route example
router.get("/profile", authenticateJWT, (req, res) => {
  res.json({ message: `Hello ${req.user.id}` });
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`/dashboard?token=${token}`);
  }
);


export default router;
