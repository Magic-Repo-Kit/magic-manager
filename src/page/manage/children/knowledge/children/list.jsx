import React, { useContext, useState, useEffect, useRef } from 'react';
import '../index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import ajax from '@/request';

import MrPagination from '@/components/mr-pagination';
import MrModal from '@/components/mr-modal';
import FileItem from './list-file';

// 图片
import knowledgeFile from '@/assets/images/file.png';
import knowledgeIcon from '@/assets/images/knowledge-icon.png';

// antd组件
import { message, Button, Dropdown, Empty, Input } from 'antd';

function List() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);

  const inputFolderNameRef = useRef(null); //inputRef 自动聚焦
  const [dropdownAddOpen, setDropdownAddOpen] = useState(false); //新建下拉状态
  const [isOpen, setIsOpen] = useState(false); //弹框状态
  const [fileList, setFileList] = useState([]); //文件列表
  // 列表筛选
  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 10,
    keywords: '',
    parentId: '', //空-目录
  });
  const [total, setTotal] = useState(0); //总条数

  // 提交表单
  const [folderForm, setFolderForm] = useState({
    name: '', // 名称
    description: '', //描述介绍
    type: 1, // 1-文件夹 2-知识库
    parentId: '',
    imageUrl: '', // 头像-只有type===2才有头像
  });

  const [folderId, setFolderId] = useState(''); //编辑-子元素id

  // 新增 / 编辑弹框
  const handleModal = (file, type) => {
    setIsOpen(true);
    setTimeout(() => {
      inputFolderNameRef.current.focus(); //name光标选中
    }, 200);
    //file.id - 编辑
    if (file.id) {
      // 参数带进来
      setFolderForm({
        ...folderForm,
        ...file,
        id: file.id,
      });
      setFolderId(file.id);
    } else {
      setFolderForm(type); // type：1-文件夹 2-知识库
      setFolderForm((prevForm) => ({
        ...prevForm,
        type,
      }));
    }
  };

  // 弹框 - 确定
  const handleOk = () => {
    if (!folderForm.name) {
      message.warning(
        `请输入${folderForm.type === 1 ? '文件夹' : '知识库'}名称`
      );
      return;
    }
    submitFile();
  };

  // 弹框 - 取消
  const handleCancel = () => {
    setIsOpen(false);
    // 恢复原值
    setFolderForm({
      name: '',
      description: '',
      type: 1,
      parentId: '',
      imageUrl: '',
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
            parentId: '',
            imageUrl: '',
          });

          getFileList();
        }
      } catch (error) {
        message.error(error.message || '编辑失败');
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
            parentId: '',
            imageUrl: '',
          });
          getFileList();
        }
      } catch (error) {
        message.error(error.message || '创建失败');
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
      message.error(error.message || '获取数据失败');
    }
  };
  // 查看子元素
  const handleView = async (file) => {
    console.log('🚀 ~ handleView ~ file:', file);
    // getFileList(file.id);
  };

  // 移动
  const handleMove = async (file) => {
    console.log('🚀 ~ handleMove ~ file:', file);
    try {
      const res = await ajax.post('/chat/knowledge/move', {
        id: file.id,
        parentId: file.parentId,
      });
      if (res.code === 200) {
        message.success('移动成功');
        setIsOpen(false);
        getFileList();
      }
    } catch (error) {
      message.error(error.message || '移动失败');
    }
  };

  // 删除
  const handleDelete = async (file) => {
    try {
      const res = await ajax.delete(
        `/chat/knowledge/delete?knowledgeIds=${file.id}`
      );
      if (res.code === 200) {
        message.success('删除成功');
        setIsOpen(false);
        getFileList();
      }
    } catch (error) {
      message.error(error.message || '删除失败');
    }
  };

  // 导出

  useEffect(() => {
    getFileList();
  }, [params]); //监听params的变化，如果是[]，则只在首次执行

  useEffect(() => {}, []);

  return (
    <div className="knowledge-list">
      <div className="knowledge-list-title flx-justify-between">
        <div>根目录</div>
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
              onMove={handleMove}
              onDelete={handleDelete}
              onView={handleView}
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
      {/* 弹框 -  */}
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
    </div>
  );
}

export default List;
