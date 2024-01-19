import React, { useState } from 'react';
import '../index.scss';

import MrModal from '@/components/mr-modal';
import MrPagination from '@/components/mr-pagination';
// 图片
import knowledgeChoose from '@/assets/images/choose.png';

// antd组件
import { Button, Radio, Space } from 'antd';

function Detail() {
  const [isActive, setIsActive] = useState(1);
  const [isOpen, setIsOpen] = useState(false); //弹框状态

  // 弹框确认
  const handleOk = () => {
    console.log(11121);
  };
  // 弹框确认
  const handleCancel = () => {
    setIsOpen(false);
  };
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setIsActive(e.target.value);
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

      <main></main>
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
                  <div className="knowledge-detail-radio-content">本地文件</div>
                </Radio>

                <Radio className="knowledge-detail-radio-item" value={2}>
                  网页链接
                </Radio>

                <Radio className="knowledge-detail-radio-item" value={3}>
                  自定义文本
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
