import React, { useState, useEffect } from 'react';
import '../index.scss';
import { useNavigate } from 'react-router-dom';
import ajax from '@/request';

// import InfiniteScroll from 'react-infinite-scroll-component';
// 图片
import knowledgeFile from '@/assets/images/file.png';
import knowledgeIcon from '@/assets/images/knowledge-icon.png';

// antd组件
import { Empty, List, Divider, Skeleton, Avatar } from 'antd';

// item内容
function MoveItem() {
  const [loading, setLoading] = useState(false);

  const [fileList, setFileList] = useState([]); //文件列表
  const [parentId, setParentId] = useState(''); //全局parentId，方便操作

  // 列表筛选
  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 100,
    keywords: '',
    parentId, //空-目录
  });

  // 获取文件列表分页
  const getFileList = async () => {
    try {
      const res = await ajax.get('/chat/knowledge/list-page', params);
      if (res.code === 200) {
        setFileList(res.data.list);
      }
    } catch (error) {
      console.log('🚀 ~ getFileList ~ error:', error || '获取文件列表分页失败');
    }
  };
  useEffect(() => {
    getFileList();
  }, [params]);

  return (
    <div className="knowledge-move-list">
      {/* <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      </InfiniteScroll> */}

      {/* 子元素item-file */}
      {fileList && fileList.length > 0 ? (
        fileList.map((file) => (
          <div
            key={file.id}
            className={`knowledge-move-item-content flx-center ${
              file.type === 1 ? 'cursor-point' : ''
            }`}
          >
            <img
              src={
                file.type === 1 ? knowledgeFile : file.image || knowledgeIcon
              }
              className="filter-drop-shadow"
            />
            <div className="knowledge-move-item-name single-omit">
              {file.name}
            </div>
          </div>
        ))
      ) : (
        /* 无子集目录 */
        <div className="knowledge-content-empty">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>没有子目录了，就放这里吧！</span>}
          />
        </div>
      )}
    </div>
  );
}

export default MoveItem;
