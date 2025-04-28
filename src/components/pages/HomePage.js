import CallToAction from '../homepage/CallToAction';
import Chicago from '../homepage/Chicago';
import CustomersSay from '../homepage/CustomersSay';
import Specials from '../homepage/Specials';

function HomePage() {
  return (
    <main className="home-page">
      <CallToAction />
      <Specials />
      <CustomersSay />
      <Chicago />
    </main>
  );
}

export default HomePage;
