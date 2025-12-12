import React, { useEffect } from "react";
import { Form, Input, Checkbox, Button } from "antd";

const OrderForm = ({ order, handleSubmit, allProducts, mode }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (order) {
            form.setFieldsValue({
                orderDescription: order.orderDescription,
                products: order.products
                    .filter(p => p.ordered)
                    .map(p => p.id)
            });
        } else {
            form.resetFields();
        }
    }, [order]);

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
                label="Order Description"
                name="orderDescription"
                rules={[{ required: true, message: "Description is required" }]}
            >
                <Input placeholder="Order description" />
            </Form.Item>

            <Form.Item label="Products" name="products" rules={[{ required: true, message: "Products required" }]}>
                <Checkbox.Group style={{ display: "flex", flexDirection: "column" }}>
                    {(order?.products || allProducts).map((p) => (
                        <Checkbox key={p.id} value={p.id}>
                            <b>{p.productName}</b> - <small>{p.productDescription}</small>
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            </Form.Item>

            <Button type="primary" htmlType="submit">
                {mode === 'edit' ? 'Update' : 'Save'}
            </Button>
        </Form>
    );
};

export default OrderForm;
