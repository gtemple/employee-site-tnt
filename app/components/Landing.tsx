import Link from "next/link";
import '@/app/styles/landing.css'
import Image from 'next/image'

const Landing = () => {
  return (
    <div className='landing'>
      <div>
      <Image
          src="/images/landing-background.jpeg"
          width={600}
          height={450}
          alt="Temple and Temple staff"
          className='landing-image'
        />
        <Image
          src="/images/temple-logo2.png"
          width={600}
          height={66}
          alt="Temple and Temple Tours"
        />
        </div>
        <div className='landing-text'>
      <div className='landing-description'>Activities Director Site</div>
      <div className='landing-moto'>Your travels made easy.</div>
      <div className="landing-btns-container">
        <Link className='landing-btn' href="/pages/login">Sign in</Link>
        <Link className='landing-btn'href="/pages/signup">Sign up</Link>
      </div>
      <div className='landing-footer'>
        The Temple and Temple Tours Activities Director aims to help all Temple and Temple staff feel more confident in their tasks.
        Not only will it aid operations in organizing trips, but both new and experienced ADs will be prepared for upcoming tours.
      </div>
      </div>
    </div>
  );
};

export default Landing;
