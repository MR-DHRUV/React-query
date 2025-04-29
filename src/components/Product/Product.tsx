import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"
import { useProduct } from '@/hooks/products'
import { useParams } from 'react-router'
import { Spinner } from '../ui/spinner'

const Product = () => {

    const { id } = useParams<{ id: string }>()
    console.log(id)

    const {
        data,
        isLoading,
        isError,
        error,
    } = useProduct(id as string);

    const [selectedImage, setSelectedImage] = React.useState<number>(0)

    if (isLoading) {
        return (
            <div className='mt-30 flex justify-center'>
                <Spinner size="large" show={isLoading} />
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className='mt-10 flex justify-center'>
                <p className="text-red-500 text-center">Error fetching products: {error?.message}</p>
            </div>
        )
    }

    return (
        <Card className="max-w-5xl mt-10 mx-auto p-6 rounded-2xl shadow-lg">
            <CardHeader>
                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-full md:w-[300px]">
                        <img
                            src={data.images[selectedImage]}
                            alt={data.title}
                            width={300}
                            height={300}
                            className="rounded-lg object-cover w-full h-auto border"
                        />
                        <div className="flex gap-2 mt-3 overflow-x-auto">
                            {data.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`Thumbnail ${idx + 1}`}
                                    width={60}
                                    height={60}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`cursor-pointer rounded-md border ${idx == selectedImage ? "border-blue-500" : "border-transparent"}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex-1">
                        <CardTitle className="text-2xl font-bold">{data.title}</CardTitle>
                        <p className="text-muted-foreground mt-2">{data.description}</p>
                        <div className="flex gap-2 mt-3 flex-wrap">
                            {data.tags.map((tag) => (
                                <Badge key={tag} variant="outline">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                        <div className="mt-4 space-y-1 text-sm">
                            {data.brand && <p>Brand: <strong>{data.brand}</strong></p>}
                            <p>Category: <strong>{data.category}</strong></p>
                            <p>Status: <strong>{data.availabilityStatus}</strong></p>
                            <p>SKU: <strong>{data.sku}</strong></p>
                            <p>Weight: <strong>{data.weight}g</strong></p>
                            <p>Dimensions: <strong>{data.dimensions.width} x {data.dimensions.height} x {data.dimensions.depth}</strong></p>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <Separator />
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Pricing</h3>
                        <p>Price: <strong>${data.price.toFixed(2)}</strong></p>
                        <p>Discount: <strong>{data.discountPercentage}%</strong></p>
                        <p>Minimum Order: <strong>{data.minimumOrderQuantity}</strong></p>
                        <p>Stock Left: <strong>{data.stock}</strong></p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Shipping & Warranty</h3>
                        <p>Shipping: {data.shippingInformation}</p>
                        <p>Warranty: {data.warrantyInformation}</p>
                        <p>Return Policy: {data.returnPolicy}</p>
                    </div>
                </div>
                <Separator />
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        Rating <Star className="w-4 h-4 text-yellow-500 fill-yellow-300" /> {data.rating.toFixed(1)}
                    </h3>
                    {data.reviews.map((review, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                            <p className="font-medium">{review.reviewerName} ({review.rating}/5)</p>
                            <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                            <p className="mt-1">{review.comment}</p>
                        </div>
                    ))}
                </div>
                <Separator />
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <p><strong>Barcode:</strong> {data.meta.barcode}</p>
                        <p><strong>Created At:</strong> {new Date(data.meta.createdAt).toLocaleString()}</p>
                        <p><strong>Updated At:</strong> {new Date(data.meta.updatedAt).toLocaleString()}</p>
                    </div>
                    <div>
                        <p><strong>QR Code:</strong></p>
                        <img
                            src={data.meta.qrCode}
                            alt="QR Code"
                            width={100}
                            height={100}
                            className="mt-1"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default Product;
