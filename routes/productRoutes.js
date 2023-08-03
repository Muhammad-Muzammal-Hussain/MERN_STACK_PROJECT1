import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleWare.js'
import formidable from "express-formidable";
import { braintreePaymentController, braintreeeTokenController, createProductController, deleteProductController, getAllProductsController, getPhotoController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, relatedProductController, searchProductsController, updateProductController } from '../controllers/productController.js';

const router=express.Router()

router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController
)
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
  );
  //getAllProductsController
router.get("/get-product", getAllProductsController);
router.get("/get-product/:slug", getSingleProductController);
router.get("/product-photo/:pid", getPhotoController);
//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);
//filter product
router.post("/product-filters", productFilterController);
//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductsController);
//similar product
router.get("/related-product/:pid/:cid", relatedProductController);
//category wise product
router.get("/product-category/:slug", productCategoryController);
//payments routes
//token
router.get("/braintree/token", braintreeeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router