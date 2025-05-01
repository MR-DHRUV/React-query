import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Star } from "lucide-react";
import { Product } from "@/types/Product";
import { Link } from "react-router";

export const ProductCard = (product: Product) => {
    const {
        id,
        title,
        description,
        price,
        discountPercentage,
        stock,
        brand,
        rating,
        tags,
        thumbnail,
        availabilityStatus,
        shippingInformation,
        warrantyInformation,
        returnPolicy,
    } = product;

    const discountedPrice = (price * (1 - discountPercentage / 100)).toFixed(2);

    return (
        <Link to={`/products/${id}`} className="w-full max-w-sm">
            <Card className="w-full max-w-sm shadow-xl border-muted rounded-2xl">
                <CardHeader className="p-4">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-48 object-contain rounded-xl border"
                    />
                    <CardTitle className="mt-4 text-lg">{title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                        {description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">${discountedPrice}</span>
                        <span className="line-through text-sm text-muted-foreground">${price.toFixed(2)}</span>
                        <Badge variant="destructive">{discountPercentage}% OFF</Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{rating.toFixed(1)} / 5</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-1">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <div className="text-sm mt-2">
                        <p><strong>Brand:</strong> {brand}</p>
                        <p><strong>Status:</strong> {availabilityStatus}</p>
                        <p><strong>Stock:</strong> {stock} left</p>
                    </div>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" className="mt-2 px-2 text-xs w-full">
                                Shipping, Warranty & Return Info
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm text-xs">
                            <p><strong>Shipping:</strong> {shippingInformation}</p>
                            <p><strong>Warranty:</strong> {warrantyInformation}</p>
                            <p><strong>Return:</strong> {returnPolicy}</p>
                        </TooltipContent>
                    </Tooltip>
                </CardContent>

                <CardFooter className="flex flex-col gap-2 px-4 pb-4">
                    <Button variant="default" className="w-full">
                        Add to Cart
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
};
