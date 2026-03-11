import { NextFunction, Request, Response } from "express";
import { addCategory, deleteCategoryById, getAllCategories, getCategoryById, getCategoryByTitle, updateCategoryById } from "../models/category.model";

export const addNewCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { title, detail, image } = req.body;

    try {
        const categoryName = await getCategoryByTitle(title) as any;
        if (categoryName.length !== 0) {
            return res.status(400).json({
                status: false,
                message: 'This category already exist'
            });
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
        addCategory(data as any);
        res.status(201).json({
            status: true,
            message: 'Category was inserted successfully',
            result: data
        })

    } catch (error) {
        next(error)
    }
}
export const getCategories = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const result = await getAllCategories();
        res.status(200).json({
            status: true,
            message: 'Data has been fetch successfully',
            result: result
        })

    } catch (error) {
        next(error)
    }
}

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        const result: any = await getCategoryById(id as string);
        if (result.length !== 0) {
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
    } catch (error) {
        next(error);
    }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, detail, image } = req.body;

    try {
        const result: any = await getCategoryById(id as string);
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

        updateCategoryById(id as string, newData)
        res.status(201).json({
            status: true,
            message: 'Category has been updated',
            result: newData
        })
    } catch (error) {
        next(error)
    }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {

        const result: any = await getCategoryById(id as string);

        if (result.length == 0) {
            return res.status(404).json({
                status: true,
                message: 'Category not found'
            });
        } else {
            deleteCategoryById(id as string);
            res.status(201).json({
                status: true,
                message: 'Category was deleted successfully'
            })
        }
    } catch (error) {
        next(error)
    }
}