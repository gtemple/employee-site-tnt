import Link from "next/link";
import '@/app/styles/landing.css'

const Landing = () => {
  return (
    <div className='landing'>
      <div className='landing-hero'>Temple and Temple Tours</div>
      <div className='landing-description'>Activities Director Site</div>
      <div className='landing-moto'>Your travels made easy.</div>
      <div className="landing-btns-container">
        <Link className='landing-btn' href="/pages/login">Login</Link>
        <Link className='landing-btn'href="/pages/signup">Sign Up</Link>
      </div>
      <div className='landing-footer'>
        The Temple and Temple Tours Activities Director aims to help all Temple and Temple staff feel more confident in their tasks.
        Not only will it aid operations in organizing trips, but both new and experienced ADs will be prepared for upcoming tours.
      </div>
    </div>
  );
};

export default Landing;
