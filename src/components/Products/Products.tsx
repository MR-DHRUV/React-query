import React from 'react'
import { Spinner } from '../ui/spinner'
import { Product } from '@/types/Product'
import { ProductCard } from './ProductCard'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useProducts } from '@/hooks/products'

const Products = () => {
    const [searchInput, setSearchInput] = React.useState<string>('')
    const [searchParam, setSearchParam] = React.useState<string>('')
    const {
        data,
        isLoading,
        isFetching,
        isError,
        error
    } = useProducts(searchParam);

    const onClickSearch = (data: string) => {
        setSearchParam(data);
    };

    if (isLoading || isFetching) {
        return (
            <div className='mt-30 flex justify-center'>
                <Spinner size="large" show={isLoading} />
            </div>
        );
    }

    if (isError) {
        return (
            <div className='mt-10 flex justify-center'>
                <p className="text-red-500 text-center">Error fetching products: {error.message}</p>
            </div>
        );
    }

    return (
        <div className='mt-10 flex justify-center'>
            <div className='container'>
                <h1 className="text-2xl font-bold text-center mt-4">Products</h1>

                {/* Search Box */}
                <form
                    className="flex mt-4 justify-center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onClickSearch(searchInput);
                    }}
                >
                    <Input
                        placeholder="Search products..."
                        className="w-full max-w-[600px]"
                        name='search'
                        id='search'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <Button variant="outline" className="ml-2" role='submit'>
                        <Search className="w-4 h-4" />
                    </Button>
                </form>

                {/* Results */}
                <div className="flex flex-row flex-wrap justify-center gap-4 mt-4">
                    {data?.products.map((post: Product) => (
                        <ProductCard {...post} key={post.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products
