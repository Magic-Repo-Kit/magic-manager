import React from 'react';
import { Collapse } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function Introduce() {
  const text = (
    <p
      style={{
        paddingLeft: 24,
      }}
    >
      A dog is a type of domesticated animal. Known for its loyalty and
      faithfulness, it can be found as a welcome guest in many households across
      the world.
    </p>
  );
  const panelStyle = {
    marginBottom: 24,
  };
  const items = [
    {
      key: '1',
      label: (
        <span className="font-family-dingding">MagicRepokit 是什么？</span>
      ),
      children: (
        <div className="questions-content">
          <p>
            MagicRepokit
            是一款基于人工智能技术的对话工具，它可以像一个魔法师一样，根据您的指令和需求，轻松生成各种内容，包括：
          </p>
          {/* 👨‍💻🎯🤖⚡✍👻🎨🎉🐱‍🐉🐳🐞🧠🔊💡📝🚀🛩🛰🌎🌊 */}
          <ul>
            <li>✍ 表情文本创作： 写故事、诗歌、文章、邮件、文案等。</li>
            <li>🤖 对话生成：创建聊天机器人，进行角色扮演，模拟对话。</li>
            <li>👨‍💻 代码生成：生成不同编程语言的代码，帮助您快速实现想法。</li>
            <li>🌎 翻译：支持多种语言之间的互译，帮助您跨越语言障碍。</li>
            <li>📝 语法检查：检测您的文本语法错误，并给出修改建议。</li>
            <li>🐞 代码修复：自动修复代码中的错误，提高代码质量。</li>
          </ul>
        </div>
      ),
      style: panelStyle,
    },
    {
      key: '2',
      label: (
        <span className="font-family-dingding">MagicRepokit 是免费的吗？</span>
      ),
      children: (
        <div className="questions-content">
          <p>
            完全免费的！这意味着您可以自由地使用它的所有功能，无需支付任何费用。您可以在任何时间、任何地点，尽情体验
            AI 带来的便利和乐趣。
          </p>
          <p>
            更棒的是，MagicRepokit
            还提供免费的模型训练功能，您可以根据自己的需求，训练出更加个性化的模型，让它更符合您的写作风格、专业领域、目标用户等。
          </p>
          <p>
            这就像拥有一个专属的 AI 助手，随时为您服务。 免费的
            MagicRepokit，让您尽情发挥创意，探索 AI 的无限可能。
          </p>
        </div>
      ),
      style: panelStyle,
    },
    {
      key: '3',
      label: <span className="font-family-dingding">如何高效使用？</span>,
      children: (
        <div className="questions-content">
          <p>
            MagicRepokit
            易于使用，能够让您尽情发挥创意，您只需选择对应角色类型和问题，即可在几秒钟内获得优质内容。高级功能还允许创建AI模型，对发散能力、知识库训练、预设对话进行自定义。
          </p>
          <p>
            为了得到更精准的结果，请提供详细的描述。如果需要，我们的
            预设对话可以为您提供帮助。
          </p>
        </div>
      ),
      style: panelStyle,
    },
    {
      key: '4',
      label: (
        <span className="font-family-dingding">与其他工具相比的优势？</span>
      ),
      children: (
        <div className="questions-content">
          <ul>
            <li>
              强大的自定义模型功能：
              您可以根据自己的需求训练模型，使其更加符合您的写作风格、专业领域、目标用户等，生成更加个性化的内容。
            </li>
            <li>
              多种功能集成：MagicRepokit
              集成了文本生成、对话生成、代码生成、翻译、语法检查和代码修复等多种功能，可以满足用户的多种需求。
            </li>
            <li>
              易于使用： MagicRepokit
              提供简单易用的界面，即使没有编程经验的用户也能轻松上手。
            </li>
            <li>
              高效率：MagicRepokit
              可以帮助用户快速生成高质量的内容，提高工作效率。
            </li>
          </ul>
        </div>
      ),

      style: panelStyle,
    },
    {
      key: '5',
      label: <span className="font-family-dingding">未来发展方向是什么？</span>,
      children: (
        <div className="questions-content">
          <p>自由、简单、高效</p>
          {/* 👨‍💻🎯🤖⚡✍👻🎨🎉🐱‍🐉🐳🐞🧠🔊💡📝🚀🌎🌊 */}
          <ul>
            <li>
              模型的不断优化：
              开发更强大的模型，使其能够生成更加高质量、更加个性化的内容。
            </li>
            <li>
              功能的不断扩展：
              增加更多功能，例如语音合成、图像生成等，进一步扩展应用场景。
            </li>
            <li>
              跨平台支持：
              支持更多平台，例如移动设备、网页等，方便用户随时随地使用。
            </li>
            <li>
              与其他工具的整合：
              与其他工具进行整合，例如办公软件、社交平台等，打造更加完善的生态系统。
            </li>
          </ul>
        </div>
      ),
      style: panelStyle,
    },
  ];
  return (
    <>
      <Collapse
        items={items}
        bordered={false}
        expandIconPosition="end"
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <PlusOutlined rotate={isActive ? 45 : 0} style={{ fontSize: 18 }} />
        )}
      />
    </>
  );
}
export default Introduce;
