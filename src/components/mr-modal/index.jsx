import React from 'react';
import { Modal } from 'antd';
import './index.scss';

const MrModal = ({ title, content, open, onOk, onCancel, width }) => {
  return (
    <div className="modal-container-custom">
      <Modal
        title={title}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        okText={'确定'}
        cancelText={'取消'}
        width={width}
      >
        {content}
      </Modal>
    </div>
  );
};

export default MrModal;
