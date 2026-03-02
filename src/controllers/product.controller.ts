import { NextFunction, Request, Response } from "express";
import {
    addMoreImage, addProduct, deleteImageByProductId, deleteMultipleImage, deleteProductById, getAllMultipleImage, getAllProducts, getMultipleImage, getProductByCategory, getProductByCode,
    getProductByFeature, getProductById, updateProductById
} from "../models/product.model";


export const addNewProduct = (req: Request, res: Response, next: NextFunction) => {
    const { product_id, product_name, price, detail, image, category_id, product_code, amount_instock, feature } = req.body;
    try {
        getProductByCode(product_code as string, (err, result) => {
            if (err) throw err;
            if (result.length !== 0) {
                return res.status(400).json({
                    status: false,
                    message: 'This product already exist'
                })
            }
            // Convert base64 image to blob for mysql
            const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
            const bufferImage = Buffer.from(base64Data, 'base64');
            const current = new Date();
            const data = {
                id: product_id,
                product_name: product_name,
                price: price,
                detail: detail,
                image: bufferImage,
                category_id: category_id,
                product_code: product_code,
                amount_instock: amount_instock,
                feature: feature,
                created_at: current,
                updated_at: current
            }

            addProduct(data as any, (err, result) => {
                if (err) throw err;
                res.status(201).json({
                    status: true,
                    message: 'Product was inserted successfully',
                    result: data
                });
            })
        })
    } catch (error) {
        next(error)
    }
}

export const addProductImage = (req: Request, res: Response, next: NextFunction) => {
    const { product_id, product_image } = req.body;

    try {
        // Convert base64 image to blob for mysql
        const imageObject = JSON.parse(product_image);
        const values = imageObject.map((img: any) => {
           const base64Image = img.replace(/^data:image\/\w+;base64,/, "");
           const bufferImage = Buffer.from(base64Image, "base64");
           return [product_id, bufferImage];
        });
        addMoreImage(values, (err, result) => {
            if (err) throw err;
            res.status(201).json({
                status: true,
                message: 'You added successfully'
            })
        });

    } catch (error) {
        next(error);
    }
}

export const getMultipleProductImage = (req: Request, res: Response, next: NextFunction) => {
    const product_id = req.params.id
    try {
        getMultipleImage(product_id as string, (err, result) => {
            if (err) throw err;
            if (result.length !== 0) {
                return res.status(200).json({
                    status: true,
                    result: result
                });
            }
            res.status(200).json({
                status: true,
                message: "Data not found",
                result: result
            });
        });
    } catch (error) {
        next(error);
    }
}

export const getAllMultipleProductImage = (req: Request, res: Response, next: NextFunction) => {
    try {
        getAllMultipleImage((err, result) => {
            if (result.length !== 0) {
                return res.status(200).json({
                    status: true,
                    message: "Data fetch successfully",
                    result: result
                })
            }

            res.status(200).json({
                status: true,
                message: "Data not found",
                result: result
            })
        })
    } catch (error) {
        next(error);
    }
}

export const deleteMultipleProductImage = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        deleteMultipleImage(id as string, (err, result) => {
            if (err) throw err;
            res.status(200).json({
                status: true,
                message: 'Data has been deleted'
            });
        })
    } catch (error) {
        next(error);
    }
}

export const getProducts = (req: Request, res: Response, next: NextFunction) => {

    try {
        getAllProducts((err, result) => {
            if (err) throw err;
            if (result.length !== 0) {
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

export const getFeatureProduct = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    try {
        getProductByFeature(id as string, (err, result) => {
        
            if (err) throw err
            if (result.length == 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Data not found'
                });
            }
            
            res.status(200).json({
                status: true,
                message: 'Data fetch successfully',
                result: result
            });
        });
    } catch (error) {
        next(error);
    }
}

export const getCategoryProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        getProductByCategory(id as string, (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                return res.status(200).json({
                    status: true,
                    message: 'Data not found',
                    result: []
                })
            }
            res.status(200).json({
                status: true,
                message: 'Data has fetched successfully',
                result: result
            })
        })

    } catch (error) {
        next(error)
    }
}

export const getProduct = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        getProductById(id as string, (err, result) => {
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

export const updateProduct = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { product_name, price, detail, image, category_id, product_code, amount_instock, feature } = req.body;

    try {
        getProductById(id as string, (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Could not update this user'
                })
            }

            const product = result[0];
            // Convert base64 image to blob for mysql
            const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
            const bufferImage = Buffer.from(base64Data, 'base64');
            const current = new Date();

            const newData = {
                product_name: product_name,
                price: price,
                detail: detail,
                image: bufferImage,
                category_id: category_id,
                product_code: product_code,
                amount_instock: amount_instock,
                feature: feature,
                created_at: product.created_at,
                updated_at: current
            }

            updateProductById(id as string, newData, (err, result) => {
                if (err) throw err;
                res.status(201).json({
                    status: true,
                    message: 'Product has been updated',
                    result: newData
                })
            });
        })
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        getProductById(id as string, (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                return res.status(404).json({
                    status: true,
                    message: 'Product not found'
                });
            } else {
                getMultipleImage(id as string, (err, result) => {
                    if (err) throw err;
                    if (result.length !== 0) {
                        const imageId = result.map(item => item.id);
                        deleteImageByProductId(imageId, (err, res) => {
                            if (err) throw err
                        })
                    }
                });
                deleteProductById(id as string, (err, result) => {
                    if (err) throw err;
                    res.status(201).json({
                        status: true,
                        message: 'Product was deleted successfully'
                    })
                })
            }
        })
    } catch (error) {
        next(error)
    }
}