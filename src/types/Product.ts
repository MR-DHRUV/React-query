export type Review = {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
}

export type Product = {
    id: number
    title: string
    brand: string | undefined
    description: string
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    tags: string[]
    sku: string
    weight: number
    dimensions: {
        width: number
        height: number
        depth: number
    }
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: string
    reviews: Review[]
    returnPolicy: string
    minimumOrderQuantity: number
    meta: {
        createdAt: string
        updatedAt: string
        barcode: string
        qrCode: string
    }
    images: string[]
    thumbnail: string
}