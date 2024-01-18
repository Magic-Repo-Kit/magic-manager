import React, { useState, useEffect } from 'react';
import './move-list.scss';
import { useNavigate } from 'react-router-dom';
import ajax from '@/request';

// import InfiniteScroll from 'react-infinite-scroll-component';
// 图片
import knowledgeFile from '@/assets/images/file.png';
import knowledgeIcon from '@/assets/images/knowledge-icon.png';

// antd组件
import { Empty, message, List, Divider, Skeleton, Avatar } from 'antd';

// item内容
function MoveItem({
  moveTargetId,
  setMoveTargetParentId,
  params,
  setParams,
  setMoveBreadList,
}) {
  const [loading, setLoading] = useState(false);

  const [fileList, setFileList] = useState([]); //文件列表

  // 获取面包屑导航
  const getBreadList = async (parentId) => {
    console.log('🚀 ~ getBreadList ~ parentId:', parentId);
    try {
      const res = await ajax.get('/chat/knowledge/list-path-by-parent-id', {
        parentId: parentId || '',
      });
      if (res.code === 200) {
        if (res.data && res.data.length > 0) {
          const tempDatas = res.data.map((item, index) => {
            const tempData = {
              title: (
                <div className="single-omit" style={{ maxWidth: '100px' }}>
                  {item.parentName}
                </div>
              ),
              href: `?parentId=${item.parentId}`, // 设置链接属性
            };
            if (index === res.data.length - 1) {
              delete tempData.href; // 删除最后一个面包屑项的href属性
            }

            return tempData;
          });
          setMoveBreadList(tempDatas);
        }
      }
    } catch (error) {
      console.log('🚀 ~ getFileList ~ error:', error || '获取文件列表分页失败');
    }
  };

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

  // 点击子元素
  const handleClick = (file) => {
    console.log('🚀 ~ handleClick ~ file:', file);
    // type===2的 和 自己不能点击
    if (file.id === moveTargetId) {
      message.info('别选择自己，换个文件吧！');
      return;
    }
    if (file.type === 2) {
      return;
    }
    // 存储父级id
    setMoveTargetParentId(file.id);
    // 修改params，触发刷新列表
    setParams((prevParams) => ({
      ...prevParams,
      parentId: file.id,
    }));
    getBreadList(file.id);
  };

  useEffect(() => {
    getBreadList();
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
            onClick={() => handleClick(file)}
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
        <div className="knowledge-move-empty">
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
