import React from 'react';
import './index.scss';

const Cube = () => {
  const cubeStyle = {
    width: '200px',
    height: '200px',
    perspectiveOrigin: 'center center',
    perspective: '500px',
  };

  const spaceStyle = {
    margin: '50px auto',
    width: '200px',
    height: '200px',
    transformStyle: 'preserve-3d',
    animation: 'rotateCube 10s linear infinite',
  };

  const boxStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100px',
    height: '100px',
    fontSize: '100px',
    backgroundColor: 'rgba(0,0,0,.3)',
    color: '#fff',
    textAlign: 'center',
  };

  const box1Style = {
    transform: 'translateZ(100px)',
  };

  const box2Style = {
    transform: 'rotateX(90deg) translateZ(100px)',
  };

  const box3Style = {
    transform: 'rotateY(90deg) translateZ(100px)',
  };

  const box4Style = {
    transform: 'rotateX(-90deg) translateZ(100px)',
  };

  const box5Style = {
    transform: 'rotateY(-90deg) translateZ(100px)',
  };

  const box6Style = {
    transform: 'rotateX(180deg) translateZ(100px)',
  };

  return (
    <div className="camera" style={cubeStyle}>
      <div className="space" style={spaceStyle}>
        <div className="box box1" style={{ ...boxStyle, ...box1Style }}>
          1
        </div>
        <div className="box box2" style={{ ...boxStyle, ...box2Style }}>
          2
        </div>
        <div className="box box3" style={{ ...boxStyle, ...box3Style }}>
          3
        </div>
        <div className="box box4" style={{ ...boxStyle, ...box4Style }}>
          4
        </div>
        <div className="box box5" style={{ ...boxStyle, ...box5Style }}>
          5
        </div>
        <div className="box box6" style={{ ...boxStyle, ...box6Style }}>
          6
        </div>
      </div>
    </div>
  );
};

export default Cube;
