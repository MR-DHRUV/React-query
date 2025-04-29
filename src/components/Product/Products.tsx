// import React from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { Spinner } from './ui/spinner'
// import { Product } from '@/types/Post'
// import { ProductCard } from './ProductCard'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import { Search } from 'lucide-react'

// const Products = () => {

//     const [searchParam, setSearchParam] = React.useState<string>('')

//     const { data, isLoading, isFetching, isError, refetch } = useQuery({
//         queryKey: ['products', searchParam],
//         queryFn: ({queryKey}) => fetch(`https://dummyjson.com/products/search?q=${queryKey[1]}`).then(res => res.json()),
//         staleTime: 100 * 60 * 1000,
//         enabled: false, // Disable the query from running automatically on mount
//     })

//     const onClickSearch = () => {
//         refetch()
//     }

//     if (isLoading || isFetching) {
//         return (
//             <div className='mt-30 flex justify-center'>
//                 <Spinner size="large" show={isLoading} />
//             </div>
//         )
//     }

//     if (isError) {
//         return (
//             <div className='mt-10 flex justify-center'>
//                 <p className="text-red-500 text-center">Error fetching products</p>
//             </div>
//         )
//     }

//     return (
//         <div className='mt-10 flex justify-center'>
//             <div className='container'>
//                 <h1 className="text-2xl font-bold text-center mt-4">Products</h1>
//                 {/* Search */}
//                 <div className="flex mt-4 justify-center">
//                     <Input placeholder="Search products..." className="w-full max-w-[600px]" value={searchParam} onChange={(e) => { setSearchParam(e.target.value) }} />
//                     <Button variant="outline" className="ml-2" onClick={onClickSearch}>
//                         <Search className="w-4 h-4" />
//                     </Button>
//                 </div>

//                 <div className="flex flex-row flex-wrap justify-center gap-4 mt-4">
//                     {data && data?.products.map((post: Product) => (
//                         <ProductCard {...post} key={post.id} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Products

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '../ui/spinner'
import { Product } from '@/types/Product'
import { ProductCard } from './ProductCard'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'

// Debounce hook
function useDebounce<T>(value: T, delay = 500) {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

    React.useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay])

    return debouncedValue
}

const Products = () => {
    const [searchParam, setSearchParam] = React.useState<string>('')
    const [triggeredSearch, setTriggeredSearch] = React.useState<string>('')

    const debouncedSearch = useDebounce(triggeredSearch, 400)

    const {
        data,
        isLoading,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ['products', debouncedSearch],
        queryFn: ({ queryKey }) =>
            fetch(`https://dummyjson.com/products/search?q=${queryKey[1]}`).then((res) => res.json()),
        staleTime: 100 * 60 * 1000,
        enabled: !!debouncedSearch, // run only if search term exists
    })

    const onClickSearch = () => {
        setTriggeredSearch(searchParam)
    }

    return (
        <div className='mt-10 flex justify-center'>
            <div className='container'>
                <h1 className="text-2xl font-bold text-center mt-4">Products</h1>

                {/* Search Box */}
                <form className="flex mt-4 justify-center" onSubmit={(e) => { e.preventDefault(); onClickSearch() }}>
                    <Input
                        placeholder="Search products..."
                        className="w-full max-w-[600px]"
                        value={searchParam}
                        onChange={(e) => setSearchParam(e.target.value)}
                    />
                    <Button variant="outline" className="ml-2" role='submit'>
                        <Search className="w-4 h-4" />
                    </Button>
                </form>

                {/* Loader */}
                {(isLoading || isFetching) && (
                    <div className='mt-30 flex justify-center'>
                        <Spinner size="large" show />
                    </div>
                )}

                {/* Error */}
                {isError && (
                    <div className='mt-10 flex justify-center'>
                        <p className="text-red-500 text-center">Error fetching products</p>
                    </div>
                )}

                {/* Results */}
                <div className="flex flex-row flex-wrap justify-center gap-4 mt-4">
                    {data?.products.map((post: Product) => (
                        <ProductCard {...post} key={post.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Products
