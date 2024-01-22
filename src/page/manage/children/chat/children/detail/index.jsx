import React, { useState } from 'react';
import './index.scss';
import DetailList from './detail-list';
import DetailImport from './detail-import';

function Detail() {
  const [showImport, setShowImport] = useState(false);
  const [importWay, setImportWay] = useState('localFile'); //导入方式：localFile-本地上传 webLink-网页链接
  return (
    <div className="knowledge-detail">
      {showImport ? (
        // 上传详情
        <DetailImport
          importWay={importWay}
          setImportWay={setImportWay}
          toList={() => setShowImport(false)}
        />
      ) : (
        //  列表
        <DetailList
          importWay={importWay}
          setImportWay={setImportWay}
          toImport={() => setShowImport(true)}
        />
      )}
    </div>
  );
}

export default Detail;
