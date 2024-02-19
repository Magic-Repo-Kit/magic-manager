import React, { useContext, useState, useEffect } from 'react';
import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

// 图片
import userHead from '@/assets/images/user-head.png';

function Discover() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);

  const [columnCount, setColumnCount] = useState(5); //默认展示5列
  const [columns, setColumns] = useState([]);

  const [list, setList] = useState([
    {
      name: '万能助手4.0',
      describe: '万物皆有裂痕，那是光照进来的地方',
      img: 'https://picsum.photos/200/300',
      author: 'abus',
      authorHead: 'https://picsum.photos/200/300',
      star: '2000',
    },
    {
      name: '超级风格画',
      describe: '宁静致远，克己复礼',
      img: 'https://picsum.photos/200/400',
      author: 'John Doe',
      star: '1500',
    },
    {
      name: '单词卡片',
      describe: '岁月静好，珍惜当下',
      img: 'https://picsum.photos/200/500',
      author: 'Jane Smith',
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

  // 根据屏幕宽度来更新列数
  useEffect(() => {
    function handleResize() {
      let newColumnCount = 5;
      if (window.innerWidth >= 1800) {
        newColumnCount = 5;
      } else if (window.innerWidth >= 1200) {
        newColumnCount = 4;
      } else if (window.innerWidth >= 780) {
        newColumnCount = 3;
      } else {
        newColumnCount = 2;
      }
      return newColumnCount;
    }

    function updateColumnCount() {
      const newColumnCount = handleResize();
      if (newColumnCount !== columnCount) {
        setColumnCount(newColumnCount);
      }
    }

    updateColumnCount();

    window.addEventListener('resize', updateColumnCount);

    return () => {
      window.removeEventListener('resize', updateColumnCount);
    };
  }, [columnCount]);

  useEffect(() => {
    const masonryCols = Array.from({ length: columnCount }, () => []);

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const card = (
        <div key={i} className="discover-list-item">
          <div className="discover-list-item-img">
            <img src={item.img} alt={item.name} />
          </div>
          <div className="discover-list-item-info">
            <div className="discover-list-item-info-name">{item.name}</div>
            <p>{item.describe}</p>
            <div className="discover-list-item-info-bottom">
              <div className="flx-center">
                <img src={userHead} className="discover-list-head" />
                <span>{item.author}</span>
              </div>
              <div className="flx-center" style={{ alignItems: 'baseline' }}>
                <i className="iconfont mr-xihuan discover-list-star"></i>
                <span>{item.star}</span>
              </div>
            </div>
          </div>
        </div>
      );

      let shortestColumnIndex = 0;

      for (let j = 0; j < masonryCols.length; j++) {
        if (masonryCols[j].length < masonryCols[shortestColumnIndex].length) {
          shortestColumnIndex = j;
        }
      }

      masonryCols[shortestColumnIndex] = [
        ...masonryCols[shortestColumnIndex],
        card,
      ];
    }

    setColumns(masonryCols);
  }, [columnCount, list]);

  return (
    <div className={`discover-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* <div>1</div> */}
      {/* 瀑布流 */}
      <div className="wrapper">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="column">
            {col}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Discover;
