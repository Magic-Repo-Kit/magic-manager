import './index.scss';
import globeFlat from '@/assets/images/globe-flat.svg';

function Home() {
  return (
    <div className="home-container">
      <header>Home</header>
      <img src={globeFlat} alt="globeFlat" className="globeFlat" />
    </div>
  );
}

export default Home;
