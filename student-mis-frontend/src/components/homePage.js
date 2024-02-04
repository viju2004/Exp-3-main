import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <Card title="Student" description="View student information" link="./login" icon="👩‍🎓" />
      <Card title="Faculty" description="View faculty details" link="/faculty" icon="👨‍🏫" />
      <Card title="Admin" description="Admin actions" link="/admin" icon="👩‍💼" />
    </div>
  );
};

const Card = ({ title, description, link, icon }) => {
  return (
    <div className="card">
      <span className="card-icon" role="img" aria-label={title}>
        {icon}
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={link}>
        <button>{`Go to ${title} Page`}</button>
      </Link>
    </div>
  );
};

export default HomePage;
