import React, { useState, useEffect } from 'react';
import './index.scss';
import ajax from '@/request';
import MrModal from '@/components/mr-modal';
import MrPagination from '@/components/mr-pagination';
// 图片
import knowledgeChoose from '@/assets/images/choose.png';
import pdfImg from '@/assets/images/PDF.png';
import txtImg from '@/assets/images/TXT.png';

// antd组件
import {
  Button,
  Radio,
  Empty,
  Table,
  Dropdown,
  Popconfirm,
  Tag,
  message,
  Progress,
} from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';

function DetailList({ toImport, importWay, setImportWay }) {
  // const [importWay, setImportWay] = useState('localFile');
  const [isOpen, setIsOpen] = useState(false); //弹框状态
  const [tableData, setTableData] = useState([]); //表格
  const [total, setTotal] = useState(0); //总条数
  const [selectedRowKeys, setSelectedRowKeys] = useState(0); //选中条数
  const [dropdownEditOpen, setDropdownEditOpen] = useState(false);

  // 导入 弹框确认
  const handleOk = () => {
    toImport();
    setIsOpen(false);
  };
  // 导入 弹框确认
  const handleCancel = () => {
    setIsOpen(false);
  };
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setImportWay(e.target.value);
  };

  //获取列表
  const getKnowledgeList = async () => {
    const knowledgeId = new URLSearchParams(location.search).get('parentId');
    try {
      const res = await ajax.get(`/chat/knowledge/list-file/${knowledgeId}`);
      if (res.code === 200) {
        if (res.data) {
          const newData = res.data.map((item, index) => ({
            ...item,
            key: index + 1,
          }));
          setTableData(newData);
          setTotal(res.data.length);
        }
      }
    } catch (error) {
      console.log('🚀 ~ getFileList ~ error:', error || '获取列表失败');
    }
  };
  // 编辑列表
  const onEdit = async (record) => {
    console.log('🚀 ~ onEdit ~ record:', record);
  };
  // 删除列表
  const onDelete = async (record) => {
    const knowledgeIds = record.detailId;
    try {
      const res = await ajax.delete(
        `/chat/knowledge/delete-file/?knowledgeIds=${knowledgeIds}`
      );
      console.log('🚀 ~ onDelete ~ res:', res);
      if (res.code === 200) {
        if (res.data) {
          message.success('删除成功');
          getKnowledgeList();
        }
      }
    } catch (error) {
      console.log('🚀 ~ getFileList ~ error:', error || '获取列表失败');
    }
  };
  useEffect(() => {
    getKnowledgeList();
  }, []);

  // 格式化时间
  const formatTimeString = (timeString) => {
    const date = new Date(timeString);
    // 获取年、月、日、小时和分钟
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    // 格式化成 "YYYY-MM-DD HH:mm" 形式
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedTime;
  };

  // 更多
  const renderDropdownMenu = (record) => {
    return (
      <div className="knowledge-list-dropdown-box">
        <div>
          <Button
            icon={<i className="iconfont mr-change-1"></i>}
            type="text"
            className="title-dropdown-btn"
            onClick={() => onEdit(record)}
          >
            编 辑
          </Button>
        </div>
        <div>
          <Button
            icon={<i className="iconfont mr-xiazai"></i>}
            type="text"
            className="title-dropdown-btn"
          >
            <a
              href={`http://${record.fileUrl}`}
              target="_blank"
              download
              rel="noreferrer"
            >
              下 载
            </a>
          </Button>
        </div>
        <div>
          <Popconfirm
            title="提示"
            description="确认删除?"
            okText="确认"
            cancelText="取消"
            placement="right"
            onConfirm={() => onDelete(record)}
          >
            <Button
              icon={<i className="iconfont mr-del-1"></i>}
              type="text"
              className="title-dropdown-btn"
            >
              删 除
            </Button>
          </Popconfirm>
        </div>
      </div>
    );
  };

  // 表格行
  const tableColumns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: (text, record, index) => index + 1,
    },
    {
      title: '文件名',
      dataIndex: 'fileName',
      key: 'fileName',
      render: (name) => (
        <div className="flx-align-center">
          <img
            src={name.split('.')[1] === 'pdf' ? pdfImg : txtImg}
            style={{ height: 18, marginRight: 5 }}
          />
          <div className="single-omit" style={{ maxWidth: 120 }}>
            {name.split('.')[0]}
          </div>
        </div>
      ),
    },
    {
      title: '文件描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (time) => formatTimeString(time),
    },
    {
      title: '上传进度',
      dataIndex: 'createTime',
      key: 'createTime',
      render: () => <Progress percent={30} size="small" />,
    },
    {
      title: '任务状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color;
        let text;
        let icon;

        switch (status) {
          case 1:
            color = 'default';
            text = '未开始';
            icon = <MinusCircleOutlined />;
            break;
          case 2:
            color = 'warning';
            text = '文件分隔中';
            icon = <ClockCircleOutlined />;
            break;
          case 3:
            color = 'processing';
            text = '训练';
            icon = <SyncOutlined />;
            break;
          case 4:
            color = 'success';
            text = '完成';
            icon = <CheckCircleOutlined />;
            break;
          case 5:
            color = 'error';
            text = '失败';
            icon = <CloseCircleOutlined />;
            break;
          default:
            color = '';
            text = '';
            icon = '';
            break;
        }

        return (
          <Tag icon={icon} color={color}>
            {text}
          </Tag>
        );
      },
    },

    {
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record) => (
        <Dropdown
          // 使用文件ID作为下拉菜单的唯一标识符
          dropdownRender={() => renderDropdownMenu(record)}
          placement="bottomRight"
          trigger={['click']}
        >
          <i className="iconfont mr-more-2 user-select"></i>
        </Dropdown>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div className="knowledge-detail-list">
      <div className="knowledge-detail-title">
        <Button
          type="primary"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          导入
        </Button>
      </div>

      <main className="knowledge-detail-content">
        {tableData && tableData.length > 0 ? (
          <div className="knowledge-detail-table">
            <Table
              rowSelection={rowSelection}
              dataSource={tableData}
              columns={tableColumns}
            />
          </div>
        ) : (
          <div className="knowledge-content-empty">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>数据集空空如也～</span>}
            />
          </div>
        )}
      </main>
      {/* 弹框 - 导入 */}
      <MrModal
        title={
          <div className="knowledge-list-modal-title">
            <img
              src={knowledgeChoose}
              style={{ height: '16px', marginRight: '7px' }}
            />
            <span>选择来源</span>
          </div>
        }
        content={
          <div style={{ margin: '20px 0 25px 0' }}>
            <Radio.Group
              onChange={onChange}
              value={importWay}
              style={{ width: '100%' }}
            >
              <div className="knowledge-detail-radio-box user-select">
                <Radio
                  className="knowledge-detail-radio-item"
                  value="localFile"
                >
                  <div className="knowledge-detail-radio-content">
                    <div>本地文件</div>
                    <div>上传TXT，PDF格式文件</div>
                  </div>
                </Radio>

                <Radio className="knowledge-detail-radio-item" value="webLink">
                  <div className="knowledge-detail-radio-content">
                    <div>网页链接</div>
                    <div>读取静态网页内容作为数据集</div>
                  </div>
                </Radio>
              </div>
            </Radio.Group>
          </div>
        }
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={550}
      />
    </div>
  );
}

export default DetailList;
