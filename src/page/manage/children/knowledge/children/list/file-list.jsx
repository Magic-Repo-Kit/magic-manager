import React, { useState, useContext } from 'react';
import '../../index.scss';
import { useNavigate } from 'react-router-dom';

// 图片
import knowledgeFile from '@/assets/images/file.png';
import knowledgeIcon from '@/assets/images/knowledge-icon.png';

import { IntlContext } from '@/components/IntlProvider'; // 国际化

// antd组件
import { Button, Dropdown, Popconfirm } from 'antd';

// item内容
function FileItem({ file, onEdit, onMove, onDelete, setParams }) {
  // 共享参数
  const { currentIntl } = useContext(IntlContext);

  const [dropdownEditOpen, setDropdownEditOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    // 每次点击文件，pageNo要重新置为1
    setParams((prev) => ({
      ...prev,
      pageNo: 1,
    }));
    // type 1-文件 2-知识库
    if (file.type === 1) {
      // 在当前URL基础上添加或替换parentId参数
      navigate(`?parentId=${file.id || ''}`);
    } else {
      const newPath = window.location.pathname.replace(/\/[^/]*$/, '/detail');
      navigate(`${newPath}?parentId=${file.id || ''}`);
    }
  };
  return (
    <div
      key={file.id}
      className="knowledge-content-item user-select"
      onClick={handleClick}
    >
      <div className="knowledge-item-header">
        <div className="flx-center">
          <img
            src={file.type === 1 ? knowledgeFile : file.image || knowledgeIcon}
          />
          <span className="single-omit">{file.name}</span>
        </div>
        <div
          className="knowledge-item-header-edit"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
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
                    {currentIntl.formatMessage({ id: 'knowledge.edit' })}
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
                    onClick={() => {
                      setDropdownEditOpen(false);
                      onMove(file);
                    }}
                  >
                    {currentIntl.formatMessage({ id: 'knowledge.move' })}
                  </Button>
                </div>
                <div>
                  <Button
                    icon={
                      <>
                        <i className="iconfont mr-daochu"></i>
                      </>
                    }
                    type="text"
                    className="title-dropdown-btn"
                    onClick={() => {
                      setDropdownEditOpen(false);
                      // onDelete(file);
                    }}
                  >
                    {currentIntl.formatMessage({ id: 'knowledge.export' })}
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
                      {currentIntl.formatMessage({ id: 'knowledge.delete' })}
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
            <i className="iconfont mr-more-2"></i>
          </Dropdown>
        </div>
      </div>
      <div className="knowledge-item-content single-omit">
        {file.description ||
          `这个${
            file.type === 1
              ? currentIntl.formatMessage({ id: 'knowledge.folder' })
              : currentIntl.formatMessage({ id: 'knowledge.file' })
          }还没有介绍~`}
      </div>
      <div className="knowledge-item-footer">
        <div></div>
        <div className="flx-center">
          <span>
            {file.type === 1
              ? currentIntl.formatMessage({ id: 'knowledge.folder' })
              : currentIntl.formatMessage({ id: 'knowledge.file' })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FileItem;
