import React from 'react';
import { Table, Button } from 'antd';
import { formatDateTime } from '../utils/date';


export default function OrdersTable({ data, loading, onEdit, onDelete }) {
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Description', dataIndex: 'orderDescription', key: 'orderDescription', ellipsis: true },
        { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', render: v => formatDateTime(v) },
        { title: 'Products', dataIndex: 'products', key: 'products' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => onEdit(record.id)}>
                        Edit
                    </Button>
                    <Button type="link" danger onClick={() => onDelete(record.id)}>
                        Delete
                    </Button>
                </>
            )
        }
    ];


    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey={r => r.id}
            pagination={{ pageSize: 8 }}
        />
    );
}