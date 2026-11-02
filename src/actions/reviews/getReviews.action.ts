import { defineAction } from "astro:actions";
import content from "../../data/reviews/reviews.json";

export interface Review {
    id?: number;
    name: string;
    comment: string;
    rating: number;
    date: string;
}

export const getReviews = defineAction({
    handler: async (): Promise<{ message: string; data: Review[] }> => {
        const data = content.reviews as Review[];
        return { message: "Reviews retrieved successfully", data };
    }
});
