import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
// import userModel from "../models/userModel.js";


export const createCategoryController=async(req,res)=>{
    try {
        const {name}=req.body
        if(!name){
            return res.status(401).send({
                message: "Message is required"
            })
        }
        const existingCategory=await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:false,
                message:"Category already Exists"
            })
        }
        const category=await new categoryModel({
            name,
            slug:slugify(name),
        }).save()
        res.status(201).send({
            success:true,
            message:"New category created",
            category,

        })
    } catch (error) {
        // //console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Creating category",
            error,
        })
    }
}
export const updateCategoryController=async(req,res)=>{
    try {
        const {name}=req.body
        const {id}=req.params
        const category=await categoryModel.findByIdAndUpdate(id,
            {name,slug:slugify(name)},
            {new:true}
            )
            res.status(200).send({
                success:true,
                message:"Category Updated Successfully",
                category
            })
    } catch (error) {
        // //console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Updating Category",
            error
        })
    }
}

export const allCategoryController=async(req,res)=>{
    try {
        const category=await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category,
          });
    } catch (error) {
        // //console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
    }
}
export const singleCategoryController=async(req,res)=>{
     try {
        const category=await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success: true,
            message: "Get SIngle Category SUccessfully",
            category,
          });
     } catch (error) {
        // //console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
     }
}
export const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)

        res.status(200).send({
            success: true,
            message: "Categry Deleted Successfully",
          });
        } catch (error) {
        //   //console.log(error);
          res.status(500).send({
            success: false,
            message: "error while deleting category",
            error,
          });
    }
}
