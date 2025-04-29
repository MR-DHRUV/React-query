import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './components/Posts'
import { Navbar } from './components/ui/navabr'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Users from './components/Users'
import Products from './components/Products'

const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App
