import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'; //渲染子路由

import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

import ajax from '@/request';
import UploadImage from '@/components/upload-image';

// 图片
import Tips from '@/assets/images/tips.png';
// antd组件
import { Breadcrumb, Button, Tooltip, Input } from 'antd';
const { TextArea } = Input;

function CreatePreview() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={`create-preview-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="create-container create-preview-item">
        <header>
          <div className="create-prompt-box">
            <div className="create-promp-box-header">
              <div className="flx-center">
                <i className="iconfont mr-mofabang"></i>
                <div>提示词</div>
                <Tooltip
                  title="与AI对话时，提供的指导性文本，它能帮助我们更好的进行交互。"
                  arrow={false}
                  color={'rgba(25, 25, 25, 0.8)'}
                  placement="rightBottom"
                >
                  <img src={Tips} style={{ height: 18, marginLeft: 3 }} />
                </Tooltip>
              </div>
            </div>
            <div>
              <TextArea
                showCount
                maxLength={500}
                // onChange={onChange}
                placeholder="测试数据"
                rows={10}
                style={{ border: 'none', outline: 'none' }}
              />
            </div>
            <div className="create-promp-box-footer">
              <Button type="primary" size="small">
                一键生成
              </Button>
            </div>
          </div>
          <div className="create-prompt-tips">
            在上方提示词框中输入任意内容，即可让AI辅助生成提示词
          </div>
        </header>
        <main>
          <div className="create-base-Info">
            <div className="flx-align-center">
              <div>角色头像：</div>
              <div>
                <UploadImage />
              </div>
            </div>
            <div className="flx-align-center">
              <div>角色名称：</div>

              <Input
                placeholder={`请输入角色名称`}

                // value={folderForm.name}
                // onChange={(e) =>
                //   setFolderForm((prevForm) => ({
                //     ...prevForm,
                //     name: e.target.value,
                //   }))
                // }
              />
            </div>
          </div>
          <div className="create-high-Info">
            <div>高级功能</div>
            <div>发散能力</div>
            <div>模型选择</div>
            <div>知识库</div>
            <div>预设对话</div>
          </div>
        </main>

        <footer>创建角色</footer>
      </div>
      <div className="preview-container create-preview-item">232323</div>
    </div>
  );
}

export default CreatePreview;
