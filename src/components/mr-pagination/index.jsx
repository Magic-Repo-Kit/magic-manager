import React from 'react';
import { Pagination } from 'antd';

const MrPagination = ({
  total,
  showTotal,
  defaultPageSize,
  defaultCurrent,
  pageNo,
  pageSize,
  onChange,
}) => {
  // 当第一页小于pageSize，分页隐藏
  if (pageNo <= 1 && total <= pageSize * (defaultCurrent - 1) + pageSize) {
    return null;
  }

  return (
    <Pagination
      simple
      total={total}
      showTotal={showTotal}
      defaultPageSize={defaultPageSize}
      defaultCurrent={defaultCurrent}
      current={pageNo}
      pageSize={pageSize}
      onChange={onChange}
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    />
  );
};

export default MrPagination;
