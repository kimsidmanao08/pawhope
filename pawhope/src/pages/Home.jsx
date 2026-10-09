import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <section className="hero">
        <div>

          <h1>Give Hope to Stray Animals 🐾</h1>

          <p>
            PawHope is a web-based fundraising platform that helps
            provide food, medical care, shelter, and rescue support
            for stray cats and dogs.
          </p>

          <div className="hero-buttons">
            <Link to="/donate" className="btn">
              Donate Now
            </Link>

            <Link to="/Hello" className="btn secondary">
              Hello World
            </Link>

            <Link to="/report" className="btn third">
              Report a Stray
            </Link>

          </div>
        </div>
      </section>

      <section className="features">

        <div className="feature-card">
          <span>💰</span>
          <h2>Donate</h2>
          <p>
            Support stray animals through online donations.
          </p>
        </div>

        <div className="feature-card">
          <span>🐶</span>
          <h2>Report Animals</h2>
          <p>
            Report stray cats and dogs that need help.
          </p>
        </div>

        <div className="feature-card">
          <span>🏠</span>
          <h2>Provide Care</h2>
          <p>
            Donations help provide food, medicine, and shelter.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;