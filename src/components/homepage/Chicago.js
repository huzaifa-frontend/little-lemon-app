import '../../App.css';
import MarioA from '../../assets/MarioA.jpg';

function Chicago() {
  return (
    <section>
      <h2 className="chicago-heading">Our Story in Chicago</h2>
      <div className="chicago-info">
        <div className="chicago-text">
          <p>
            Nestled in the heart of Chicago’s West Loop, Little Lemon was born from a dream of two brothers, Mario and Adrian, who wanted to bring a slice of the Mediterranean to the Windy City.
          </p>
          <p>
            From humble beginnings as a cozy corner café, Little Lemon grew into a vibrant restaurant known for its fresh unforgettable flavors. Whether you're here for a family dinner or a casual lunch, we serve tradition on every plate.
          </p>
          <p>
            Come taste the sunshine of the Mediterranean — right here in Chicago.
          </p>
        </div>
        <div className="chicago-image">
          <img src={MarioA} alt="Mario and Adrian at Little Lemon Chicago" />
        </div>
      </div>
    </section>
  );
}

export default Chicago;
