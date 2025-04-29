function CustomersSay() {
  const testimonials = [
    {
      name: "Sarah L.",
      feedback: "The food was absolutely amazing and the atmosphere was perfect!",
      image: "https://i.pravatar.cc/100?img=32",
    },
    {
      name: "James D.",
      feedback: "A hidden gem in Chicago. Highly recommended!",
      image: "https://i.pravatar.cc/100?img=45",
    },
    {
      name: "Emily R.",
      feedback: "Service was top-notch and the dishes were bursting with flavor!",
      image: "https://i.pravatar.cc/100?img=12",
    },
    {
      name: "Mark T.",
      feedback: "Beautiful decor and unforgettable dining experience!",
      image: "https://i.pravatar.cc/100?img=20",
    },
  ];

  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <img src={item.image} alt={item.name} className="testimonial-img" />
            <p className="testimonial-feedback">"{item.feedback}"</p>
            <p className="testimonial-name">- {item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CustomersSay;
