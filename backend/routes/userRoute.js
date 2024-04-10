import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  loginUser,
  logout,
  registerUser,
  resetPassword,
  updateProfile,
  updateUserPassword,
  updateUserRole,
} from "../controller/userController.js";
import { isAuthenticatedUser, authenticatedRoles } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.post("/password/forgot", forgotPassword);
router.patch("/password/reset/:token", resetPassword);
router.get("/me", isAuthenticatedUser, getUserDetails);
router.patch("/password/update", isAuthenticatedUser, updateUserPassword);
router.patch("/me/update", isAuthenticatedUser, updateProfile);
router.get(
  "/admin/users",
  isAuthenticatedUser,
  authenticatedRoles("admin"),
  getAllUsers
);
router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authenticatedRoles("admin"),
  getSingleUser
);
router.patch(
  "/admin/user/:id",
  isAuthenticatedUser,
  authenticatedRoles("admin"),
  updateUserRole
);
router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authenticatedRoles("admin"),
  deleteUser
);


export default router;
