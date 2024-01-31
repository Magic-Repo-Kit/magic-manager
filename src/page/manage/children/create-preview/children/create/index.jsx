import React, { useRef, useState, useEffect } from 'react';
import '../../index.scss';
import './create.scss';
import ajax from '@/request';
import { useNavigate } from 'react-router-dom';

import UploadImage from '@/components/upload-image';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// 图片
import Tips from '@/assets/images/tips.png';
import userHead from '@/assets/images/user-head.png';
import botHead from '@/assets/images/bot-head.png';

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
  Cascader,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
const { TextArea } = Input;

function Create({
  createParams,
  setCreateParams,
  modelList,
  messages,
  setMessages,
}) {
  const navigate = useNavigate(); //路由

  // 拿到modelList值
  const options = modelList
    ? modelList.map((model) => ({
        value: model.modelName,
        label: model.modelDesc,
      }))
    : [];

  const [knowledgeOptions, setKnowledgeOptions] = useState([]); //知识库可选项数据源
  const [isPresetOpen, setIsPresetOpen] = useState(false); //对话弹框

  const formatterTemperature = (value) => `${value}%`; //发散能力格式化

  const [msgUser, setMsgUser] = useState(''); //预设 - 输入消息
  const [msgBot, setMsgBot] = useState(''); //预设 - 输出消息
  const [isEditedMsg, setIsEditedMsg] = useState(false); //预设 - 是否编辑历史消息
  const chatMsgRef = useRef(null);
  const inputUserRef = useRef(null);
  const inputBotRef = useRef(null);

  //知识库文件列表筛选
  const [listParams, setListParams] = useState({
    pageNo: 1,
    pageSize: 20,
    keywords: '',
    parentId: '0', //空-目录
  });

  // 获取根目录知识库列表
  const getKnowledgeListRoot = async (parentId) => {
    try {
      const res = await ajax.get('/chat/knowledge/list-page', {
        ...listParams,
        parentId,
      });
      if (res.code === 200) {
        if (res.data) {
          const tempOptions = res.data.list.map((item) => ({
            value: item.id,
            label: item.name,
            isLeaf: item.type === 2, // 如果该项有子级选项，isLeaf 为 false
          }));
          setKnowledgeOptions(tempOptions);
        }
      }
    } catch (error) {
      console.log(
        '🚀 ~ getKnowledgeListRoot ~ error:',
        error || '获取文件列表失败'
      );
    }
  };
  // 获取知识库列表
  const getKnowledgeList = async (parentId) => {
    try {
      const res = await ajax.get('/chat/knowledge/list-page', {
        ...listParams,
        parentId,
      });
      if (res.code === 200) {
        if (res.data) {
          if (res.data.list.length === 0) {
            return [
              { value: '', label: '暂无子项', isLeaf: true, disabled: true },
            ]; // 返回一个空数组表示空元素/禁用
          }
          const tempOptions = res.data.list.map((item) => ({
            value: item.id,
            label: item.name,
            isLeaf: item.type === 2, // 如果该项有子级选项，isLeaf 为 false
          }));
          return tempOptions;
        }
      }
    } catch (error) {
      console.log(
        '🚀 ~ getKnowledgeList ~ error:',
        error || '获取知识库列表失败'
      );
    }
    return [];
  };
  // 知识库-动态加载选项
  const handleKnowledgeLoadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const parentId = targetOption.value; //点击的option的value

    getKnowledgeList(parentId).then((children) => {
      targetOption.children = children;
      setKnowledgeOptions([...knowledgeOptions]);
    });
  };
  // 知识库选择
  const handleKnowledgeChange = (value, selectedOptions) => {
    const selectedValue = selectedOptions[selectedOptions.length - 1].value;
    const isLeaf = selectedOptions[selectedOptions.length - 1].isLeaf;

    if (!isLeaf) {
      // 如果选择的不是叶子节点
      // setKnowledgeOptions([]);
    } else {
      setCreateParams((prevParams) => ({
        ...prevParams,
        knowledgeId: selectedValue,
      }));
    }
  };

  // 图片上传成功后
  const handleUploadSuccess = (fileList) => {
    let url = fileList[0].response.data.link;
    // setImageUrl(url);
    setCreateParams((prevParams) => ({
      ...prevParams,
      imageUrl: 'http://' + url,
    }));
  };

  // 模型选择
  const handleChangeModal = (value) => {
    setCreateParams((prevParams) => ({
      ...prevParams,
      modelName: value,
    }));
  };

  // 弹框 - 预设对话 - 添加对话
  const handleAddChatPreset = () => {
    if (!msgUser) {
      message.info('请先输入预设对话内容');
      return;
    }
    if (!msgBot) {
      message.info('请输入预设对话回复');
      return;
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: msgUser, type: 1 },
      { message: msgBot, type: 2 },
    ]);
    setMsgUser('');
    setMsgBot('');
    setIsEditedMsg(false);
    scrollToBottom();
  };
  // 弹框 - 预设对话 - 取消
  const handlePresetCancel = () => {
    setIsPresetOpen(false);
    setIsEditedMsg(false);
  };
  // 弹框 - 编辑对话
  const handleEditItemPreset = (index, newMessage) => {
    const newMessages = [...messages];
    newMessages[index].message = newMessage;
    setMessages(newMessages);
  };
  // 删除item
  const handleDeleteItem = (index) => {
    // 执行删除操作，更新 messages 数组
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
  };
  // 触发快捷键
  const handleUserBotKeyDown = (e, isUser) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const nextRef = isUser ? inputBotRef : inputUserRef;
      nextRef.current.focus(); // 自动聚焦到另一个输入框
    } else if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      handleAddChatPreset(); // 发送消息的逻辑
      inputUserRef.current.focus(); // 自动聚焦到用户输入框
    }
  };
  // AI 一键回复
  // const handleSendBot = () => {
  //   console.log(111);
  // };

  // 提交 - 创建角色
  const handleCreateRole = async () => {
    if (!createParams.prompt) {
      message.info('请输入提示词');
      return;
    }
    if (!createParams.name) {
      message.info('请输入角色名称');
      return;
    }
    if (!createParams.modelName) {
      message.info('请选择AI模型');
      return;
    }
    if (createParams.isShowKnowledge === 2) {
      if (!createParams.knowledgeId) {
        message.info('请选择知识库');
        return;
      }
    }

    const params = {
      ...createParams,
      knowledgeId:
        createParams.isShowKnowledge === 1 ? '' : createParams.knowledgeId,
      conversationStarters: messages
        .filter((item) => item.type === 1)
        .map((item) => item.message), //预设对话
    };
    console.log('🚀 ~ handleCreateRole ~ params:', params);
    try {
      const res = await ajax.post(`/chat/role/create`, params);
      if (res.code === 200) {
        console.log('🚀 ~ handleCreateRole ~ res:', res);
        message.success('提交成功');

        // 恢复原值
        setCreateParams({
          prompt: '', //提示词
          imageUrl: createParams.imageUrl, //头像
          name: '', //角色名称
          temperature: '0.7', //发散能力(0~2)
          modelName: 'mrk-3.5-turbo', //使用模型
          isShowKnowledge: 1, //是否展现知识库[1:关闭(默认) 2:开启]
          knowledgeId: '', //知识库id
        });
        setMessages([]);
      }
    } catch (error) {
      message.error(error.message || '提交失败');
    } finally {
      // 跳转路由-聊天页面
      navigate('/admin/manage/chat');
    }
  };

  // 自动滚动到底部
  const scrollToBottom = () => {
    chatMsgRef.current.scrollTop = chatMsgRef.current.scrollHeight;
  };

  useEffect(() => {
    // 获取根目录知识库列表
    getKnowledgeListRoot();
  }, []);

  useEffect(() => {
    if (isPresetOpen) {
      setTimeout(() => {
        inputUserRef.current.focus(); // 自动聚焦到用户输入框
      }, 0);
    }
  }, [isPresetOpen]);
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
              maxLength={10000}
              value={createParams.prompt}
              onChange={(e) =>
                setCreateParams((prevParams) => ({
                  ...prevParams,
                  prompt: e.target.value,
                }))
              }
              placeholder="我想让你扮演一个小说家。您将想出富有创意且引人入胜的故事，可以长期吸引读者。你可以选择任何类型，如奇幻、浪漫、历史小说等——但你的目标是写出具有出色情节、引人入胜的人物和意想不到的高潮的作品。我的第一个要求是“我要写一部以未来为背景的科幻小说”。"
              autoSize={{ maxRows: 10 }}
            />
          </div>
          <div className="create-promp-box-footer">
            <Button
              type="primary"
              size="small"
              disabled={createParams.prompt.trim() === ''}
            >
              AI一键生成
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
                value={createParams.name}
                onChange={(e) =>
                  setCreateParams((prevParams) => ({
                    ...prevParams,
                    name: e.target.value,
                  }))
                }
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
              title="发散能力代表AI思维发散程度，数值越大，生成的文本越多样。"
              arrow={false}
              color={'rgba(25, 25, 25, 0.8)'}
              placement="topLeft"
            >
              <div className="create-base-title flx-center cursor-point">
                <img src={Tips} style={{ height: 16, marginRight: 3 }} />
                <div>发散能力：</div>
              </div>
            </Tooltip>

            <div className="create-base-slider">
              <Slider
                defaultValue={35}
                tooltip={{
                  formatterTemperature,
                }}
                onChange={(value) =>
                  setCreateParams((prevParams) => ({
                    ...prevParams,
                    temperature: `${value / 50}`,
                  }))
                }
              />
            </div>
          </div>
          <div className="flx-align-center">
            <Tooltip
              title="选中模型后，可在预览窗口进行调试，不同的模型具有不同的能力。"
              arrow={false}
              color={'rgba(25, 25, 25, 0.8)'}
              placement="topLeft"
            >
              <div className="create-base-title flx-center cursor-point">
                <img src={Tips} style={{ height: 16, marginRight: 3 }} />
                <div>使用模型：</div>
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
                <div>是否开启知识库训练：</div>
              </div>
            </Tooltip>

            <div className="create-hight-select">
              <Switch
                checked={createParams.isShowKnowledge === 2}
                onChange={(checked) =>
                  setCreateParams((prevParams) => ({
                    ...prevParams,
                    isShowKnowledge: checked ? 2 : 1,
                    knowledgeId: checked ? prevParams.knowledgeId : '', // 当开关关闭时，将knowledgeId置空
                  }))
                }
                checkedChildren="开启"
                unCheckedChildren="关闭"
              />
            </div>
          </div>
          {createParams.isShowKnowledge === 2 && (
            <div className="flx-align-center">
              <Tooltip
                title="知识库是AI的辅助大脑，通过知识库的学习，可以提高角色的能力、准确性。"
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
                <Cascader
                  style={{ width: '100%' }}
                  placeholder="请选择"
                  options={knowledgeOptions}
                  loadData={handleKnowledgeLoadData}
                  onChange={handleKnowledgeChange}
                  changeOnSelect
                  allowClear={false}
                />
              </div>
            </div>
          )}
          <div className="flx-align-center">
            <Tooltip
              title="上传对话记录，并帮助AI修正回复，能够让AI自我反省，从而训练出更智能、更稳定的角色模型。"
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
                onClick={() => setIsPresetOpen(true)}
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
      </footer>

      {/* 弹框 - 预设对话 */}
      <Modal
        title={
          <div className="flx-align-center">
            <i
              className="iconfont mr-icon_AI gradient-text-3"
              style={{ fontSize: 25, marginRight: 8 }}
            ></i>
            <span>自定义对话</span>
          </div>
        }
        footer={
          <div className="create-container-modal-footer">
            <div className="create-container-modal-footer-tips">
              Tab键可快速切换输入，Shift + Enter可快速添加对话，快来试试！
            </div>
            <Button
              key="save"
              type="primary"
              style={{ width: '100%' }}
              onClick={handleAddChatPreset}
            >
              添加对话
            </Button>
          </div>
        }
        open={isPresetOpen}
        onCancel={handlePresetCancel}
        width={800}
      >
        <div className="create-container-modal-box">
          <div
            className={`create-modal-chat-list  ${
              messages && messages.length > 0 ? '' : 'flx-center'
            }`}
          >
            {messages && messages.length > 0 ? (
              <div>
                <div className="create-modal-chat-history-edit bg-filter-transparent shadow-bottom">
                  {isEditedMsg ? (
                    <i
                      className="iconfont mr-queren"
                      onClick={() => setIsEditedMsg(false)}
                    ></i>
                  ) : (
                    <i
                      className="iconfont mr-change-1"
                      onClick={() => setIsEditedMsg(true)}
                    ></i>
                  )}
                </div>
                <div className="create-modal-chat-history" ref={chatMsgRef}>
                  {messages.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={item.type === 1 ? 'user-msg' : 'bot-msg'}
                      >
                        {/* 头像-bot */}
                        {item.type === 1 ? (
                          <img className="user-head" src={userHead} />
                        ) : (
                          <img
                            className="bot-head"
                            src={createParams.imageUrl || botHead}
                          />
                        )}
                        {/* 聊天内容 */}
                        {isEditedMsg ? (
                          <div className="msg-item-edit user-select">
                            <TextArea
                              maxLength={50000}
                              value={item.message}
                              onChange={(e) => {
                                handleEditItemPreset(index, e.target.value);
                              }}
                              placeholder="预设 - 输入对话内容"
                              autoSize
                            />
                            <div
                              className="msg-item-del"
                              onClick={() => handleDeleteItem(index)}
                            >
                              <DeleteOutlined />
                            </div>
                          </div>
                        ) : (
                          <div className="msg-item">
                            <MarkdownRenderer markdown={item.message} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // 无数据
              <div className="knowledge-move-empty">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={<span>没有聊天记录，快去试试吧！</span>}
                />
              </div>
            )}
          </div>

          <div className="create-modal-chat create-modal-user-chat">
            <div className="create-modal-chat-header font-family-dingding  flx-align-center">
              <i className="iconfont mr-ic_user1 gradient-text-3"></i>
              <div>YOU</div>
            </div>
            <div className="create-modal-chat-body">
              <TextArea
                ref={inputUserRef}
                className="remove-default-textarea"
                maxLength={50000}
                value={msgUser}
                onChange={(e) => {
                  setMsgUser(e.target.value);
                }}
                placeholder="预设 - 输入对话内容"
                autoSize={{ maxRows: 3 }}
                onKeyDown={(e) => handleUserBotKeyDown(e, true)} // 监听键盘按键
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
                {/* <Button
                  type="primary"
                  size="small"
                  disabled={msgUser.trim() === ''}
                  onClick={handleSendBot}
                >
                  AI一键回复
                </Button> */}
              </div>
            </div>
            <div className="create-modal-chat-body">
              <TextArea
                ref={inputBotRef}
                className="remove-default-textarea"
                maxLength={50000}
                value={msgBot}
                onChange={(e) => {
                  setMsgBot(e.target.value);
                }}
                placeholder="预设 - 模拟AI回复"
                autoSize={{ maxRows: 3 }}
                onKeyDown={(e) => handleUserBotKeyDown(e, false)} // 监听键盘按键
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Create;
