import React, { useRef, useState, useEffect } from 'react';
import '../../index.scss';
import './create.scss';
import ajax from '@/request';

import UploadImage from '@/components/upload-image';

// 图片
import Tips from '@/assets/images/tips.png';

// antd组件
import { Slider, Button, Tooltip, Input, Select } from 'antd';
const { TextArea } = Input;

function Create() {
  const [imageUrl, setImageUrl] = useState(''); //图片地址

  const formatter = (value) => `${value}%`; //发散参数
  // 模型选择
  const handleChangeModal = (value) => {
    console.log(`selected ${value}`);
  };

  // 上传成功后
  const handleUploadSuccess = (fileList) => {
    // let name = fileList[0].response.data.name;
    let url = fileList[0].response.data.link;
    console.log('🚀 ~ handleUploadSuccess ~ url:', url);
    setImageUrl(url);
  };

  return (
    <div className="create-container">
      <header>
        <div className="create-prompt-box">
          <div className="create-promp-box-header">
            <div className="flx-center">
              <i className="iconfont mr-mofabang"></i>
              <div className="font-family-dingding">提示词</div>
              <Tooltip
                title="与AI对话时，提供的指导性文本，它能帮助我们更好的进行交互。"
                arrow={false}
                color={'rgba(25, 25, 25, 0.8)'}
                placement="top"
              >
                <img src={Tips} style={{ height: 18, marginLeft: 3 }} />
              </Tooltip>
            </div>
          </div>
          <div>
            <TextArea
              className="remove-default-textarea"
              maxLength={1000}
              // onChange={onChange}
              placeholder="我想让你扮演一个小说家。您将想出富有创意且引人入胜的故事，可以长期吸引读者。你可以选择任何类型，如奇幻、浪漫、历史小说等——但你的目标是写出具有出色情节、引人入胜的人物和意想不到的高潮的作品。我的第一个要求是“我要写一部以未来为背景的科幻小说”。"
              autoSize={{ maxRows: 10 }}
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
          <div className="flx-justify-between">
            <div className="font-family-dingding">基础配置</div>
            <i
              className="iconfont mr-user--line"
              style={{ fontSize: 22, opacity: 0.5 }}
            ></i>
          </div>
          <div className="flx-align-center">
            <div className="create-base-title">角色头像：</div>
            <div className="create-base-upload">
              <UploadImage
                maxNums={1}
                acceptedFileTypes={['image/jpeg', 'image/png']}
                shouldCrop
                onUploadSuccess={handleUploadSuccess}
              />
            </div>
          </div>
          <div className="flx-align-center">
            <div className="create-base-title">角色名称：</div>
            <div className="create-base-input">
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
        </div>
        <div className="create-base-Info create-high-config">
          <div className="flx-justify-between">
            <div className="font-family-dingding">高级功能</div>
            <i
              className="iconfont mr-ziyuan49"
              style={{ fontSize: 18, opacity: 0.5 }}
            ></i>
          </div>
          <div className="create-high-explain">
            通过自定义AI模型，可以创建出更强大的角色。
          </div>
          <div className="flx-align-center">
            <Tooltip
              title="Divergence参数代表生成文本多样性，数值越大，发散程度越高，越不准确。"
              arrow={false}
              color={'rgba(25, 25, 25, 0.8)'}
              placement="topLeft"
            >
              <div className="create-base-title flx-center cursor-point">
                <img src={Tips} style={{ height: 16, marginRight: 3 }} />
                <div>发散值：</div>
              </div>
            </Tooltip>

            <div className="create-base-slider">
              <Slider
                defaultValue={30}
                tooltip={{
                  formatter,
                }}
              />
            </div>
          </div>
          <div className="flx-align-center">
            <Tooltip
              title="不同模型有不同的能力。"
              arrow={false}
              color={'rgba(25, 25, 25, 0.8)'}
              placement="topLeft"
            >
              <div className="create-base-title flx-center cursor-point">
                <img src={Tips} style={{ height: 16, marginRight: 3 }} />
                <div>模型选择：</div>
              </div>
            </Tooltip>

            <div className="create-base-slider">
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
          <div className="flx-align-center">
            <Tooltip
              title="提供给AI角色的模型库，AI通过知识库来提高回答的准确性。"
              arrow={false}
              color={'rgba(25, 25, 25, 0.8)'}
              placement="topLeft"
            >
              <div className="create-base-title flx-center cursor-point">
                <img src={Tips} style={{ height: 16, marginRight: 3 }} />
                <div>知识库：</div>
              </div>
            </Tooltip>

            <div className="create-base-slider">
              <Select
                defaultValue="知名网文小说家"
                onChange={handleChangeModal}
                options={[
                  {
                    value: '知名网文小说家',
                    label: '知名网文小说家',
                  },
                  {
                    value: '程序员',
                    label: '程序员',
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </main>

      <footer>
        <Button type="primary" style={{ width: '100%' }}>
          创建角色
        </Button>
      </footer>
    </div>
  );
}

export default Create;
