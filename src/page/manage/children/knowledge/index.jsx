import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { Outlet, useLocation } from 'react-router-dom'; //渲染子路由
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

import ajax from '@/request';

// antd组件
import { Breadcrumb } from 'antd';

function Knowledge() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const location = useLocation();

  const [titleList, setTitleList] = useState([]);
  const [parentId, setParentId] = useState(''); //存储地址栏parentId
  // 获取面包屑导航
  const getBreadTitle = async (parentId) => {
    try {
      const res = await ajax.get('/chat/knowledge/list-path-by-parent-id', {
        parentId,
      });
      if (res.code === 200) {
        if (res.data && res.data.length > 0) {
          const tempDatas = res.data.map((item, index) => {
            const tempData = {
              title: item.parentName,
              href: `?parentId=${item.parentId}`, // 设置链接属性
            };
            if (index === res.data.length - 1) {
              delete tempData.href; // 删除最后一个面包屑项的href属性
            }

            return tempData;
          });

          setTitleList(tempDatas);
        }
      }
    } catch (error) {
      console.log(
        '🚀 ~ getBreadTitle ~ error:',
        error || '获取文件列表分页失败'
      );
    }
  };

  useEffect(() => {
    // 从URL中获取parentId参数
    const queryParams = new URLSearchParams(location.search);
    const parentId = queryParams.get('parentId');
    getBreadTitle(parentId);
    setParentId(parentId);
  }, [location]);
  return (
    <div className={`knowledge-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* 渲染子路由 */}
      <div className="knowledge-title-bread">
        <Breadcrumb
          items={[
            {
              title: '根目录',
              href: '',
            },
            ...titleList,
          ]}
        />
      </div>
      <Outlet />
    </div>
  );
}

export default Knowledge;
