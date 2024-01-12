import React, { useState, useContext } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import './index.scss';
import PropTypes from 'prop-types';

import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
// antd组件
import { message } from 'antd';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function UploadImage({ maxCount, maxNums, acceptedFileTypes, maxSize }) {
  // maxCount-最大传几张  maxNums-控制上传按钮
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  // 共享参数
  const { darkMode } = useContext(DarkModeContext);

  const handleCancel = () => setPreviewOpen(false);

  // 预览逻辑
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };
  // 改变
  const handleChange = ({ fileList }) => {
    const filteredList = fileList.filter((f) => {
      return acceptedFileTypes.includes(f.type);
    });

    setFileList(filteredList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined style={{ color: darkMode ? '#ffffff' : '' }} />
      {/* <div style={{ marginTop: 8 }}>上传</div> */}
    </div>
  );

  // 上传前
  const beforeUpload = (file) => {
    // 过滤非允许上传的文件类型
    const isAcceptedFileType = acceptedFileTypes.includes(file.type);
    const isUnderMaxSize = file.size <= maxSize;
    // 类型
    if (!isAcceptedFileType) {
      message.error('只能上传 ' + acceptedFileTypes.join('、') + ' 类型的文件');
      return false;
    }
    // 超出大小
    if (!isUnderMaxSize) {
      message.error('文件大小不能超过 ' + maxSize / 1024 / 1024 + 'MB');
      return false;
    }

    return isAcceptedFileType && isUnderMaxSize;
  };

  return (
    <>
      <div className={`upload-container ${darkMode ? 'dark-mode' : ''}`}>
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-circle"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          maxCount={maxCount}
          beforeUpload={beforeUpload}
          style={{ display: 'none' }}
        >
          {fileList.length >= maxNums ? null : uploadButton}
        </Upload>
      </div>

      {/* 预览 */}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        accept={acceptedFileTypes.join(',')}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
}

UploadImage.propTypes = {
  maxCount: PropTypes.number,
  maxNums: PropTypes.number,
  acceptedFileTypes: PropTypes.arrayOf(PropTypes.string),
  maxSize: PropTypes.number,
};

// 默认值
UploadImage.defaultProps = {
  maxCount: 5,
  maxNums: 5,
  acceptedFileTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'video/mp4',
    'video/webm',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/pdf',
    'application/zip',
    'application/gzip',
    'application/x-tar',
  ],
  maxSize: 5 * 1024 * 1024, // 默认5MB
};
export default UploadImage;
