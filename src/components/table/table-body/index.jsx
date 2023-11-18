import React, { useState } from 'react';
import { Button, Table, Input, Avatar, Switch, Tag } from 'antd';
import {
  UserOutlined,
  CheckOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import headImg from '@/assets/headIcon/head-2.svg';

const columns = [
  {
    title: '用户名',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '头像',
    dataIndex: 'headIcon',
  },
  {
    title: '状态',
    dataIndex: 'isOnline',
  },
  {
    title: '账号',
    dataIndex: 'account',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '上一次登陆',
    dataIndex: 'logintime',
  },
  {
    title: '是否启用',
    dataIndex: 'isUse',
  },
  {
    title: '操作',
    dataIndex: 'action',
    render: () => <a>编辑</a>,
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `user${i}`,
    headIcon: <Avatar src={headImg} />,
    isOnline: (
      <Tag icon={<CheckCircleOutlined />} color="success">
        在线
      </Tag>
      // <>
      //   <Button
      //     style={{ background: '#00aa6b', color: '#fff' }}
      //     shape="circle"
      //     size="small"
      //     icon={<CheckOutlined />}
      //   />
      //   <span style={{ marginLeft: '5px' }}>在线</span>
      // </>
    ),
    account: `user${i}@qq.com`,
    createTime: '2023-11-11 09:47:44',
    logintime: '2023-11-18 12:33:25',
    isUse: (
      <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
    ),
    address: `London, Park Lane no. ${i}`,
  });
}

const TableBody = (props) => {
  const { slotTitle } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const start = () => {
    setLoading(true);
    // 请求地址
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  // 搜索
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputFocus = () => {
    setIsFocused(true);
  };
  const handleInputBlur = () => {
    setIsFocused(false);
  };
  const handleClearInput = () => {
    setInputValue('');
  };

  // 换页
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <div className="container">
      <div
        className="flx-justify-between"
        style={{
          padding: '16px 0',
        }}
      >
        <div>
          <Input
            placeholder="搜索"
            prefix={<i className="iconfont mr-search-1" />}
            suffix={
              inputValue && (
                <i
                  className="iconfont mr-fork-1"
                  onClick={handleClearInput}
                  style={{ cursor: 'pointer' }}
                />
              )
            }
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            style={{ width: isFocused || inputValue ? 250 : 200 }}
          />
        </div>
        <div>
          <span
            style={{
              marginRight: 8,
            }}
          >
            {hasSelected ? `已选 ${selectedRowKeys.length} 条数据` : ''}
          </span>
          <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            导出
          </Button>
        </div>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 10,
        }}
      />
    </div>
  );
};
export default TableBody;
