import React, { useContext, useState, useEffect } from 'react';
import './index.scss';
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

// 图片
import PlatRobot from '@/assets/images/work-platform-robot.png';
import PlatPainting from '@/assets/images/work-platform-painting.png';

// antv图表
import { TinyArea, WordCloud, Sunburst } from '@ant-design/plots';
import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

function Discover() {
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
      264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
      546, 983, 340, 539, 243, 226, 12,
    ];
    setVisitorList(newList);
  };
  const visitorConfig = {
    height: 100,
    autoFit: false,
    data: visitorList,
    smooth: true,
    areaStyle: {
      gradient: {
        colorStops: [
          {
            offset: 0,
            color: '#a0e4ff', // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#fff', // 100% 处的颜色
          },
        ],
        globalCoord: false, // 缺省为 false
      },
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

  // 旭日图
  const [sunData, setSunData] = useState([]);
  const sunDataConfig = {
    data: sunData,
    innerRadius: 0.2,
    radius: 1,
    interactions: [
      {
        type: 'element-active',
      },
    ],
    hierarchyConfig: {
      field: 'sum',
    },
    label: {
      // label layout: limit label in shape, which means the labels out of shape will be hide
      layout: [
        {
          type: 'limit-in-shape',
        },
      ],
    },
  };
  const getSunData = () => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json')
      .then((response) => response.json())
      .then((json) => setSunData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  useEffect(() => {
    getSunData();
  }, []);

  return (
    <div className={`discover-container ${darkMode ? 'dark-mode' : ''}`}>
      <main>
        <section className="discover-main-card-header">
          {/* 访问热度 */}
          {/* <div className="discover-main-header-left">
            <div className="discover-visitor-update flx-justify-between">
              <span>
                热度
                <i className="iconfont mr-remen visitor-fire"></i>
              </span>
              <i
                className="iconfont mr-refresh-full"
                onClick={handleVisitorUpdate}
              ></i>
            </div>
            <div>
              <TinyArea {...visitorConfig} />
            </div>
          </div> */}
        </section>
        {/* <div style={{ margin: '15px 0' }}>词云</div> */}
        {/* <section className="discover-main-middle">
          <div className="discover-middle-box">
            <div>
              <WordCloud {...wordCloudConfig} />
            </div>

            <div>
              <Timeline
                items={[
                  {
                    children: 'Create a services site 2015-09-01',
                  },
                  {
                    children: 'Solve initial network problems 2015-09-01',
                  },
                  {
                    children: 'Technical testing 2015-09-01',
                  },
                  {
                    children: 'Network problems being solved 2015-09-01',
                  },
                ]}
              />
            </div>
          </div>


        </section> */}
        {/* <section className="discover-main-bottom">
          <div></div>
          <div>
            <Sunburst {...sunDataConfig} />
          </div>

          <div className="discover-bottom-github flx-center">
            <i className="icon-github iconfont mr-github"></i>
            <div className="discover-bottom-title font-family-dingding">
              MagicRepoKit
            </div>
            <div>愿我有所发现，有所创造。</div>
            <div className="discover-bottom-btn font-family-dingding user-select">
              <i className="iconfont mr-star01"></i>
              <span>Star on GitHub</span>
            </div>
            <div>您的星是对我们最大的鼓励！</div>
          </div>
        </section> */}
      </main>
    </div>
  );
}

export default Discover;
