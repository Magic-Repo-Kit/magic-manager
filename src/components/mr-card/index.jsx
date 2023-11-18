import './index.scss';

const MrCard = () => {
  return (
    <div className="mr-card-container">
      <div className="card-bc"></div>
      <span className="card-head"></span>
      <div>Odin-7</div>
      <div>愿我有所发现、有所创造。</div>
      <div className="flx-justify-between list-friends">
        <div>
          <div>217</div>
          <div>好友</div>
        </div>
        <div>
          <div>19</div>
          <div>关注</div>
        </div>
        <div>
          <div>155</div>
          <div>未读</div>
        </div>
      </div>
    </div>
  );
};

export default MrCard;
