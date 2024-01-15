import React, { useState } from 'react';
import './index.scss';

// 图片
import knowledgeFile from '@/assets/images/file.png';
import knowledgeIcon from '@/assets/images/knowledge-icon.png';

// antd组件
import { Button, Dropdown } from 'antd';

// item内容
function KnowledgeItem({ file, onEdit, onMove, onDelete }) {
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
                    onClick={onEdit}
                  >
                    编 辑
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
                    onClick={onMove}
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
                    onClick={onDelete}
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
        {file.description ||
          `这个${file.type === 1 ? '文件夹' : '知识库'}还没有介绍~`}
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
}

export default KnowledgeItem;
