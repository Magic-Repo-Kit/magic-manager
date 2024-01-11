import React from 'react';
import '../index.scss';
import TableHeader from '@/components/table/table-header';
import TableBody from '@/components/table/table-body';

import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

function UserManage() {
  const slotbtns = [
    {
      name: '添加',
      id: '1',
      type: 'primary',
      icon: <PlusOutlined />,
      size: 'default',

      callback: () => {},
    },
    {
      name: '删除',
      id: '2',
      type: 'default',
      icon: <DeleteOutlined />,
      size: 'default',
      danger: true,
      callback: () => {},
    },
    // {
    //   name: '导出',
    //   id: '3',
    //   type: 'default',
    //   icon: <UploadOutlined />,
    //   size: 'default',
    //   callback: () => {},
    // },
    // {
    //   name: '导入',
    //   id: '4',
    //   type: 'default',
    //   icon: <DownloadOutlined />,
    //   size: 'default',
    //   callback: () => {},
    // },
  ];
  return (
    <div className="users-container">
      <TableHeader slotbtns={slotbtns} slotTitle="账号管理" />
      <TableBody slotTitle="账号管理" />
    </div>
  );
}

export default UserManage;
