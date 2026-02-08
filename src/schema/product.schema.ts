
import { object, string, date, InferType, number } from 'yup';

let productSchema = object({
    id: string().uuid(),
    name: string().required(),
    price: number(),
    detail: string().min(8).max(20).optional(),
    image: string().required(),
    category_id: string().required(),
    product_code: string().optional(),
    amount_instock: number().optional(),
    feature: string().max(10).required(),
    created_at: date().default(() => new Date())
});

export type ProductProps = InferType<typeof productSchema>
export default productSchema;