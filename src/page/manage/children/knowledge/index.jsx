import React, { useContext, useState, useEffect } from 'react';
import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import ajax from '@/request';

import MrPagination from '@/components/mr-pagination';
import MrModal from '@/components/mr-modal';

// 图片
import knowledgeFile from '@/assets/images/file.png';
import knowledgeIcon from '@/assets/images/knowledge-icon.png';

// antd组件
import { Button, Dropdown, Empty } from 'antd';

// 单个文件夹
const KnowledgeItem = ({ file }) => {
  const [dropdownEditOpen, setDropdownEditOpen] = useState(false);
  return (
    <div key={file.id} className="knowledge-content-item">
      <div className="knowledge-item-header">
        <div className="flx-center">
          <img
            src={file.type === 1 ? knowledgeFile : file.image || knowledgeIcon}
          />
          <span>{file.name}</span>
        </div>
        <div>
          <Dropdown
            dropdownRender={() => (
              <div className="dropdown-box">
                <div>
                  <Button
                    icon={
                      <>
                        <i className="iconfont mr-change-1"></i>
                      </>
                    }
                    type="text"
                    className="title-dropdown-btn"
                  >
                    重命名
                  </Button>
                </div>
                <div>
                  <Button
                    icon={
                      <>
                        <i className="iconfont mr-yidongxuanze"></i>
                      </>
                    }
                    type="text"
                    className="title-dropdown-btn"
                  >
                    移 动
                  </Button>
                </div>
                <div>
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
            <i className="iconfont mr-more-2"></i>
          </Dropdown>
        </div>
      </div>
      <div className="knowledge-item-content single-omit">
        {file.description}
      </div>
      <div className="knowledge-item-footer">
        <div></div>
        <div className="flx-center">
          <i
            className={`iconfont ${
              file.type === 1 ? 'mr-wenjianjia' : 'mr-zhishidian-01-01'
            }`}
          ></i>
          <span>{file.type === 1 ? '文件夹' : '知识库'}</span>
        </div>
      </div>
    </div>
  );
};

function Knowledge() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);

  const [dropdownAddOpen, setDropdownAddOpen] = useState(false); //新建下拉
  const [fileList, setFileList] = useState([]);

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // 弹框确认
  const handleOk = () => {
    setIsOpen(false);
  };
  // 弹框取消
  const handleCancel = () => {
    setIsOpen(false);
  };
  // 添加文件夹
  const handleAddFile = () => {
    setIsOpen(true);
  };
  // 添加知识库

  useEffect(() => {
    // 获取文件夹列表分页
    const params = {
      pageNo,
      pageSize,
      // keywords: '史', //搜索框
      // parentId:'',
    };
    const getFileList = async () => {
      try {
        const res = await ajax.get('/chat/knowledge/list-page', params);
        if (res.code === 200) {
          setFileList(res.data.list);
          setTotal(res.data.total);
        }
      } catch (error) {
        message.error(error.msg || '获取数据失败');
      }
    };
    getFileList();
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
                  onClick={handleAddFile}
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
          fileList.map((file) => <KnowledgeItem key={file.id} file={file} />)
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
          showTotal={(total, range) =>
            `当前${range[0]}-${range[1]} / 共${total}页`
          }
          defaultPageSize={pageSize}
          defaultCurrent={1}
          pageNo={pageNo}
          pageSize={pageSize}
          onChange={(pageNo) => setPageNo(pageNo)}
        />
      </footer>
      {/* 弹框 -  */}
      <MrModal
        title="添加文件夹"
        content={
          <>
            <p>Some contents...</p>
          </>
        }
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default Knowledge;
