import React, { useState } from 'react';
import './index.scss';
// 图片
import userHead from '@/assets/images/user-head.png';

function Like() {
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
                  {/* <div className="role-list-item-info-bottom user-select click-jump">
                    <div>发布</div>
                  </div> */}
                  <div className="like-list-item-info-bottom">
                    <div className="flx-center">
                      <img src={userHead} className="like-list-head" />
                      <span
                        className="single-omit"
                        style={{ maxWidth: '10ch' }}
                      >
                        {item.author}
                      </span>
                    </div>
                    <div
                      className="flx-center"
                      style={{ alignItems: 'baseline' }}
                    >
                      <i className="iconfont mr-xihuantianchong like-list-star"></i>
                      <span>{item.star}</span>
                    </div>
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

export default Like;
