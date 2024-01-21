import React from 'react';
import './index.scss';

import UploadFile from '@/components/upload-file';
// antd组件
import { Button, Input } from 'antd';
const { TextArea } = Input;

function DetailImport({ toList, importWay, setImportWay }) {
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
            <UploadFile />
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
          <Button
            type="primary"
            onClick={() => {
              toList();
            }}
          >
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
