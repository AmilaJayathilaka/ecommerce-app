import { useState, useCallback } from 'react';
import { getProducts } from '../services/api.js';

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [productsLoading, setLoading] = useState(false);
    const [productsError, setError] = useState(null);

    const productsFetch = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getProducts();
            if (res.data?.success) setProducts(res.data.data || []);
            else setProducts([]);
        } catch (err) {
            setError(err.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        products,
        productsLoading,
        productsError,
        productsFetch
    };
}   
