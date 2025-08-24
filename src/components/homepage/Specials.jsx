import '../../App.css';
import lemonChicken from '../../assets/lemon-chicken.jpg';
import mediterraneanSalad from '../../assets/mediterranean-salad.jpg';
import baklava from '../../assets/baklava.jpg';

function Specials() {
  const specials = [
    {
      name: 'Grilled Lemon Chicken',
      description: 'Tender chicken grilled with lemon and herbs.',
      image: lemonChicken,
    },
    {
      name: 'Mediterranean Salad',
      description: 'A fresh mix of cucumbers, tomatoes, and olives.',
      image: mediterraneanSalad,
    },
    {
      name: 'Baklava Dessert',
      description: 'Flaky layers of pastry with honey and nuts.',
      image: baklava,
    },
  ];

  return (
    <section className="specials">
      <h2>This Week's Specials</h2>
      <div className="specials-grid">
        {specials.map((item, index) => (
          <div className="special-card" key={index}>
            <img src={item.image} alt={item.name} className="special-img" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Specials;
