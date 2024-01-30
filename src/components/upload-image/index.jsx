import React, { useState, useContext } from 'react';

import './index.scss';
import PropTypes from 'prop-types';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/utils/tools';
import { getNewToken } from '@/request/auth';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
// antd组件
import { message, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

const access_token = getAccessToken();

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function UploadImage({
  maxCount,
  maxNums,
  acceptedFileTypes,
  maxSize,
  shouldCrop,
  onUploadSuccess,
}) {
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
  const handleChange = async ({ file, fileList }) => {
    // 检查上传状态
    if (file.status === 'done') {
      console.log('图片上传完成');
      message.success(
        `${file.name.substring(0, 10)}${
          file.name.length > 10 ? '...' : ''
        } 上传成功`
      );

      // 调用回调函数,回传 fileList 给父组件
      onUploadSuccess(fileList);
    } else if (file.status === 'error') {
      //  token过期
      if (file.response.code === 401) {
        message.info(`服务器开小差了，刷新下试试`);
      } else {
        console.log('图片上传失败');
        message.error(
          `${file.name.substring(0, 10)}${
            file.name.length > 10 ? '...' : ''
          } 上传失败`
        );
      }
    }

    // 处理附件列表
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
  const beforeUpload = async (file) => {
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
    // 获取最新的访问令牌
    const latestAccessToken = await getAccessToken();
    setTimeout(() => {
      file.headers = {
        Authorization: `Bearer ${latestAccessToken}`,
      };
    }, 0);

    // 将最新的访问令牌添加到上传请求的头部中

    return isAcceptedFileType && isUnderMaxSize;
  };

  return (
    <>
      <div className={`upload-container ${darkMode ? 'dark-mode' : ''}`}>
        {shouldCrop ? (
          <ImgCrop
            rotationSlider
            modalTitle="裁剪图片"
            modalCancel="取消"
            modalOk="确定"
          >
            <Upload
              action="https://124.222.46.195/system/oss/upload"
              headers={{
                'User-Type': 'pc',
                Authorization: `Bearer ${access_token}`,
              }}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              maxCount={maxCount}
              beforeUpload={beforeUpload}
              progress={{
                strokeColor: {
                  '0%': '#5b42f3 ',
                  '100%': '#00ddeb',
                },
                // strokeWidth: 2,
                format: (percent) =>
                  percent && `${parseFloat(percent.toFixed(0))}%`,
              }}
              locale={{
                //自定义上传等待
                uploading: <span></span>,
              }}
            >
              {fileList.length >= maxNums ? null : uploadButton}
            </Upload>
          </ImgCrop>
        ) : (
          <Upload
            action="https://124.222.46.195/system/oss/upload"
            headers={{
              'User-Type': 'pc',
              Authorization: `Bearer ${access_token}`,
            }}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            maxCount={maxCount}
            beforeUpload={beforeUpload}
            progress={{
              strokeColor: {
                '0%': '#5b42f3 ',
                '100%': '#00ddeb',
              },
              // strokeWidth: 2,
              format: (percent) =>
                percent && `${parseFloat(percent.toFixed(0))}%`,
            }}
            locale={{
              //自定义上传等待
              uploading: <span></span>,
            }}
          >
            {fileList.length >= maxNums ? null : uploadButton}
          </Upload>
        )}
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
  shouldCrop: false, //是否开启裁剪
};
export default UploadImage;
