import './index.scss';
import { Flex, Button } from 'antd';

function TableHeader(props) {
  const { slotTitle, slotbtns, onIconClick } = props;

  return (
    <div className="header">
      {/* left */}
      <div>
        {/* <div>用户管理/{slotTitle}</div> */}
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{slotTitle}</div>
      </div>
      {/* right */}
      <Flex justify="space-between" align="center" gap="small">
        {slotbtns.map((btn) => {
          return (
            <Button
              size={btn.size}
              key={btn.id}
              type={btn.type}
              icon={btn.icon}
              danger={btn.danger}
              onClick={() => btn.callback}
            >
              {btn.name}
            </Button>
          );
        })}
      </Flex>
    </div>
  );
}

export default TableHeader;
