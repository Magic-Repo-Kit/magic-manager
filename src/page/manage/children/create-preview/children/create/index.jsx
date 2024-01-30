import React, { useRef, useState, useEffect } from 'react';
import '../../index.scss';
import './create.scss';
import ajax from '@/request';

import UploadImage from '@/components/upload-image';
import MoveList from '@/page/manage/children/knowledge/children/list/move-list';

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
  Cascader,
} from 'antd';
const { TextArea } = Input;

function Create({ modelList, onModelChoose }) {
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

  const [temperature, setTemperature] = useState(0.7); //发散能力(0~2)
  const [modelName, setModelName] = useState('mrk-3.5-turbo'); //模型名称

  const [isShowKnowledge, setIsShowKnowledge] = useState(1); //是否展现知识库[1:关闭(默认) 2:开启]
  const [knowledgeId, setKnowledgeId] = useState(''); //知识库id
  const [knowledgeOptions, setKnowledgeOptions] = useState([]); //知识库可选项数据源

  const [conversationStarters, setConversationStarters] = useState([]); //预设对话
  const [isPresetOpen, setIsPresetOpen] = useState(false); //对话弹框

  const formatter = (value) => `${value}%`; //发散能力

  //知识库文件列表筛选
  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 20,
    keywords: '',
    parentId: '0', //空-目录
  });

  // 获取根目录知识库列表
  const getKnowledgeListRoot = async (parentId) => {
    try {
      const res = await ajax.get('/chat/knowledge/list-page', {
        ...params,
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
        ...params,
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
      // console.log(selectedValue);
      setKnowledgeId(selectedValue);
    }
  };

  // 图片上传成功后
  const handleUploadSuccess = (fileList) => {
    let url = fileList[0].response.data.link;
    setImageUrl(url);
  };

  // 模型选择
  const handleChangeModal = (value, model) => {
    setModelName(value);
    onModelChoose(model);
  };

  // 弹框 - 预设对话 - 确定
  const handlePresetOk = () => {
    setIsPresetOpen(false);
    console.log('确定');
  };

  // 弹框 - 预设对话 - 取消
  const handlePresetCancel = () => {
    setIsPresetOpen(false);
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
      knowledgeId: isShowKnowledge === 1 ? '' : knowledgeId,
      modelName,
      name,
      prompt,
      temperature,
    };
    console.log('🚀 ~ handleCreateRole ~ params:', params);
    // try {
    //   const res = await ajax.post(`/chat/role/create`, params);
    //   if (res.code === 200) {
    //     console.log('🚀 ~ handleCreateRole ~ res:', res);
    //     message.success('提交成功');

    //     // 恢复原值
    //   }
    // } catch (error) {
    //   message.error(error.message || '提交失败');
    // } finally {
    //   console.log(11);
    // }
  };

  useEffect(() => {
    // 获取根目录知识库列表
    getKnowledgeListRoot();
  }, []);

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
            <Button type="primary" size="small" disabled={prompt.trim() === ''}>
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
                  formatter,
                }}
                onChange={(value) => setTemperature(value / 50)}
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
        open={isPresetOpen}
        onCancel={handlePresetCancel}
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
                  AI一键回复
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
    </div>
  );
}

export default Create;
