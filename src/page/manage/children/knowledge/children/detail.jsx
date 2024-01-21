import React, { useState, useEffect } from 'react';
import '../index.scss';
import ajax from '@/request';
import MrModal from '@/components/mr-modal';
import MrPagination from '@/components/mr-pagination';
// 图片
import knowledgeChoose from '@/assets/images/choose.png';

// antd组件
import { Button, Radio, Empty, Table, Dropdown, Popconfirm, Tag } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';

function Detail() {
  const [isActive, setIsActive] = useState(1);
  const [isOpen, setIsOpen] = useState(false); //弹框状态
  const [tableData, setTableData] = useState([
    {
      key: '1',
      name: '知识库1',
      dataTotal: 465,
      lastUpdated: '2022-01-01',
      status: (
        <Tag icon={<CheckCircleOutlined />} color="success">
          已激活
        </Tag>
      ),
    },
    {
      key: '2',
      name: '知识库2',
      dataTotal: 125,
      lastUpdated: '2024-01-01',
      status: (
        <Tag icon={<MinusCircleOutlined />} color="warning">
          未激活
        </Tag>
      ),
    },
  ]); //表格
  const [total, setTotal] = useState(0); //总条数
  const [selectedRowKeys, setSelectedRowKeys] = useState(0); //选中条数
  const [dropdownEditOpen, setDropdownEditOpen] = useState(false);

  // 导入 弹框确认
  const handleOk = () => {
    console.log(11121);
  };
  // 导入 弹框确认
  const handleCancel = () => {
    setIsOpen(false);
  };
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setIsActive(e.target.value);
  };

  //获取列表
  const getKnowledgeList = async (knowledgeId) => {
    try {
      const res = await ajax.get(`/chat/knowledge/list-file/${knowledgeId}`);
      if (res.code === 200) {
        if (res.data) {
          setTableData(res.data.list);
          setTotal(res.data.total);
        }
      }
    } catch (error) {
      console.log('🚀 ~ getFileList ~ error:', error || '获取列表失败');
    }
  };
  useEffect(() => {
    const knowledgeId = new URLSearchParams(location.search).get('parentId');
    getKnowledgeList(knowledgeId);
  }, []);

  // 表格标题
  const tableColumns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '数据总量',
      dataIndex: 'dataTotal',
      key: 'dataTotal',
    },
    {
      title: '最后更新时间',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <Dropdown
          dropdownRender={() => (
            <div className="knowledge-list-dropdown-box">
              <div>
                <Button
                  icon={
                    <>
                      <i className="iconfont mr-change-1"></i>
                    </>
                  }
                  type="text"
                  className="title-dropdown-btn"
                  onClick={() => {
                    setDropdownEditOpen(false);
                    onEdit(file);
                  }}
                >
                  编 辑
                </Button>
              </div>
              <div>
                <Button
                  icon={
                    <>
                      {/* <i className="iconfont mr-link"></i> */}
                      <i className="iconfont mr-link-off"></i>
                    </>
                  }
                  type="text"
                  className="title-dropdown-btn"
                  onClick={() => {
                    setDropdownEditOpen(false);
                    onMove(file);
                  }}
                >
                  {/* 激 活 */}状 态
                </Button>
              </div>
              <div>
                <Popconfirm
                  title="提示"
                  description="确认删除?"
                  okText="确认"
                  cancelText="取消"
                  placement="right"
                  onConfirm={() => {
                    setDropdownEditOpen(false);
                    onDelete(file);
                  }}
                  onCancel={() => setDropdownEditOpen(false)}
                  icon={
                    <i
                      className="iconfont mr-group43"
                      style={{
                        color: '#fb6547',
                        position: 'relative',
                        top: '-2px',
                        left: '-3px',
                        marginRight: '2px',
                      }}
                    ></i>
                  }
                >
                  <Button
                    icon={
                      <>
                        <i className="iconfont mr-del-1"></i>
                      </>
                    }
                    type="text"
                    className="title-dropdown-btn"
                  >
                    删 除
                  </Button>
                </Popconfirm>
              </div>
            </div>
          )}
          placement="bottomRight"
          trigger={['click']}
          open={dropdownEditOpen}
          onOpenChange={(dropdownEditOpen) =>
            setDropdownEditOpen(dropdownEditOpen)
          }
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
    <div className="knowledge-detail">
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
      {/* 弹框 */}
      <MrModal
        title={
          <div className="knowledge-list-modal-title">
            <img
              src={knowledgeChoose}
              style={{ height: '22px', marginRight: '7px' }}
            />
            <span>选择来源</span>
          </div>
        }
        content={
          <div style={{ margin: '20px 0 25px 0' }}>
            <Radio.Group
              onChange={onChange}
              value={isActive}
              style={{ width: '100%' }}
            >
              <div className="knowledge-detail-radio-box user-select">
                <Radio className="knowledge-detail-radio-item" value={1}>
                  <div className="knowledge-detail-radio-content">
                    <div>本地文件</div>
                    <div>上传PDF，TXT，DOCX等格式的文件</div>
                  </div>
                </Radio>

                <Radio className="knowledge-detail-radio-item" value={2}>
                  <div className="knowledge-detail-radio-content">
                    <div>网页链接</div>
                    <div>读取静态网页内容作为数据集</div>
                  </div>
                </Radio>

                <Radio className="knowledge-detail-radio-item" value={3}>
                  <div className="knowledge-detail-radio-content">
                    <div>自定义文本</div>
                    <div>手动输入一段文本作为数据集</div>
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

export default Detail;
