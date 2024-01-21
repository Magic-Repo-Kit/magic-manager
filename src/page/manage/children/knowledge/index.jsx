import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'; //渲染子路由
import { DarkModeContext } from '@/components/DarkModeProvider'; //夜间模式

import ajax from '@/request';

import knowledgeFile from '@/assets/images/file.png';
import knowledgeIcon from '@/assets/images/knowledge-icon.png';
// antd组件
import { Breadcrumb } from 'antd';

function Knowledge() {
  // 共享参数
  const { darkMode } = useContext(DarkModeContext);
  const location = useLocation();
  const navigate = useNavigate();

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
              title: (
                <div
                  style={{
                    maxWidth: '100px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={item.type === 1 ? knowledgeFile : knowledgeIcon}
                    style={{ height: 20, marginRight: 3 }}
                  />
                  <div className="single-omit">{item.parentName}</div>
                </div>
              ),
              href: '',
              onClick: (e) => {
                e.preventDefault();
                if (index !== res.data.length - 1) {
                  handleBreadItemClick(item.parentId);
                }
              },
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

  // 删除地址栏对应参数，并跳转到原页面
  const removeParams = (parentId) => {
    // 使用URLSearchParams来修改URL
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(parentId); // 删除parentId参数

    // 如果跳到详情页，替换/detail
    let newPathname = location.pathname;
    if (newPathname.includes('/detail')) {
      newPathname = newPathname.replace('/detail', '/list');
    }

    // 更新地址栏，不刷新页面
    navigate(
      {
        pathname: newPathname,
        search: searchParams.toString(),
      },
      { replace: true }
    );
  };

  // 面包屑 - 点击根目录
  const handleBreadHomeClick = (e) => {
    e.preventDefault(); // 阻止默认的链接行为
    if (parentId) {
      // 如果parentId存在，则删除该参数并跳转
      removeParams('parentId');
    }
    setTitleList([]);
  };
  // 面包屑 - 点击对应item跳转
  const handleBreadItemClick = (parentId) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('parentId', parentId); //设置新的parentId

    // 如果跳到详情页，替换/detail
    let newPathname = location.pathname;
    if (newPathname.includes('/detail')) {
      newPathname = newPathname.replace('/detail', '/list');
    }

    // 更新地址栏，不刷新页面
    navigate(
      {
        pathname: newPathname,
        search: searchParams.toString(),
      },
      { replace: true }
    );
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
      <div className="knowledge-title-screen">
        <div className="knowledge-title-bread user-select">
          <Breadcrumb
            items={[
              {
                title: '根目录',
                href: '',
                onClick: handleBreadHomeClick,
              },
              ...titleList,
            ]}
          />
        </div>
      </div>

      {/* 渲染子路由 */}
      <Outlet />
    </div>
  );
}

export default Knowledge;
