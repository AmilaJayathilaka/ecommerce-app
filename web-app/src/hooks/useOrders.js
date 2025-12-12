import { useEffect, useMemo, useState, useCallback } from 'react';
import { getOrders, getOrderById, deleteOrderById, updateOrder, createOrder } from '../services/api.js';

export function useOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState('');

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await getOrders();
            if (res.data?.success) setOrders(res.data.data || []);
            else setOrders([]);
        } catch (err) {
            setError(err.message || 'Failed to fetch');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchOrders(); }, []);

    const filtered = useMemo(() => {
        let out = [...orders];
        if (search) {
            const q = search.trim().toLowerCase();
            out = out.filter(o => String(o.id).includes(q) || String(o.orderDescription || '').toLowerCase().includes(q));
        }

        return out;
    }, [orders, search]);

    const getOrderDetails = async (id) => {
        const res = await getOrderById(id);
        return res.data;
    };

    const createNewOrder = async (values) => {
        await createOrder(values);
        await fetchOrders();
    };

    const updateOrderDetails = async (id, values) => {
        await updateOrder(id, values);
        await fetchOrders();
    };

    const deleteOrder = async (id) => {
        const res = await deleteOrderById(id);
        await fetchOrders();
        return res.data;
    };

    return {
        orders: filtered,
        rawOrders: orders,
        loading,
        error,
        setSearch,
        search,
        getOrderDetails,
        createNewOrder,
        updateOrderDetails,
        deleteOrder
    };
}