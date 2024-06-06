import React from 'react';
import articleA from '@/assets/images/article-a.png';
import articleB from '@/assets/images/article-b.png';
import articleC from '@/assets/images/article-c.png';
import articleD from '@/assets/images/article-d.png';
import articleE from '@/assets/images/article-e.png';
import articleF from '@/assets/images/article-f.png';

function Introduce() {
  return (
    <>
      <article>
        <div className="article-container">
          <div className="article-icon">
            <img src={articleA} alt="" />
            {/* <i className="iconfont mr-shujujiekou"></i> */}
          </div>
          <div className="article-header font-family-dingding">易上手</div>
          <div className="article-ctx">
            无需复杂的配置或学习曲线，使用如此简单。
          </div>
        </div>
      </article>
      <article>
        <div className="article-container">
          <div className="article-icon">
            <img src={articleB} alt="" />
            {/* <i className="iconfont mr-shujucaiji"></i> */}
          </div>
          <div className="article-header font-family-dingding">多模态</div>
          <div className="article-ctx">
            融合了文本、图像、音频等多种模态，提供更全面、准确、及时的信息。
          </div>
        </div>
      </article>
      <article>
        <div className="article-container">
          <div className="article-icon">
            <img src={articleC} alt="" />
            {/* <i className="iconfont mr-renjijiaohu"></i> */}
          </div>
          <div className="article-header font-family-dingding">自定义</div>
          <div className="article-ctx">
            根据自己的需求，定制模型参数，支持微调，使其更符合特定应用场景。
          </div>
        </div>
      </article>

      <article>
        <div className="article-container">
          <div className="article-icon">
            <img src={articleD} alt="" />
            {/* <i className="iconfont mr-insert_tag_field"></i> */}
          </div>
          <div className="article-header font-family-dingding">多语言</div>
          <div className="article-ctx">
            支持多种语言，能够理解和生成不同语言的文本。
          </div>
        </div>
      </article>
      <article>
        <div className="article-container">
          <div className="article-icon">
            <img src={articleE} alt="" />
            {/* <i className="iconfont mr-kuozhangongneng"></i> */}
          </div>
          <div className="article-header font-family-dingding">安全可靠</div>
          <div className="article-ctx">
            注重用户数据，安全可靠。可以放心使用，不必担心数据泄露或隐私问题。
          </div>
        </div>
      </article>
      <article>
        <div className="article-container">
          <div className="article-icon">
            {/* <i className="iconfont mr-1huojian"></i> */}
            <img src={articleF} alt="" />
          </div>
          <div className="article-header font-family-dingding">无限可能</div>
          <div className="article-ctx">
            该模型将继续提升模型处理能力，并朝着更精准、更流畅、更智能的方向发展。
          </div>
        </div>
      </article>
    </>
  );
}
export default Introduce;
