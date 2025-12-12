import React, { useState } from 'react';
import OrdersTable from '../components/OrdersTable';
import SearchBar from '../components/SearchBar';
import OrderForm from '../components/OrderForm';
import { useOrders } from '../hooks/useOrders';
import { useProducts } from '../hooks/useProducts';
import { Card, Row, Col, Modal, Button, message, Spin } from 'antd';

export default function Orders() {
    const {
        orders, loading, error,
        search, setSearch,
        getOrderDetails,
        createNewOrder,
        updateOrderDetails,
        deleteOrder
    } = useOrders();

    const {
        products, productsLoading, productsError,
        productsFetch
    } = useProducts();

    const [open, setOpen] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [mode, setMode] = useState(null);

    const onDelete = async (orderId) => {
        Modal.confirm({
            title: "Are you sure you want to delete this order?",
            okText: "Delete",
            okType: "danger",
            onOk: async () => {
                try {
                    const result = await deleteOrder(orderId);
                    message.success(result?.message);
                } catch (err) {
                    message.error(err.message);
                }
            },
        });
    };

    const onEdit = async (orderId) => {
        try {
            setMode('edit');
            setOpen(true);
            setLoadingDetails(true);

            const res = await getOrderDetails(orderId);
            setCurrentOrder(res.data);

            setLoadingDetails(false);
        } catch (err) {
            message.error(err.message);
            setOpen(false);
            setLoadingDetails(false);
        }
    };

    const onNewOrderClick = async () => {
        setMode('create');
        setCurrentOrder(null);
        productsFetch();
        setOpen(true);
    };

    const onSubmit = async (values) => {
        try {
            if (mode === 'edit') {
                const updatedOrder = {
                    orderDescription: values.orderDescription,
                    products: values.products
                }
                const orderId = currentOrder.id;

                await updateOrderDetails(orderId, updatedOrder);
            } else if (mode === 'create') {
                const newOrder = { orderDescription: values.orderDescription, products: values.products }
                await createNewOrder(newOrder);
            }

            setOpen(false);
        } catch (err) {
            message.error(err.message);
            setOpen(false);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <Card title={'Orders'} style={{ borderRadius: 12 }}>
                {(error || productsError) && message.error(error || productsError)}

                <Row
                    gutter={[12, 12]}
                    justify="end"
                    style={{ marginBottom: 12 }}
                >
                    <Col flex="none">
                        <Button type="primary" onClick={onNewOrderClick}>
                            New Order
                        </Button>
                    </Col>
                    <Col flex="none">
                        <SearchBar value={search} onChange={setSearch} />
                    </Col>
                </Row>

                <OrdersTable
                    data={orders}
                    loading={loading}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />

                <Modal
                    open={open}
                    title="Order Details"
                    onCancel={() => setOpen(false)}
                    footer={null}
                >
                    {(loadingDetails || productsLoading) ? <Spin /> :
                        <OrderForm
                            order={currentOrder}
                            handleSubmit={onSubmit}
                            allProducts={products}
                            mode={mode}
                        />}
                </Modal>
            </Card>
        </div>
    );

}