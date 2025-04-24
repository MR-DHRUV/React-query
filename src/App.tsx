import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './components/Home'

const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
