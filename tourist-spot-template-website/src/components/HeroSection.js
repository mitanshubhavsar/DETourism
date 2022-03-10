import React from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './HeroSection.css';
import video from '../assets/videos/video-1.mp4';

function HeroSection() {
  return (
    <div className="hero-container">
      <video src={video} autoPlay loop muted />
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Link to="/packages">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            GET STARTED
          </Button>
        </Link>

        <Link to="/sign-up">
          <Button
            className="btns"
            buttonStyle="btn--primary"
            buttonSize="btn--large"
          >
            EXPLORE MORE
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
