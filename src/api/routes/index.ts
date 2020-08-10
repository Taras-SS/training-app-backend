import { Router } from "express";

const router = Router();
import { addGoods, getAllGoods } from "../controllers/goods-controller";
import { uploadImage } from "../controllers/aws-controller";
import { SignUp, SignIn } from "../controllers/auth-controller";
import {
  addCategory,
  getCategories,
  removeCategory,
} from "../controllers/category-controller";

router.route("/signUp").post(SignUp);

router.route("/signIn").post(SignIn);

router.route("/goods").post(addGoods).get(getAllGoods);

router.route("/uploadPhoto").post(uploadImage);

router
  .route("/category")
  .post(addCategory)
  .get(getCategories);

router.route("/category/:id").delete(removeCategory);

export default router;
