import ResponsiveAppBar from "../components/Navbar";
import "../../../assets/styles/global.css";
import { Link as RouterLink } from "react-router-dom";
import Button from "../../../components/common/Button";

const roomData = [
  {
    name: "The Grand Suite",
    tag: "Signature Suite",
    price: "850",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    large: true,
  },
  {
    name: "Deluxe Ocean View",
    tag: "Premium Room",
    price: "420",
    img: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&q=80",
  },
  {
    name: "Executive Penthouse",
    tag: "Penthouse",
    price: "1,200",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
  },
];

const amenities = [
  {
    icon: "✦",
    name: "Infinity Pool",
    desc: "An elevated pool overlooking the horizon, open sunrise to midnight with private cabana service.",
  },
  {
    icon: "✦",
    name: "Michelin Dining",
    desc: "Three award-winning restaurants featuring locally-sourced seasonal menus crafted by renowned chefs.",
  },
  {
    icon: "✦",
    name: "Spa & Wellness",
    desc: "A 5,000 sq ft sanctuary offering bespoke treatments, thermal circuits, and private meditation rooms.",
  },
  {
    icon: "✦",
    name: "Concierge",
    desc: "A dedicated personal concierge available 24/7 to curate every detail of your stay.",
  },
  {
    icon: "✦",
    name: "Private Events",
    desc: "Elegant ballrooms and curated outdoor spaces for weddings, galas, and corporate retreats.",
  },
  {
    icon: "✦",
    name: "Valet & Transfer",
    desc: "Seamless door-to-door transfers, helicopter arrangements, and private yacht charters.",
  },
];

function HomePage() {
  return (
    <>
      <div className="hotel-page">
        <ResponsiveAppBar />

        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-content">
            <div className="hero-eyebrow">Est. 1924 · LuxuryStay Hotel</div>
            <h1 className="hero-title">
              Where <em>Elegance</em>
              <br />
              Meets Eternity
            </h1>
            <p className="hero-subtitle">
              A sanctuary of timeless luxury and impeccable service
            </p>
            <div className="hero-actions">
              
              <RouterLink to="/signin">
                <Button className="btn-primary">Reserve Your Stay</Button>
              </RouterLink> <br /> 
              <RouterLink to="/signin">
                <Button className="btn-ghost">Explore Rooms</Button>
              </RouterLink>
            </div>
          </div>
          <div className="scroll-indicator">
            <div className="scroll-line" />
            <span>Scroll</span>
          </div>
        </section>

        {/* Stats */}
        <div style={{ padding: "0 2rem" }}>
          <div className="stats-strip">
            {[
              { n: "48", l: "Exclusive Suites" },
              { n: "3", l: "Michelin Stars" },
              { n: "100", l: "Years of Heritage" },
              { n: "24", l: "Hour Concierge" },
            ].map((s) => (
              <div className="stat-item" key={s.l}>
                <div className="stat-number">{s.n}</div>
                <div className="stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rooms */}
        <div className="section">
          <div className="section-header">
            <div>
              <div className="section-label">Accommodations</div>
              <h2 className="section-title">
                Our <em>Finest</em> Rooms
              </h2>
            </div>
            <button className="view-all">View All Rooms</button>
          </div>
          <div className="rooms-grid">
            {roomData.map((room) => (
              <div className="room-card" key={room.name}>
                <img className="room-img" src={room.img} alt={room.name} />
                <div className="room-overlay">
                  <div className="room-tag">{room.tag}</div>
                  <div className="room-name">{room.name}</div>
                  <div className="room-price">
                    From <span>${room.price}</span> / night
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="amenities-section">
          <div className="amenities-inner">
            <div className="section-header">
              <div>
                <div className="section-label">Services & Amenities</div>
                <h2 className="section-title">
                  The Art of <em>Living</em> Well
                </h2>
              </div>
            </div>
            <div className="amenities-grid">
              {amenities.map((a) => (
                <div className="amenity-item" key={a.name}>
                  <span className="amenity-icon" style={{ color: "#b4903a" }}>
                    {a.icon}
                  </span>
                  <div className="amenity-name">{a.name}</div>
                  <p className="amenity-desc">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section">
          <h2 className="cta-title">
            Begin Your
            <br />
            <em>Story</em> With Us
          </h2>
          <p className="cta-text">Your exceptional experience awaits</p>
          <a className="btn-primary" href="#">
            Book a Room
          </a>
        </div>

        {/* Footer strip */}
        <div className="footer-strip">
          <span>© 2025 LuxuryStay Hotel</span>
          <span>Privacy · Terms · Contact</span>
        </div>
      </div>
    </>
  );
}

export default HomePage;
