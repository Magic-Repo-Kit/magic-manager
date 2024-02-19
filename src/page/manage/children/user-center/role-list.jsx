import React, { useState } from 'react';
import './index.scss';

function RoleList() {
  const [list, setList] = useState([
    {
      name: '万能助手4.0',
      describe: '万物皆有裂痕，那是光照进来的地方',
      img: 'https://picsum.photos/200/300',
      author: '老登老登老登老登',
      authorHead: 'https://picsum.photos/200/300',
      star: '2000',
    },
    {
      name: '超级风格画超级风格画超级风格画超级风格画超级风格画超级风格画 ',
      describe: '宁静致远，克己复礼',
      img: 'https://picsum.photos/200/400',
      author: 'John Doe',
      star: '1500',
    },
    {
      name: '单词卡片',
      describe: '岁月静好，珍惜当下',
      img: 'https://picsum.photos/200/500',
      author: 'Jane Smith Jane Smith Jane Smith',
      star: '3000',
    },
    {
      name: '单词卡片',
      describe: '岁月静好，珍惜当下',
      img: 'https://picsum.photos/200/500',
      author: 'Jane Smith Jane Smith Jane Smith',
      star: '3000',
    },
    {
      name: '若曦',
      describe: '风吹麦浪，阳光洒路',
      img: 'https://picsum.photos/200/600',
      author: 'Alan Johnson',
      star: '1200',
    },
    {
      name: '私立高中',
      describe: '梦想是翅膀，奋斗是力量',
      img: 'https://picsum.photos/200/700',
      author: 'Emily Davis',
      star: '1800',
    },
    {
      name: '霸道总裁爱上我',
      describe:
        '勇敢前行，未来可期勇敢前行，未来可期勇敢前行，未来可期勇敢前行，未来可期勇敢前行，未来可期',
      img: 'https://picsum.photos/200/800',
      author: 'John Doe',
      star: '2500',
    },
    {
      name: '物理解决',
      describe: '一花一世界，一叶一追寻',
      img: 'https://picsum.photos/200/900',
      author: 'Alan Johnson',
      star: '2200',
    },
    {
      name: '程序员',
      describe: '前方的路，还很长，但我会一步步走过去',
      img: 'https://picsum.photos/200/1000',
      author: 'Jane Smith',
      star: '2800',
    },
    {
      name: '数据分析师',
      describe: '相信自己，你才能成功',
      img: 'https://picsum.photos/200/1100',
      author: 'Emily Davis',
      star: '2300',
    },
    {
      name: '超级机器人',
      describe:
        '天道酬勤，成功就在不远处天道酬勤，成功就在不远处天道酬勤，成功就在不远处天道酬勤，成功就在不远处',
      img: 'https://picsum.photos/200/1200',
      author: 'John Doe',
      star: '3200',
    },
    {
      name: '物理解决',
      describe: '一花一世界，一叶一追寻',
      img: 'https://picsum.photos/200/900',
      author: 'Alan Johnson',
      star: '2200',
    },
    {
      name: '程序员',
      describe: '前方的路，还很长，但我会一步步走过去',
      img: 'https://picsum.photos/200/1000',
      author: 'Jane Smith',
      star: '2800',
    },
    {
      name: '数据分析师',
      describe: '相信自己，你才能成功',
      img: 'https://picsum.photos/200/1100',
      author: 'Emily Davis',
      star: '2300',
    },
    {
      name: '超级机器人',
      describe:
        '天道酬勤，成功就在不远处天道酬勤，成功就在不远处天道酬勤，成功就在不远处天道酬勤，成功就在不远处',
      img: 'https://picsum.photos/200/1200',
      author: 'John Doe',
      star: '3200',
    },
    {
      name: '物理解决',
      describe: '一花一世界，一叶一追寻',
      img: 'https://picsum.photos/200/900',
      author: 'Alan Johnson',
      star: '2200',
    },
    {
      name: '程序员',
      describe: '前方的路，还很长，但我会一步步走过去',
      img: 'https://picsum.photos/200/1000',
      author: 'Jane Smith',
      star: '2800',
    },
    {
      name: '数据分析师',
      describe: '相信自己，你才能成功',
      img: 'https://picsum.photos/200/1100',
      author: 'Emily Davis',
      star: '2300',
    },
    {
      name: '超级机器人',
      describe:
        '天道酬勤，成功就在不远处天道酬勤，成功就在不远处天道酬勤，成功就在不远处天道酬勤，成功就在不远处',
      img: 'https://picsum.photos/200/1200',
      author: 'John Doe',
      star: '3200',
    },
    {
      name: '物理解决',
      describe: '一花一世界，一叶一追寻',
      img: 'https://picsum.photos/200/900',
      author: 'Alan Johnson',
      star: '2200',
    },
    {
      name: '程序员',
      describe: '前方的路，还很长，但我会一步步走过去',
      img: 'https://picsum.photos/200/1000',
      author: 'Jane Smith',
      star: '2800',
    },
    {
      name: '数据分析师',
      describe: '相信自己，你才能成功',
      img: 'https://picsum.photos/200/1100',
      author: 'Emily Davis',
      star: '2300',
    },
    {
      name: '超级机器人',
      describe:
        '天道酬勤，成功就在不远处天道酬勤，成功就在不远处天道酬勤，成功就在不远处天道酬勤，成功就在不远处',
      img: 'https://picsum.photos/200/1200',
      author: 'John Doe',
      star: '3200',
    },
  ]);
  return (
    <div className="role-list-container">
      <main>
        <div className="wrapper">
          {list.map((item, index) => (
            <div key={index} className="column">
              <div className="role-list-item">
                <div className="role-list-item-img">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="role-list-item-info">
                  <div className="role-list-item-info-name single-omit">
                    {item.name}
                  </div>
                  <p>{item.describe}</p>
                  <div className="role-list-item-info-bottom user-select click-jump">
                    <div>使用角色</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default RoleList;
