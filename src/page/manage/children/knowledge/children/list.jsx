import React, { useContext, useState, useEffect, useRef } from 'react';
import '../index.scss';
import ajax from '@/request';
import { useLocation } from 'react-router-dom';

import MrPagination from '@/components/mr-pagination';
import MrModal from '@/components/mr-modal';
import FileItem from './file-list';
import MoveList from './move-list';

// 图片
import knowledgeFile from '@/assets/images/file.png';
import knowledgeIcon from '@/assets/images/knowledge-icon.png';
import moveTo from '@/assets/images/move-to.png';

// antd组件
import {
  message,
  Button,
  Dropdown,
  Empty,
  Input,
  Modal,
  Breadcrumb,
} from 'antd';

function List() {
  const location = useLocation();

  const inputFolderNameRef = useRef(null); //inputRef 自动聚焦
  const [dropdownAddOpen, setDropdownAddOpen] = useState(false); //新建下拉状态
  const [isOpen, setIsOpen] = useState(false); //弹框状态 - 新增/编辑
  const [isMoveOpen, setIsMoveOpen] = useState(false); //弹框状态 - 新增/编辑
  const [fileList, setFileList] = useState([]); //文件列表

  const [total, setTotal] = useState(0); //总条数
  const [parentId, setParentId] = useState(''); //存储地址栏，用来刷新列表

  const [moveTargetId, setMoveTargetId] = useState(''); //要移动的子id
  const [moveTargetParentId, setMoveTargetParentId] = useState(''); //移动到哪个父id
  // 列表筛选
  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 20,
    keywords: '',
    parentId, //空-目录
  });
  // 提交表单
  const [folderForm, setFolderForm] = useState({
    name: '', // 名称
    description: '', //描述介绍
    type: 1, // 1-文件夹 2-知识库
    imageUrl: '', // 头像-只有type===2才有头像
    parentId,
  });
  const [folderId, setFolderId] = useState(''); //编辑-子元素id

  // 移动- list参数
  const [moveParams, setMoveParams] = useState({
    pageNo: 1,
    pageSize: 100,
    keywords: '',
    parentId: '', //空-目录
  });
  // 移动-面包屑导航
  const [moveBreadList, setMoveBreadList] = useState([]);

  // 🚀方法🚀
  // 新增 / 编辑弹框
  const handleModal = (file, type) => {
    setIsOpen(true);
    setTimeout(() => {
      inputFolderNameRef.current.focus(); //name光标选中
    }, 200);

    // 新增
    if (!file.id) {
      // type：1-文件夹 2-知识库
      setFolderForm((prevForm) => ({
        ...prevForm,
        type,
      }));
      console.log(folderForm);
    } else {
      // 编辑
      setFolderForm({
        ...file,
      });
      setFolderId(file.id);
      console.log(folderForm);
    }
  };

  // 弹框 - 确定(新增/编辑)
  const handleOk = () => {
    if (!folderForm.name) {
      message.info(`请输入${folderForm.type === 1 ? '文件夹' : '知识库'}名称`);
      return;
    }
    console.log(folderForm);
    submitFile();
  };

  // 弹框 - 取消(新增/编辑)
  const handleCancel = () => {
    setIsOpen(false);
    // 恢复原值
    setFolderForm({
      name: '',
      description: '',
      type: 1,
      imageUrl: '',
      parentId,
    });
  };

  // 提交(新增/编辑)
  const submitFile = async () => {
    if (folderId) {
      // 编辑
      try {
        const res = await ajax.post(`/chat/knowledge/update`, folderForm);
        if (res.code === 200) {
          message.success('编辑成功');
          setIsOpen(false);
          setFolderId('');
          // 恢复原值
          setFolderForm({
            name: '',
            description: '',
            type: 1,
            imageUrl: '',
            parentId,
          });

          getFileList();
        }
      } catch (error) {
        message.error(error.message || '编辑失败');
      } finally {
        setIsOpen(false);
        setFolderId('');
        // 恢复原值
        setFolderForm({
          name: '',
          description: '',
          type: 1,
          imageUrl: '',
          parentId,
        });
      }
    } else {
      // 新增
      try {
        const res = await ajax.post('/chat/knowledge/create', folderForm);
        if (res.code === 200) {
          message.success('创建成功');
          setIsOpen(false);
          // 恢复原值
          setFolderForm({
            name: '',
            description: '',
            type: 1,
            imageUrl: '',
            parentId,
          });
          getFileList();
        }
      } catch (error) {
        message.error(error.msg || '创建失败');
      } finally {
        setIsOpen(false);
        // 恢复原值
        setFolderForm({
          name: '',
          description: '',
          type: 1,
          imageUrl: '',
          parentId,
        });
      }
    }
  };

  // 获取文件列表分页
  const getFileList = async () => {
    try {
      const res = await ajax.get('/chat/knowledge/list-page', params);
      if (res.code === 200) {
        setFileList(res.data.list);
        setTotal(res.data.total);
      }
    } catch (error) {
      console.log('🚀 ~ getFileList ~ error:', error || '获取文件列表分页失败');
    }
  };

  // 点击移动
  const handleMoveTarget = async (file) => {
    setMoveTargetId(file.id); //要移动的id
    setIsMoveOpen(true);
  };
  // 确认移动
  const handleMoveConfirm = async () => {
    console.log('🚀 ~ handleMoveConfirm ~ 要移动的子元素:', moveTargetId);
    console.log('🚀 ~ handleMoveConfirm ~ 移动到的父元素:', moveTargetParentId);
    let params = {
      id: moveTargetId,
      parentId: moveTargetParentId || '0',
    };
    console.log('🚀 ~ handleMoveConfirm ~ params:', params);
    try {
      const res = await ajax.post('/chat/knowledge/move', params);
      if (res.code === 200) {
        message.success('移动成功');

        setMoveTargetId('');
        setMoveTargetParentId('');
        getFileList();
      }
    } catch (error) {
      message.error(error.message || '移动失败');
    } finally {
      setIsMoveOpen(false);
      setMoveParams({
        pageNo: 1,
        pageSize: 100,
        keywords: '',
        parentId: '',
      });
      setMoveBreadList([]); // 关闭的时候，移动的面包屑置为空
    }
  };
  // 取消移动
  const handleMoveCancel = async () => {
    setIsMoveOpen(false);
    setMoveTargetId('');
    setMoveTargetParentId('');
    setMoveParams({
      pageNo: 1,
      pageSize: 100,
      keywords: '',
      parentId: '',
    });
    setMoveBreadList([]); // 关闭的时候，移动的面包屑置为空
  };

  // 删除
  const handleDelete = async (file) => {
    try {
      const res = await ajax.delete(
        `/chat/knowledge/delete?knowledgeIds=${file.id}`
      );
      if (res.msg === 'HAS_CHILD') {
        message.info('该文件夹下存在子文件，请先删除子文件');
        return;
      }
      if (res.code === 200) {
        message.success('删除成功');
        getFileList();
      }
    } catch (error) {
      message.error(error.msg || '删除失败');
    } finally {
      console.log('删除操作');
    }
  };

  // 导出

  useEffect(() => {
    getFileList();
  }, [params]); //监听params的变化，如果是[]，则只在首次执行

  useEffect(() => {
    // 从URL中获取parentId参数
    const queryParams = new URLSearchParams(location.search);
    const parentId = queryParams.get('parentId');

    // 修改params值，触发监听
    setParams((prevParams) => ({
      ...prevParams,
      parentId,
    }));
    // 修改folderForm值，提交对应parentId
    setFolderForm((prevForm) => ({
      ...prevForm,
      parentId,
    }));
    // 存储新的parentId
    setParentId(parentId);
  }, [location]);

  return (
    <div className="knowledge-list">
      <div className="knowledge-list-title">
        <Dropdown
          dropdownRender={() => (
            <div className="knowledge-list-dropdown-box">
              {/* 新建文件夹 */}
              <div>
                <Button
                  icon={
                    <>
                      <img src={knowledgeFile} />
                    </>
                  }
                  type="text"
                  className="title-dropdown-btn"
                  onClick={() => {
                    setDropdownAddOpen(false);
                    handleModal({}, 1);
                  }}
                >
                  文件夹
                </Button>
              </div>
              {/* 新建知识库 */}
              <div>
                <Button
                  icon={
                    <>
                      <img src={knowledgeIcon} />
                    </>
                  }
                  type="text"
                  className="title-dropdown-btn"
                  onClick={() => {
                    setDropdownAddOpen(false);
                    handleModal({}, 2);
                  }}
                >
                  知识库
                </Button>
              </div>
            </div>
          )}
          placement="bottomRight"
          trigger={['click']}
          open={dropdownAddOpen}
          onOpenChange={(dropdownAddOpen) =>
            setDropdownAddOpen(dropdownAddOpen)
          }
        >
          <Button type="primary">新建</Button>
        </Dropdown>
      </div>
      <main className="knowledge-list-content">
        {/* 子元素item-file */}
        {fileList && fileList.length > 0 ? (
          fileList.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              onEdit={(file) => handleModal(file)}
              onMove={handleMoveTarget}
              onDelete={handleDelete}
            />
          ))
        ) : (
          /* 空 */
          <div className="knowledge-content-empty">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>还没有文件，快去创建一个吧！</span>}
            />
          </div>
        )}
      </main>
      {/* 分页 */}
      <footer className="knowledge-list-footer">
        <MrPagination
          total={total}
          // showTotal={(total, range) =>
          //   `当前${range[0]}-${range[1]} / 共${total}页`
          // }
          showTotal={(total) => `共${total}条`}
          defaultPageSize={params.pageSize}
          defaultCurrent={1}
          pageNo={params.pageNo}
          pageSize={params.pageSize}
          onChange={(newPageNo) =>
            setParams((prevParams) => ({
              ...prevParams,
              pageNo: newPageNo,
            }))
          }
        />
      </footer>
      {/* 弹框 - 新增编辑 */}
      <MrModal
        title={
          <div className="knowledge-list-modal-title">
            <img src={folderForm.type === 1 ? knowledgeFile : knowledgeIcon} />
            <span>{`新建${folderForm.type === 1 ? '文件夹' : '知识库'}`}</span>
          </div>
        }
        content={
          <div style={{ margin: '20px 0 25px 0' }}>
            <Input
              ref={inputFolderNameRef}
              placeholder={`${folderForm.type === 1 ? '文件夹' : '知识库'}名称`}
              prefix={<span style={{ color: '#f64d28' }}>*</span>}
              suffix={<i className="iconfont mr-shuru" />}
              value={folderForm.name}
              onChange={(e) =>
                setFolderForm((prevForm) => ({
                  ...prevForm,
                  name: e.target.value,
                }))
              }
            />
            <div style={{ height: 15 }}></div>
            <Input
              placeholder={`这个${
                folderForm.type === 1 ? '文件夹' : '知识库'
              }还没有介绍~`}
              suffix={<i className="iconfont mr-jishiben" />}
              allowClear
              value={folderForm.description}
              onChange={(e) =>
                setFolderForm((prevForm) => ({
                  ...prevForm,
                  description: e.target.value,
                }))
              }
            />
          </div>
        }
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={450}
      />
      {/* 弹框 - 移动元素 */}
      <Modal
        title={
          <div className="knowledge-list-modal-title">
            <img src={moveTo} />
            <span>{`移动到此处`}</span>
          </div>
        }
        open={isMoveOpen}
        onCancel={handleMoveCancel}
        footer={
          <div className="knowledge-list-modal-footer">
            <Button
              key="save"
              type="primary"
              className="knowledge-list-modal-btn"
              onClick={handleMoveConfirm}
            >
              保存
            </Button>
          </div>
        }
        width={600}
        maskClosable={false}
      >
        <div className="knowledge-move-bread">
          <Breadcrumb
            items={[
              {
                title: '根目录',
              },
              ...moveBreadList,
            ]}
          />
        </div>
        <MoveList
          moveTargetId={moveTargetId}
          setMoveTargetParentId={setMoveTargetParentId}
          params={moveParams}
          setParams={setMoveParams}
          setMoveBreadList={setMoveBreadList}
        />
      </Modal>
    </div>
  );
}

export default List;
