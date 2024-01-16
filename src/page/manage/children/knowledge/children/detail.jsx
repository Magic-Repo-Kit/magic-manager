import React, { useState } from 'react';
import '../index.scss';

// 图片
import knowledgeFile from '@/assets/images/file.png';
import knowledgeIcon from '@/assets/images/knowledge-icon.png';
// antd组件
import { message, Button, Dropdown, Empty, Input } from 'antd';

function Detail() {
  const [dropdownAddOpen, setDropdownAddOpen] = useState(false); //新建下拉状态
  return (
    <div className="knowledge-detail">
      <div className="knowledge-detail-title">
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
                    // handleModal({}, 1);
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
                    // handleModal({}, 2);
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
    </div>
  );
}

export default Detail;
