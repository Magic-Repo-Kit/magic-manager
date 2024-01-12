import React, { useContext, useState, useEffect } from 'react';
import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

// 图片
import mrkDark from '@/assets/images/mrk-title-dark.png';
// antv图表
import { TinyArea, WordCloud } from '@ant-design/plots';
import { random } from '@/utils/tools';

function WorkPlatform() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);

  // 访客数据
  const [visitorList, setVisitorList] = useState([
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
  ]);
  const handleVisitorUpdate = () => {
    // 在这里更新 visitorList 状态
    const newList = [
      /* 新的 visitorList 数组 */
    ];
    setVisitorList(newList);
  };
  const visitorConfig = {
    height: 120,
    autoFit: false,
    data: visitorList,
    smooth: true,
    areaStyle: {
      fill: '#d6e3fd',
    },
  };

  // 词图
  const [wordCloudData, setWordCloudData] = useState([]);
  const getWordCloudData = () => {
    fetch(
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json'
    )
      .then((response) => response.json())
      .then((json) => setWordCloudData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const wordCloudConfig = {
    data: wordCloudData,
    wordField: 'name',
    weightField: 'value',
    colorField: 'name',

    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [8, 32],
      rotation: 1, //这里设置0.5比较卡顿
    },
    random: () => 0.5, //可以设置[0,1]区间值，让每次渲染位置相同
  };
  useEffect(() => {
    getWordCloudData();
  }, []);

  return (
    <div className={`work-platform-container ${darkMode ? 'dark-mode' : ''}`}>
      <main>
        <section className="work-platform-main-card-header">
          <div className="work-platform-main-visitor">
            <div
              onClick={handleVisitorUpdate}
              className="work-platform-visitor-update"
            >
              <i className="iconfont mr-refresh-full"></i>
            </div>
            <div>
              <TinyArea {...visitorConfig} />
            </div>
          </div>
          <div></div>
          <div>
            <div>快捷打开</div>
            <div>
              <div>
                <i className="iconfont mr-ziyuan49"></i>
                <span>一问一答</span>
              </div>
              <div>
                <i className="iconfont mr-service_ChatGPT"></i>
                <span>AI虚拟助手</span>
              </div>
              <div>
                <i className="iconfont mr-newchunse"></i>
                <span>闪聊</span>
              </div>
              <div>
                <i className="iconfont mr-sheji_huatu"></i>
                <span>AI绘图</span>
              </div>
              <div>
                <i className="iconfont mr-record-sound"></i>
                <span>频道</span>
              </div>
            </div>
          </div>
        </section>
        <section className="work-platform-main-middle">
          <div>
            <WordCloud {...wordCloudConfig} />
          </div>
          <div></div>
        </section>
      </main>
    </div>
  );
}

export default WorkPlatform;
