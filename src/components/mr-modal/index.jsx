import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const MrModal = ({ title, content, open, onOk, onCancel }) => {
  return (
    <>
      <Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
        {content}
      </Modal>
    </>
  );
};

export default MrModal;
