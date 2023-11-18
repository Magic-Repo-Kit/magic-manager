import React from 'react';
import './index.scss';

function Home() {
  return (
    <div className="home-container">
      <header>
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
      </header>
      <main>
        <div></div>
        <div>
          <div>今日访客</div>
        </div>
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
