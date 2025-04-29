// define the Post type
export type Post = {
    id: number
    title: string
    body: string
    tags: string[]
    reactions: {
        likes: number
        dislikes: number
    }
    views: number
    userId: number
}

export type Product = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    images: string[];
    thumbnail: string;
    availabilityStatus: string;
    reviews: Review[];
    warrantyInformation: string;
    shippingInformation: string;
    returnPolicy: string;
}

export type Review = {
    rating: number;
    comment: string;
    reviewerName: string;
}
