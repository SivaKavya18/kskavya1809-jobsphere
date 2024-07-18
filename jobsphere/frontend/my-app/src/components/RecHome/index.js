import { Link } from 'react-router-dom';
import Header from '../Header2';
import './index.css';

const Home = () => (
  <div>
    <Header />
    <div className="home-container">
      <h1 className="home-heading">
      Discover Top Talent <br/>That Elevates Your Team
      </h1>
      <p className="home-info">
      Join millions of employers finding exceptional candidates with the right skills and potential. 
      Connect with top talent that fits your company's needs and drives success.
      </p>

      <Link to="/jobs">
        {/* <button type="button" className="home-btn">
          Find Jobs
        </button> */}
      </Link>
    </div>
  </div>
);

export default Home;
