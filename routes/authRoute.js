import express from 'express'
import { forgotPasswordController, getAllOrderController, getOrderController, loginController, orderStatusController, registerController, testController, updateProfileController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleWare.js';
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);
router.post("/login", loginController );
//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);
router.get('/test',requireSignIn,isAdmin,testController)
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });
  //update profile
router.put("/profile", requireSignIn, updateProfileController);
//orders
router.get("/orders", requireSignIn, getOrderController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrderController);
// order status update
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)
export default router;

