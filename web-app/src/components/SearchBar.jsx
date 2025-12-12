import React from 'react';
import { Input, Space } from 'antd';


export default function SearchBar({ value, onChange, placeholder = 'Search orders by id or description' }) {
    return (
        <Space style={{ width: '100%' }}>
            <Input.Search
                allowClear
                enterButton
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                onSearch={val => onChange(val)}
                style={{ width: '100%' }}
            />
        </Space>
    );
}