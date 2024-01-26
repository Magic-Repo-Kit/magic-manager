import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { useLocation, useNavigate } from 'react-router-dom'; //渲染子路由

import ajax from '@/request';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import Create from './children/create';
import Preview from './children/preview';

// antd组件
import { Button } from 'antd';

function CreatePreview() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const [isChange, setIsChange] = useState(false);
  const [modelList, setModelList] = useState(''); //模型名称

  // 获取模型列表type[空:全部,1:文本,2:向量,3:图像,4:文本审核]
  const getModelList = async () => {
    try {
      const res = await ajax.get(`/chat/model/list?type=1`);
      if (res.code === 200) {
        if (res.data) {
          // console.log('🚀 ~ getModelList ~ res.data:', res.data);
          setModelList(res.data);
        }
      }
    } catch (error) {
      console.log('🚀 ~ getFileList ~ error:', error || '获取模型列表失败');
    }
  };

  useEffect(() => {
    getModelList();
  }, []);

  return (
    <>
      {/* PC端 */}
      <div
        className={`create-preview-container create-preview-pc ${
          darkMode ? 'dark-mode' : ''
        }`}
      >
        <div className="create-preview-item">
          <Create modelList={modelList} getModelList={getModelList} />
        </div>
        <div className="preview-container-box create-preview-item">
          <Preview modelList={modelList} />
        </div>
      </div>
      {/* 移动端 */}
      <div
        className={`create-preview-container create-preview-app ${
          darkMode ? 'dark-mode' : ''
        }`}
      >
        <div className="create-preview-change-icon flx-center">
          <Button
            type="primary"
            size="small"
            onClick={() => setIsChange(!isChange)}
          >
            切换{isChange ? '创建' : '预览'}
          </Button>
        </div>
        {/* 创建/预览 */}
        {isChange ? (
          <div className="preview-container-box create-preview-item">
            <Preview modelList={modelList} />
          </div>
        ) : (
          <div className="create-preview-item">
            <Create modelList={modelList} />
          </div>
        )}

        {/* 移动端 */}
      </div>
    </>
  );
}

export default CreatePreview;
