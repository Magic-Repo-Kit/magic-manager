import React, { useRef, useState, useEffect } from 'react';
import '../../index.scss';
import './create.scss';
import ajax from '@/request';

import UploadImage from '@/components/upload-image';
import MrModal from '@/components/mr-modal';
// 图片
import Tips from '@/assets/images/tips.png';

// antd组件
import {
  Slider,
  Button,
  Tooltip,
  Input,
  Select,
  Switch,
  message,
  Empty,
  Modal,
} from 'antd';
const { TextArea } = Input;

function Create({ modelList }) {
  // 拿到modelList值
  const options = modelList
    ? modelList.map((model) => ({
        value: model.modelName,
        label: model.modelDesc,
      }))
    : [];

  const [prompt, setPrompt] = useState(''); //提示词
  const [imageUrl, setImageUrl] = useState(''); //图片地址
  const [name, setName] = useState(''); //角色名称

  const [temperature, setTemperature] = useState(0.7); //发散参数(0~2)
  const [modelName, setModelName] = useState('mrk-3.5-turbo'); //模型名称
  const [isShowKnowledge, setIsShowKnowledge] = useState(1); //是否展现知识库[1:关闭(默认) 2:开启]
  const [knowledgeId, setKnowledgeId] = useState(''); //知识库id
  const [conversationStarters, setConversationStarters] = useState([]); //预设对话
  const [isOpen, setIsOpen] = useState(false); //对话弹框

  const formatter = (value) => `${value}%`; //发散参数
  // 模型选择
  const handleChangeModal = (value) => {
    setModelName(value);
  };
  // 知识库选择
  const handleChangeKnowledge = (value) => {
    console.log(`selected ${value}`);
  };

  // 图片上传成功后
  const handleUploadSuccess = (fileList) => {
    let url = fileList[0].response.data.link;
    setImageUrl(url);
  };

  // 弹框 - 确定
  const handleOk = () => {
    setIsOpen(false);
    console.log('确定');
  };

  // 弹框 - 取消
  const handleCancel = () => {
    setIsOpen(false);
    console.log('取消');
  };

  // 提交 - 创建角色
  const handleCreateRole = async () => {
    if (!prompt) {
      message.info('请输入提示词');
      return;
    }
    if (!name) {
      message.info('请输入角色名称');
      return;
    }
    if (!modelName) {
      message.info('请选择AI模型');
      return;
    }
    if (isShowKnowledge === 2) {
      if (!knowledgeId) {
        message.info('请选择知识库');
        return;
      }
    }
    const params = {
      conversationStarters,
      imageUrl,
      isShowKnowledge,
      knowledgeId,
      modelName,
      name,
      prompt,
      temperature,
    };
    try {
      const res = await ajax.post(`/chat/role/create`, params);
      if (res.code === 200) {
        console.log('🚀 ~ handleCreateRole ~ res:', res);
        message.success('提交成功');

        // 恢复原值
      }
    } catch (error) {
      message.error(error.message || '提交失败');
    } finally {
      console.log(11);
    }
  };

  useEffect(() => {
    console.log(temperature);
  }, [temperature]);

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
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              title="发散参数代表AI思维发散能力，数值越小，越准确；数值越大，越模糊。"
              arrow={false}
              color={'rgba(25, 25, 25, 0.8)'}
              placement="topLeft"
            >
              <div className="create-base-title flx-center cursor-point">
                <img src={Tips} style={{ height: 16, marginRight: 3 }} />
                <div>发散参数：</div>
              </div>
            </Tooltip>

            <div className="create-base-slider">
              <Slider
                defaultValue={35}
                tooltip={{
                  formatter,
                }}
                onChange={(value) => setTemperature(value / 50)}
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
                <div>AI模型：</div>
              </div>
            </Tooltip>

            <div className="create-hight-select">
              {/* AI模型 */}
              <Select
                style={{ width: '100%' }}
                defaultValue="mrk-3.5-turbo"
                onChange={handleChangeModal}
                options={options}
              />
            </div>
          </div>
          <div className="flx-align-center">
            <Tooltip
              title="关闭知识库后，将无法使用知识库中的内容。"
              arrow={false}
              color={'rgba(25, 25, 25, 0.8)'}
              placement="topLeft"
            >
              <div className="create-base-title flx-center cursor-point">
                <img src={Tips} style={{ height: 16, marginRight: 3 }} />
                <div>是否启用知识库：</div>
              </div>
            </Tooltip>

            <div className="create-hight-select">
              <Switch
                checked={isShowKnowledge === 2}
                onChange={(checked) => setIsShowKnowledge(checked ? 2 : 1)}
                checkedChildren="开启"
                unCheckedChildren="关闭"
              />
            </div>
          </div>
          {isShowKnowledge === 2 && (
            <div className="flx-align-center">
              <Tooltip
                title="提供给AI角色的模型库，AI通过知识库的学习来提高回答的准确性。"
                arrow={false}
                color={'rgba(25, 25, 25, 0.8)'}
                placement="topLeft"
              >
                <div className="create-base-title flx-center cursor-point">
                  <img src={Tips} style={{ height: 16, marginRight: 3 }} />
                  <div>知识库：</div>
                </div>
              </Tooltip>
              <div className="create-hight-select">
                {/* 知识库 */}
                <Select
                  style={{ width: '100%' }}
                  defaultValue=""
                  onChange={handleChangeKnowledge}
                  options={[
                    { value: '', label: '请选择', disabled: true },
                    {
                      value: '2',
                      label: '知识库1知识库1知识库1知识库1知识库1知识库1',
                    },
                    {
                      value: '1',
                      label: '知识库1',
                    },
                  ]}
                />
              </div>
            </div>
          )}
          <div className="flx-align-center">
            <Tooltip
              title="通过与AI对话的方式，让AI自我学习，帮助AI完善角色模型，可以训练出更智能、更稳定的专属角色。"
              arrow={false}
              color={'rgba(25, 25, 25, 0.8)'}
              placement="topLeft"
            >
              <div className="create-base-title flx-center cursor-point">
                <img src={Tips} style={{ height: 16, marginRight: 3 }} />
                <div>预设对话：</div>
              </div>
            </Tooltip>

            <div className="create-hight-select">
              <Button
                type="primary"
                size="small"
                onClick={() => setIsOpen(true)}
              >
                自定义
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <Button
          type="primary"
          style={{ width: '100%' }}
          onClick={handleCreateRole}
        >
          创建角色
        </Button>
        {/* 预设对话 */}
        <Modal
          title={
            <div className="flx-align-center">
              <i
                className="iconfont mr-icon_AI gradient-text-3"
                style={{ fontSize: 25, marginRight: 8 }}
              ></i>
              <span>预设对话</span>
            </div>
          }
          footer={
            <div className="create-container-modal-footer">
              <Button key="save" type="primary" style={{ width: '100%' }}>
                添 加
              </Button>
            </div>
          }
          open={isOpen}
          onCancel={handleCancel}
          width={800}
        >
          <div className="create-container-modal-box">
            <div className="create-modal-chat-list">
              {/* 无数据 */}
              <div className="knowledge-move-empty">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={<span>没有聊天记录，快去试试吧！</span>}
                />
              </div>
            </div>

            <div className="create-modal-chat create-modal-user-chat">
              <div className="create-modal-chat-header font-family-dingding  flx-align-center">
                <i className="iconfont mr-ic_user1 gradient-text-3"></i>
                <div>YOU</div>
              </div>
              <div className="create-modal-chat-body">
                <TextArea
                  className="remove-default-textarea"
                  maxLength={1000}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="预设 - 输入对话内容"
                  autoSize={{ maxRows: 5 }}
                />
              </div>
            </div>
            <div className="create-modal-chat create-modal-bot-chat">
              <div className="create-modal-chat-header flx-justify-between">
                <div className="flx-align-center font-family-dingding">
                  <i className="iconfont mr-aiqfome gradient-text-3"></i>
                  <div>AI</div>
                </div>
                <div>
                  <Button type="primary" size="small">
                    一键生成
                  </Button>
                </div>
              </div>
              <div className="create-modal-chat-body">
                <TextArea
                  className="remove-default-textarea"
                  maxLength={1000}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="预设 - 模拟AI回复"
                  autoSize={{ maxRows: 5 }}
                />
              </div>
            </div>
          </div>
        </Modal>
      </footer>
    </div>
  );
}

export default Create;
