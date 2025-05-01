import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Posts from './components/Posts/Posts'
import { Navbar } from './components/ui/navabr'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Users from './components/Todos/Todos'
import Products from './components/Products/Products'
import Product from './components/Products/Product'
import Quotes from './components/Quotes/Quotes'

const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<div>Home</div>} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/users" element={<Users />} />

                    <Route path="/products/:id" element={<Product />} />
                    <Route path="/products" element={<Products />} />

                    <Route path="/quotes" element={<Quotes />} />

                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App
