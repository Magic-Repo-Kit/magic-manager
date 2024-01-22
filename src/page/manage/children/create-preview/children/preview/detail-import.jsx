import React, { useState, useEffect } from 'react';
import './index.scss';
import ajax from '@/request';
import UploadFile from '@/components/upload-file';
// antd组件
import { Button, Input, message } from 'antd';
const { TextArea } = Input;

function DetailImport({ toList, importWay, setImportWay }) {
  const [uploadFiles, setUploadFiles] = useState([]);

  // 确认提交-本地上传
  const onConfirmUpload = async () => {
    const tempFiles = uploadFiles.map((item) => item.response.data);
    const files = tempFiles.map((item) => ({
      fileName: item.name,
      fileUrl: item.link,
    }));

    console.log('🚀 ~ files ~ files:', files);
    if (files.length === 0) {
      message.info('请先上传文件');
      return;
    }
    const id = new URLSearchParams(location.search).get('parentId');
    if (!id) {
      message.info('知识库不存在');
      return;
    }
    // 新增
    try {
      const res = await ajax.post('/chat/knowledge/process-batch', {
        files,
        id,
      });
      if (res.code === 200) {
        message.success('提交成功');
        toList();
      } else {
        message.error(res.msg || '提交失败');
      }
    } catch (error) {
      message.error(error.msg || '提交失败');
    }
  };

  return (
    <div className="knowledge-detail-list knowledge-detail-import">
      <div className="knowledge-detail-title">
        <Button
          onClick={() => {
            toList();
            setImportWay('localFile');
          }}
        >
          返回
        </Button>
      </div>
      <main>
        {importWay === 'localFile' ? (
          <div>
            <UploadFile
              accept=".txt,.pdf"
              uploadFiles={uploadFiles}
              setUploadFiles={setUploadFiles}
              // onFilesUploadSuccess={(files) => handleUploadSuccess(files)}
            />
          </div>
        ) : (
          <div className="knowledge-import-link">
            <TextArea
              showCount
              maxLength={500}
              // onChange={onChange}
              placeholder="请输入连接地址，如：jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf8&，用逗号隔开，每次最多10个链接。"
              style={{
                height: 185,
                // resize: 'none',
              }}
            />
          </div>
        )}
      </main>
      <footer>
        {importWay === 'localFile' ? (
          <Button type="primary" onClick={onConfirmUpload}>
            共 1 个文件｜确认提交
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              toList();
            }}
          >
            共 1 个链接｜确认提交
          </Button>
        )}
      </footer>
    </div>
  );
}

export default DetailImport;
