import React, { useState } from 'react';
import '../../index.scss';
import './preview.scss';
import ajax from '@/request';

// antd组件
import { Tooltip, Input, Select } from 'antd';
const { TextArea } = Input;

function Preview() {
  const [msgValue, setMsgValue] = useState(''); //发送消息
  const [isExtended, setIsExtended] = useState(false); // 扩展是否显示

  // 模型选择
  const handleChangeModal = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="preview-container">
      <header>
        <div className="flx-justify-between">
          <div className="font-family-dingding">调试与预览</div>
          <div>
            <Select
              defaultValue="GPT3.5"
              onChange={handleChangeModal}
              options={[
                {
                  value: 'GPT3.5',
                  label: 'GPT3.5',
                },
                {
                  value: 'GPT4.0',
                  label: 'GPT4.0',
                },
              ]}
            />
          </div>
        </div>
        <div className="preview-prompt-box">
          <div className="flx-align-center">
            <i className="iconfont mr-mofabang"></i>
            <div className="gradient-text-3">提示词预览</div>
          </div>
          <div className="preview-prompt-text">
            提示词是与人工智能（AI）对话系统进行交互时提供的指导性文本，它可以帮助我们更好地与AI进行交流。通过编写清晰、明确的提示词，我们能够准确表达自己的意图和问题，从而得到系统更精确的回答。Prompt
            的好坏直接影响到AI对话的效果和用户体验。
          </div>
        </div>
      </header>
      {/* 聊天 */}
      <main>
        <div className="preview-chat-main">
          <div>你好</div>
          <div>你好</div>
        </div>
      </main>

      <footer className="preview-container-footer">
        <div className="preview-text-send-container">
          {/* 输入 */}
          <div className="preview-text-area-box">
            <TextArea
              value={msgValue}
              className="remove-default-textarea"
              maxLength={1000}
              placeholder="Shift + Enter换行"
              onChange={(e) => setMsgValue(e.target.value)}
              autoSize={{ maxRows: 10 }}
              onFocus={() => setIsExtended(false)}
            />
            {msgValue ? (
              ''
            ) : (
              <div className="preview-footer-icon preview-footer-sound">
                <i className="iconfont mr-shengboyuyinxiaoxi"></i>
              </div>
            )}
          </div>
          {/* 添加 / 发送图标 */}

          <div
            className={`preview-footer-icon preview-footer-send click-jump `}
          >
            {msgValue ? (
              <i className="iconfont mr-gongzuo-jiantoufasonganniu"></i>
            ) : (
              <div
                className={`${isExtended ? 'add-rotate' : 'reverse-rotate'}`}
              >
                <i
                  className="iconfont mr-jia"
                  onClick={() => setIsExtended(!isExtended)}
                ></i>
              </div>
            )}
          </div>
        </div>
        {/* 展开功能 */}
        <div
          className={`preview-text-extend-container ${
            isExtended ? 'isExtended' : ''
          }`}
        >
          <div className="preview-text-extend-item flx-center">
            <div>
              <i className="iconfont mr-tupian1"></i>
            </div>
            <div>照片</div>
          </div>
          <div className="preview-text-extend-item flx-center">
            <div>
              <i
                className="iconfont mr-wenjianjia1"
                style={{ fontSize: 30 }}
              ></i>
            </div>
            <div>文件</div>
          </div>
          <div className="preview-text-extend-item flx-center">
            <div>
              <i
                className="iconfont mr-yuyinshuru1"
                style={{ fontSize: 28 }}
              ></i>
            </div>
            <div>语音输入</div>
          </div>
          <div className="preview-text-extend-item flx-center">
            <div>
              <i className="iconfont mr-paishe" style={{ fontSize: 28 }}></i>
            </div>
            <div>拍摄</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Preview;
