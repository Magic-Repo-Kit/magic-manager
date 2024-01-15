import React, { useContext, useState, useEffect, useRef } from 'react';
import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import ajax from '@/request';

import MrPagination from '@/components/mr-pagination';
import MrModal from '@/components/mr-modal';
import KnowledgeItem from './konwledge-item';

// 图片
import knowledgeFile from '@/assets/images/file.png';
import knowledgeIcon from '@/assets/images/knowledge-icon.png';

// antd组件
import { message, Button, Dropdown, Empty, Input } from 'antd';

function Knowledge() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);

  const [dropdownAddOpen, setDropdownAddOpen] = useState(false); //新建下拉状态
  const [fileList, setFileList] = useState([]);

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false); //弹框状态

  const inputFolderNameRef = useRef(null);
  const [folderName, setFolderName] = useState(''); //名称
  const [folderDescription, setFolderDescription] = useState(''); //描述介绍
  const [folderType, setFolderType] = useState(1); //类型
  const [folderItemId, setFolderItemId] = useState(''); //名称

  // 新增 / 编辑弹框
  const handleModal = (file, type) => {
    setIsOpen(true);
    setTimeout(() => {
      inputFolderNameRef.current.focus(); //name光标选中
    }, 200);
    console.log('🚀 ~ handleModal ~ file:', file);
    console.log('🚀 ~ handleModal ~ type:', type);
    //file.id - 编辑
    if (file.id) {
      // 参数带进来
      setFolderName(file.name);
      setFolderDescription(file.description);
      setFolderType(file.type);
      setFolderItemId(file.id);
    } else {
      setFolderType(type); // type：1-文件夹 2-知识库
    }
  };

  // 弹框 - 确定
  const handleOk = () => {
    if (!folderName) {
      message.warning(`请输入${folderType === 1 ? '文件夹' : '知识库'}名称`);
      return;
    }
    let params = {
      name: folderName,
      description: folderDescription,
      type: folderType,
    };
    submitFile(params);
  };

  // 弹框 - 取消
  const handleCancel = () => {
    setIsOpen(false);
    setFolderName('');
    setFolderDescription('');
  };

  // 提交(新增/编辑)
  const submitFile = async (params) => {
    if (folderItemId) {
      // 编辑
      try {
        const res = await ajax.post(
          `/chat/knowledge/update?id=${folderItemId}`,
          params
        );
        if (res.code === 200) {
          message.success('编辑成功');
          setIsOpen(false);
          setFolderItemId('');
          setFolderName('');
          setFolderDescription('');
          getFileList(pageNo, pageSize, '', '');
        }
      } catch (error) {
        message.error(error.message || '编辑失败');
      }
    } else {
      // 新增
      try {
        const res = await ajax.post('/chat/knowledge/create', params);
        if (res.code === 200) {
          message.success('创建成功');
          setIsOpen(false);
          setFolderName('');
          setFolderDescription('');
          getFileList(pageNo, pageSize, '', '');
        }
      } catch (error) {
        message.error(error.message || '创建失败');
      }
    }
  };

  // 获取文件列表分页
  const getFileList = async (pageNo, pageSize, keywords, parentId) => {
    const params = {
      pageNo,
      pageSize,
      keywords,
      parentId,
    };
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
        getFileList(pageNo, pageSize, '', '');
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
        getFileList(pageNo, pageSize, '', '');
      }
    } catch (error) {
      message.error(error.message || '删除失败');
    }
  };

  // 导出

  useEffect(() => {
    getFileList(pageNo, pageSize);
  }, [pageNo, pageSize]); //监听 pageNo 和 pageSize 的变化，如果是[]，则只在首次执行

  return (
    <div className={`knowledge-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="knowledge-title flx-justify-between">
        <div>根目录</div>
        <Dropdown
          dropdownRender={() => (
            <div className="dropdown-box">
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
      <main className="knowledge-content">
        {/* 文件 */}
        {fileList && fileList.length > 0 ? (
          fileList.map((file) => (
            <KnowledgeItem
              key={file.id}
              file={file}
              onEdit={(file) => handleModal(file)}
              onMove={handleMove}
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
      <footer className="knowledge-footer">
        <MrPagination
          total={total}
          // showTotal={(total, range) =>
          //   `当前${range[0]}-${range[1]} / 共${total}页`
          // }
          showTotal={(total) => `共${total}条`}
          defaultPageSize={pageSize}
          defaultCurrent={1}
          pageNo={pageNo}
          pageSize={pageSize}
          onChange={(pageNo) => setPageNo(pageNo)}
        />
      </footer>
      {/* 弹框 -  */}
      <MrModal
        title={
          <div className="mr-modal-title-box">
            <img src={folderType === 1 ? knowledgeFile : knowledgeIcon} />
            <span>{`新建${folderType === 1 ? '文件夹' : '知识库'}`}</span>
          </div>
        }
        content={
          <div style={{ margin: '20px 0 25px 0' }}>
            <Input
              ref={inputFolderNameRef}
              placeholder={`${folderType === 1 ? '文件夹' : '知识库'}名称`}
              prefix={<span style={{ color: '#f64d28' }}>*</span>}
              suffix={<i className="iconfont mr-shuru" />}
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <div style={{ height: 15 }}></div>
            <Input
              placeholder={`这个${
                folderType === 1 ? '文件夹' : '知识库'
              }还没有介绍~`}
              suffix={<i className="iconfont mr-jishiben" />}
              allowClear
              value={folderDescription}
              onChange={(e) => setFolderDescription(e.target.value)}
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

export default Knowledge;
