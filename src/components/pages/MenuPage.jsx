import React, { useState, useContext, createContext } from "react";
import lemonChicken from "../../assets/lemon-chicken.jpg";
import mediterraneanSalad from "../../assets/mediterranean-salad.jpg";
import baklava from "../../assets/baklava.jpg";
import chickenkarahi from "../../assets/chicken-karahi.jpg";
import beefbiryani from "../../assets/beef-biryani.png";
import seekhkabab from "../../assets/seekh-kabab.jpg";
import cheesehandi from "../../assets/cheese-handi.webp";
import beefnahari from "../../assets/beef-nihari.jpg";
import samosa from "../../assets/samosa.jpg";
import pakoras from "../../assets/pakoras.jpg";
import gulabjamun from "../../assets/gulab-jamun2.png";
import kulfi from "../../assets/kulfi.webp";
import mango from "../../assets/mango.jpg";
import mint from "../../assets/mint.jpg";
import falooda from "../../assets/falooda.jpg";

// Cart Context
const CartContext = createContext();

// Cart Provider
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const deleteFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        getTotalItems,
        getTotalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Menu Data
const menuData = {
  "Main Courses": [
    {
      id: 1,
      name: "Grilled Lemon Chicken",
      description:
        "Tender chicken marinated in lemon, herbs and Pakistani spices, grilled to perfection",
      price: 18.99,
      image: lemonChicken,
      category: "Main Courses",
      spicy: false,
      vegetarian: false,
      new: true,
    },
    {
      id: 14,
      name: "Beef Nihari",
      description:
        "Slow-cooked beef stew with aromatic spices, served with naan and garnished with ginger",
      price: 22.99,
      image: beefnahari,
      category: "Main Courses",
      spicy: false,
      vegetarian: false,
      new: false,
    },
    {
      id: 3,
      name: "Beef Biryani",
      description:
        "Fragrant basmati rice layered with tender beef and aromatic spices",
      price: 19.99,
      image: beefbiryani,
      category: "Main Courses",
      spicy: true,
      vegetarian: false,
      new: false,
    },
    {
      id: 2,
      name: "Chicken Karahi",
      description:
        "Traditional Pakistani chicken curry cooked in a wok with tomatoes and green chilies",
      price: 16.99,
      image: chickenkarahi,
      category: "Main Courses",
      spicy: true,
      vegetarian: false,
      new: false,
    },
    {
      id: 13,
      name: "Cheese Handi",
      description:
        "Rich and creamy cheese curry cooked in traditional clay pot with aromatic spices",
      price: 17.99,
      image: cheesehandi,
      category: "Main Courses",
      spicy: false,
      vegetarian: false,
      new: false,
    },
    {
      id: 4,
      name: "Seekh Kebab",
      description:
        "Ground lamb mixed with spices and grilled on skewers, served with naan",
      price: 21.99,
      image: seekhkabab,
      category: "Main Courses",
      spicy: false,
      vegetarian: false,
      new: false,
    },
  ],
  Appetizers: [
    {
      id: 5,
      name: "Mediterranean Salad",
      description:
        "Fresh mix of cucumbers, tomatoes, olives with Pakistani twist of mint and chaat masala",
      price: 12.99,
      image: mediterraneanSalad,
      category: "Appetizers",
      spicy: false,
      vegetarian: true,
      new: true,
    },
    {
      id: 6,
      name: "Samosa",
      description:
        "Crispy samosas topped with yogurt, chutneys and fresh herbs",
      price: 8.99,
      image: samosa,
      category: "Appetizers",
      spicy: true,
      vegetarian: true,
      new: false,
    },
    {
      id: 7,
      name: "Pakoras",
      description:
        "Mixed vegetable fritters served with mint and tamarind chutney",
      price: 9.99,
      image: pakoras,
      category: "Appetizers",
      spicy: true,
      vegetarian: true,
      new: false,
    },
  ],
  Desserts: [
    {
      id: 8,
      name: "Baklava Dessert",
      description:
        "Flaky layers of pastry with honey, nuts and a touch of cardamom",
      price: 7.99,
      image: baklava,
      category: "Desserts",
      spicy: false,
      vegetarian: false,
      new: true,
    },
    {
      id: 9,
      name: "Gulab Jamun",
      description: "Soft milk dumplings in sweet syrup, a Pakistani favorite",
      price: 6.99,
      image: gulabjamun,
      category: "Desserts",
      spicy: false,
      vegetarian: false,
      new: false,
    },
    {
      id: 10,
      name: "Kulfi",
      description:
        "Traditional Pakistani ice cream with pistachios and cardamom",
      price: 5.99,
      image: kulfi,
      category: "Desserts",
      spicy: false,
      vegetarian: false,
      new: false,
    },
  ],
  Beverages: [
    {
      id: 11,
      name: "Mango Lassi",
      description: "Creamy yogurt drink blended with sweet mangoes",
      price: 4.99,
      image: mango,
      category: "Beverages",
      spicy: false,
      vegetarian: false,
      new: false,
    },
    {
      id: 12,
      name: "Mint Lemonade",
      description: "Refreshing lemonade with fresh mint and a hint of salt",
      price: 3.99,
      image: mint,
      category: "Beverages",
      spicy: false,
      vegetarian: false,
      new: false,
    },
    {
      id: 15,
      name: "Falooda",
      description: "Sweet and creamy falooda with rose syrup and ice cream",
      price: 7.99,
      image: falooda,
      category: "Beverages",
      spicy: false,
      vegetarian: false,
      new: false,
    },
  ],
};

// Hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// MenuPage Component
export default function MenuPage({ onViewCart }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const { addToCart, getTotalItems } = useCart();
  const [addedItems, setAddedItems] = useState(new Set());
  const [focusedCard, setFocusedCard] = useState(null);

  const categories = Object.keys(menuData);
  const currentCategory = categories[selectedTab];
  const currentItems = menuData[currentCategory];

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  const handleAddToCart = (item, event) => {
    event.stopPropagation(); // Prevent card focus when clicking add to cart
    addToCart(item);

    // Visual feedback
    const button = event.target;
    button.style.transform = "scale(0.95)";
    button.style.backgroundColor = "#4caf50";
    button.innerHTML = "✓ Added!";

    setTimeout(() => {
      button.style.transform = "scale(1)";
      button.style.backgroundColor = "#495e57";
      button.innerHTML = "+ Add to Cart";
    }, 1000);

    // Add to recently added items for animation
    setAddedItems((prev) => new Set([...prev, item.id]));
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 2000);
  };

  const handleCardClick = (itemId) => {
    setFocusedCard(itemId);
    // Remove focus after 0.5 seconds
    setTimeout(() => {
      setFocusedCard(null);
    }, 500);
  };

  return (
    <div className="menu-page full-width-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="hero-title">Our Delicious Menu</h1>
          <p className="hero-subtitle">
            Authentic Pakistani cuisine with Mediterranean influences
          </p>
        </div>
      </div>

      {/* Menu Content */}
      <div className="menu-container">
        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => handleTabChange(index)}
              className={`tab-button ${selectedTab === index ? "active" : ""}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="menu-grid">
          {currentItems.map((item, index) => (
            <div
              key={item.id}
              className={`menu-item ${
                focusedCard === item.id ? "focused" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleCardClick(item.id)}
            >
              <img src={item.image} alt={item.name} className="item-image" />

              <div className="item-content">
                <div className="item-header">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-badges">
                    {item.spicy && <span className="badge spicy">Spicy</span>}
                    {item.vegetarian && <span className="badge veg">Veg</span>}
                    {item.new && <span className="badge new">New</span>}
                  </div>
                </div>

                <p className="item-description">{item.description}</p>

                <div className="item-footer">
                  <span className="item-price">${item.price}</span>

                  <button
                    onClick={(e) => handleAddToCart(item, e)}
                    className="add-to-cart-btn"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .menu-page {
          min-height: 100vh;
          background-color: #f8f9fa;
          overflow-x: hidden;
          width: 100%;
          max-width: 100vw;
          box-sizing: border-box;
        }

        /* Remove tap highlight on all interactive elements */
        .menu-page * {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .hero-section {
          background: linear-gradient(135deg, #495e57 0%, #3a4c47 100%);
          position: relative;
          overflow: hidden;
          min-height: 40vh;
          display: flex;
          align-items: center;
          color: white;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        @media (max-width: 480px) {
          .hero-section {
            min-height: 35vh;
          }
        }

        @media (max-width: 400px) {
          .hero-section {
            min-height: 30vh;
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            position: relative;
            left: 0;
            right: 0;
          }
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
              circle at 25% 25%,
              rgba(244, 206, 20, 0.1) 0%,
              transparent 25%
            ),
            radial-gradient(
              circle at 75% 75%,
              rgba(244, 206, 20, 0.08) 0%,
              transparent 25%
            );
          pointer-events: none;
          width: 100%;
        }

        @media (max-width: 400px) {
          .hero-background {
            width: 100vw;
            left: 0;
            right: 0;
          }
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 480px) {
          .hero-content {
            padding: 0 15px;
          }
        }

        @media (max-width: 400px) {
          .hero-content {
            padding: 0 10px;
          }
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          animation: fadeInUp 1s ease-out;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }
        }

        @media (max-width: 400px) {
          .hero-title {
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
          }
        }

        .hero-subtitle {
          font-size: 1.3rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
          animation: fadeInUp 1s ease-out 0.3s both;
        }

        @media (max-width: 768px) {
          .hero-subtitle {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-subtitle {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 400px) {
          .hero-subtitle {
            font-size: 1rem;
            padding: 0 10px;
          }
        }

        .menu-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 20px;
        }

        @media (max-width: 480px) {
          .menu-container {
            padding: 2rem 15px;
          }
        }

        @media (max-width: 400px) {
          .menu-container {
            padding: 1.5rem 10px;
          }
        }

        .category-tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 1rem 0;
        }

        @media (max-width: 480px) {
          .category-tabs {
            gap: 0.5rem;
            margin-bottom: 2rem;
            padding: 1rem 0;
          }
        }

        @media (max-width: 400px) {
          .category-tabs {
            gap: 0.25rem;
            margin-bottom: 1.5rem;
            padding: 1.5rem 5px 1rem 5px;
          }
        }

        .tab-button {
          padding: 1rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          background-color: white;
          color: #666;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          outline: none;
        }

        @media (max-width: 480px) {
          .tab-button {
            padding: 0.8rem 1.5rem;
            font-size: 0.9rem;
            border-radius: 20px;
          }
        }

        @media (max-width: 400px) {
          .tab-button {
            padding: 0.6rem 1rem;
            font-size: 0.8rem;
            border-radius: 15px;
            white-space: nowrap;
          }
        }

        .tab-button:hover {
          background-color: #f0f0f0;
          transform: translateY(-2px);
        }

        .tab-button.active {
          background-color: #f4ce14;
          color: #495e57;
          box-shadow: 0 4px 15px rgba(244, 206, 20, 0.3);
          transform: translateY(-2px);
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          animation: fadeInUp 0.8s ease-out;
        }

        @media (max-width: 480px) {
          .menu-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 400px) {
          .menu-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 0 5px;
          }
        }

        .menu-item {
          background-color: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
          overflow: hidden;
          cursor: pointer;
          animation: fadeInUp 0.8s ease-out both;
          outline: none;
          position: relative;
          flex-shrink: 0;
          min-width: 300px;
          width: 100%;
          max-width: 100%;
        }

        @media (max-width: 480px) {
          .menu-item {
            min-width: unset;
            border-radius: 16px;
          }
        }

        @media (max-width: 400px) {
          .menu-item {
            min-width: unset;
            border-radius: 12px;
            margin: 0 auto;
            max-width: calc(100vw - 20px);
          }
        }

        .menu-item:hover {
          transform: translateY(-8px) scale(1.005);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .menu-item.focused {
          transform: translateY(-12px) scale(1.01);
          box-shadow: 0 25px 50px rgba(244, 206, 20, 0.4),
            0 0 0 3px rgba(244, 206, 20, 0.3),
            inset 0 0 20px rgba(244, 206, 20, 0.1);
          border: 2px solid rgba(244, 206, 20, 0.5);
        }

        .menu-item.focused::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            rgba(244, 206, 20, 0.03) 0%,
            transparent 50%,
            rgba(244, 206, 20, 0.03) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .item-content {
          position: relative;
          z-index: 2;
        }

        .item-image {
          width: 100%;
          height: 240px;
          object-fit: cover;
        }

        @media (max-width: 480px) {
          .item-image {
            height: 200px;
          }
        }

        @media (max-width: 400px) {
          .item-image {
            height: 180px;
          }
        }

        .item-content {
          padding: 1.5rem;
          transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        @media (max-width: 480px) {
          .item-content {
            padding: 1.25rem;
          }
        }

        @media (max-width: 400px) {
          .item-content {
            padding: 1rem;
          }
        }

        .item-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
          transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .item-name {
          font-size: 1.3rem;
          font-weight: 600;
          color: #495e57;
          margin: 0;
          transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        @media (max-width: 480px) {
          .item-name {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 400px) {
          .item-name {
            font-size: 1.1rem;
          }
        }

        .item-badges {
          display: flex;
          gap: 0.5rem;
        }

        .badge {
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 500;
          color: white;
        }

        .badge.spicy {
          background-color: #ff5722;
        }

        .badge.veg {
          background-color: #4caf50;
        }

        .badge.new {
          background-color: #2f78ccff;
        }

        .item-description {
          color: #666;
          margin-bottom: 1rem;
          line-height: 1.6;
          font-size: 0.9rem;
          transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        @media (max-width: 480px) {
          .item-description {
            font-size: 0.85rem;
            line-height: 1.5;
          }
        }

        @media (max-width: 400px) {
          .item-description {
            font-size: 0.8rem;
            line-height: 1.4;
            margin-bottom: 0.75rem;
          }
        }

        .item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        @media (max-width: 480px) {
          .item-footer {
            gap: 0.75rem;
            flex-wrap: wrap;
          }
        }

        @media (max-width: 400px) {
          .item-footer {
            gap: 0.5rem;
            flex-direction: column;
            align-items: stretch;
          }
        }

        .item-price {
          background-color: #f4ce14;
          color: #495e57;
          font-weight: 700;
          font-size: 1.1rem;
          padding: 8px 16px;
          border-radius: 20px;
        }

        @media (max-width: 480px) {
          .item-price {
            font-size: 1rem;
            padding: 6px 14px;
          }
        }

        @media (max-width: 400px) {
          .item-price {
            font-size: 0.95rem;
            padding: 6px 12px;
            text-align: center;
            align-self: center;
          }
        }

        .add-to-cart-btn {
          background-color: #495e57;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          outline: none;
        }

        @media (max-width: 480px) {
          .add-to-cart-btn {
            padding: 10px 20px;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 400px) {
          .add-to-cart-btn {
            padding: 10px 16px;
            font-size: 0.8rem;
            width: 100%;
            margin-top: 0.5rem;
          }
        }

        .add-to-cart-btn:hover {
          background-color: #3a4c47;
          transform: translateY(-2px);
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
