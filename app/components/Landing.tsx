import Link from "next/link";
import "@/app/styles/landing.css";
import Image from "next/image";

const Landing = () => {
  return (
    <div className="landing">
      <div className="faux-nav">
        <Image
          src="/images/temple-logo2.png"
          width={600}
          height={66}
          alt="Temple and Temple Tours"
          className="landing-logo"
        />
        <Link className="landing-btn" href="/pages/login">
          Login
        </Link>
      </div>
      <div>
        <Image
          src="/images/landing-background.jpeg"
          width={600}
          height={450}
          alt="Temple and Temple staff"
          className="landing-image"
        />
      </div>
      <div className="landing-text">
        <div>
          <div className="landing-name">
            TEMPLE<br></br>AND TEMPLE<br></br>TOURS INC.
          </div>
          <div className="landing-description">Activities Director Site</div>
          <div className="landing-moto">Your travels made easy.</div>
        </div>
        <div className="landing-right">
          <div>
            The Temple and Temple Tours Activities Directors site aims to help
            all Temple and Temple staff feel more confident in their tasks. Not
            only will it aid operations in organizing trips, but both new and
            experienced ADs will be prepared for upcoming tours.
          </div>
          <div>
            <Link className="landing-btn" href="/pages/signup">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="landing-btns-container"></div>
    </div>
  );
};

export default Landing;
