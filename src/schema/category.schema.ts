
import { object, string, date, InferType, number } from 'yup';

let categorySchema = object({
    id: number(),
    title: string().required(),
    detail: string().min(8).max(20).optional(),
    image: string().required(),
    created_at: date().default(() => new Date())
});

export type CategoryProps = InferType<typeof categorySchema>
export default categorySchema;