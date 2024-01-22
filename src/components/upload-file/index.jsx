import React, { useState, useEffect } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { getAccessToken } from '@/utils/tools';

import { message, Upload } from 'antd';

const { Dragger } = Upload;
const access_token = getAccessToken();

function UploadFile({ uploadFiles, setUploadFiles, accept }) {
  const uploadProp = {
    name: 'file',
    multiple: true,
    action: 'https://124.222.46.195/system/oss/upload',
    headers: {
      'User-Type': 'pc',
      Authorization: `Bearer ${access_token}`,
    },
    maxCount: 10, //最大上传个数
    accept, // 文件类型限制
    async onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 上传成功！`);

        // 存储上传成功文件信息
        setUploadFiles((prevFiles) => [...prevFiles, info.file]);
      } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    // 删除
    onRemove(file) {
      const index = uploadFiles.findIndex((f) => f.uid === file.uid);
      if (index !== -1) {
        const newFileList = [...uploadFiles];
        newFileList.splice(index, 1);
        setUploadFiles(newFileList);
      }
    },
  };

  return (
    <div className={`upload-file-container`}>
      <Dragger {...uploadProp}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
        <p className="ant-upload-hint">
          支持 {accept} 类型文件上传，且不超过5MB
        </p>
      </Dragger>
    </div>
  );
}
export default UploadFile;
