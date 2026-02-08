import { NextFunction, Request, Response } from "express";
import { addCategory, deleteCategoryById, getAllCategories, getCategoryById, getCategoryByTitle, updateCategoryById } from "../models/category.model";

export const addNewCategory = (req: Request, res: Response, next: NextFunction) => {
    const {title, detail, image} = req.body;
    
    try {
        getCategoryByTitle(title as string, (err, result) => {
            if(err) throw err;
            if(result.length !== 0) {
                return res.status(400).json({
                    status: false,
                    message: 'This category already exist'
                })
            }
            
            // Convert base64 image to blob for mysql
            const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
            const bufferImage = Buffer.from(base64Data, 'base64');
            const current = new Date();

            const data = {
                title: title,
                detail: detail,
                image: bufferImage,
                created_at: current,
            }

            addCategory(data as any, (err, result) => {
                if(err) throw err;
                res.status(201).json({
                    status: true,
                    message: 'Category was inserted successfully',
                    result: data
                })
            })
        })
    } catch (error) {
        next(error)
    }
}
export const getCategories = (req: Request, res: Response, next: NextFunction) => {
    try {
        getAllCategories((err, result) => {
            if (err) throw err;
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: 'Data has been fetch successfully',
                    result: result
                })
            }
            res.status(404).json({
                status: false,
                message: 'Data do not found'
            });
        });
    } catch (error) {
        next(error)
    }
}

export const getCategory = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        getCategoryById(id as string, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: 'Data fetch successfully',
                    result: result[0]
                })
            }
            res.status(404).json({
                status: false,
                message: 'Data do not found'
            })
        })
    } catch (error) {
        next(error);
    }
}

export const updateCategory = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const {title, detail, image} = req.body;

    try {
        getCategoryById(id as string, (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Could not update this category'
                })
            }
            
            // Convert base64 image to blob for mysql
            const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
            const bufferImage = Buffer.from(base64Data, 'base64');

            const newData = {
                title: title,
                detail: detail,
                image: bufferImage
            }
            
            updateCategoryById(id as string, newData, (err, result) => {
                if(err) throw err;
             
                res.status(201).json({
                    status: true,
                    message: 'Category has been updated',
                    result: newData
                })
            });

        })
    } catch (error) {
        next(error)
    }
}

export const deleteCategory = (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    try {
         getCategoryById(id as string, (err, result) => {
            if(err) throw err;
            if(result.length == 0) {
                return res.status(404).json({
                    status: true,
                    message: 'Category not found'
                });
            }else{
                deleteCategoryById(id as string, (err) => {
                    if(err) throw err;
                    res.status(201).json({
                        status: true,
                        message: 'Category was deleted successfully'
                    })
                })
            }
         })  
    } catch (error) {
        next(error)
    }
}