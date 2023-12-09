import React, { useState, useEffect } from 'react';
import './index.scss';
import { Area } from '@ant-design/plots';
import Typewriter from '@/components/Typewriter';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json'
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    smooth: true,
  };

  return (
    <div className="home-container">
      {/* <header>
        <div
          className="text-center"
          style={{
            fontSize: '28px',
            fontWeight: '700',
            height: '60px',
            lineHeight: '60px',
            marginBottom: '10px',
          }}
        >
          <span className="gradient-text">Welcome to the MarginRepoKit</span>
        </div>
      </header> */}
      <main>
        <div>
          <div className="home-title">
            <Typewriter text="访客统计" />
          </div>
          <Area {...config} />
        </div>
        {/* <div>
          <div></div>
        </div> */}
      </main>
      <section>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </section>
      <footer>
        <div></div>
        <div></div>
        <div></div>
      </footer>
    </div>
  );
}
export default Home;
