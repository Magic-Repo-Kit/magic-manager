import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { useLocation, useNavigate } from 'react-router-dom'; //渲染子路由

import ajax from '@/request';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式
import Create from './children/create';
import Preview from './children/preview';

// antd组件
import { Button, message } from 'antd';

function CreatePreview() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const [isChange, setIsChange] = useState(false);
  const [modelList, setModelList] = useState(''); //模型名称
  const [SelectedModel, setSelectedModel] = useState({
    value: 'mrk-3.5-turbo',
    label: 'mrk-3.5-turbo',
  }); //选中的模型

  const [createParams, setCreateParams] = useState({
    prompt: '', //提示词
    imageUrl: '', //头像
    name: '', //角色名称
    temperature: 0.7, //发散能力(0~2)
    modelName: 'mrk-3.5-turbo', //使用模型
    isShowKnowledge: 1, //是否展现知识库[1:关闭(默认) 2:开启]
    knowledgeId: '', //知识库id
    messages: [], //聊天记录
    isOnline: 1, //是否联网[1:关闭(默认) 2:开启]
  });

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

  // Create选中的模型
  const handleModelChoose = (model) => {
    setSelectedModel(model);
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
          <Create
            modelList={modelList}
            getModelList={getModelList}
            onModelChoose={handleModelChoose}
          />
        </div>
        <div className="preview-container-box create-preview-item">
          <Preview modelList={modelList} selectedModel={SelectedModel} />
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
            <Preview modelList={modelList} selectedModel={SelectedModel} />
          </div>
        ) : (
          <div className="create-preview-item">
            <Create modelList={modelList} onModelChoose={handleModelChoose} />
          </div>
        )}

        {/* 移动端 */}
      </div>
    </>
  );
}

export default CreatePreview;
