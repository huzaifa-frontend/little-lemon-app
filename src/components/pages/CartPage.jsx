import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useCart } from "./MenuPage";
import { useNavigate } from "react-router-dom";
import { Fade, Slide, Zoom } from "@mui/material";

export default function CartPage({ onBackToMenu, onClose }) {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = useCart();

  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderItems, setOrderItems] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isPageFadingIn, setIsPageFadingIn] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  // Toast timer
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Inject global toast styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .toast {
        position: fixed !important;
        top: 1rem !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        background: #2e7d32 !important;
        z-index: 999999999 !important;
        color: white !important;
        padding: 1rem 1.5rem !important;
        border-radius: 12px !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2) !important;
        display: flex !important;
        align-items: center !important;
        gap: 1rem !important;
        min-width: 300px !important;
        max-width: 400px !important;
        animation: slideDown 0.4s ease !important;
        font-weight: 600 !important;
        pointer-events: auto !important;
        font-size: 1rem !important;
        backdrop-filter: blur(10px) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Don't auto-hide success message when cart becomes empty
  // This prevents the success message from disappearing when we clear the cart after order

  const handleCheckout = async () => {
    setIsCheckingOut(true);

    // Calculate final total before clearing cart
    const subtotal = getTotalPrice();
    const deliveryFee = 2.99;
    const tax = (subtotal + deliveryFee) * 0.0825;
    const finalTotal = subtotal + deliveryFee + tax;
    setOrderTotal(finalTotal);
    // Save cart items for receipt printing
    setOrderItems([...cartItems]);

    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Set order placed first, then clear cart after a short delay
    setOrderPlaced(true);
    setShowToast(true);
    setIsCheckingOut(false);

    // Staggered animation sequence like ConfirmedBooking
    const timeouts = [
      setTimeout(() => setAnimationStep(1), 300),
      setTimeout(() => setAnimationStep(2), 600),
      setTimeout(() => setAnimationStep(3), 900),
    ];

    // Clear cart after showing success message
    setTimeout(() => {
      clearCart();
    }, 100);

    // Scroll to top when order is placed
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCloseSuccessMessage = () => {
    setIsFadingOut(true);
    setIsTransitioning(true);

    // Wait for fade-out animation to complete
    setTimeout(() => {
      setOrderPlaced(false);
      setOrderTotal(0);
      setOrderItems([]);
      setIsFadingOut(false);
      setIsPageFadingIn(true);
      setAnimationStep(0); // Reset animation step

      // Remove fade-in class after animation and clear transitioning
      setTimeout(() => {
        setIsPageFadingIn(false);
        setIsTransitioning(false);
      }, 600);
    }, 500);
  };

  const handleBrowseMoreItems = () => {
    setIsFadingOut(true);
    setIsTransitioning(true);

    // Wait for fade-out animation to complete, then navigate immediately
    setTimeout(() => {
      // Reset animation step before navigation
      setAnimationStep(0);
      // Navigate immediately without clearing states first
      navigate("/menu");
    }, 500);
  };

  const handleQuantityChange = (item, action) => {
    if (action === "increase") {
      addToCart(item);
    } else if (action === "decrease") {
      removeFromCart(item.id);
    }
  };

  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  const subtotal = getTotalPrice();
  const deliveryFee = 2.99;
  const tax = (subtotal + deliveryFee) * 0.0825;
  const finalTotal = subtotal + deliveryFee + tax;

  // Floating particles component for success animation
  const FloatingParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          width: "6px",
          height: "6px",
          backgroundColor: "#F4CE14",
          borderRadius: "50%",
          animation: `float${i % 3} ${3 + (i % 3)}s ease-in-out infinite`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: 0.7,
        }}
      />
    ));

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {particles}
      </div>
    );
  };

  if (orderPlaced) {
    return (
      <div
        className={`cart-page success-page ${
          isFadingOut ? "page-fade-out" : ""
        }`}
      >
        <FloatingParticles />
        <Fade in timeout={1000}>
          <div className={`order-success ${isFadingOut ? "fade-out" : ""}`}>
            <button
              onClick={handleCloseSuccessMessage}
              className="close-success-btn"
              aria-label="Close"
              disabled={isFadingOut}
            >
              ×
            </button>

            <div className="success-animation">
              <Zoom in={animationStep >= 1} timeout={800}>
                <div className="checkmark">✓</div>
              </Zoom>
            </div>

            <Slide direction="down" in={animationStep >= 2} timeout={600}>
              <div>
                <h2>Order Placed Successfully!</h2>
                <p>
                  Thank you for your order! Your delicious meal is being
                  prepared with love and will be ready soon.
                </p>
              </div>
            </Slide>

            <Fade in={animationStep >= 3} timeout={800}>
              <div className="order-total">
                Total Paid: <strong>${formatPrice(orderTotal)}</strong>
              </div>
            </Fade>

            <Slide direction="up" in={animationStep >= 3} timeout={800}>
              <div className="success-actions">
                <button onClick={handlePrint} className="print-btn">
                  Print Receipt
                </button>
                <button
                  onClick={handleBrowseMoreItems}
                  className="continue-btn"
                  disabled={isFadingOut}
                >
                  Browse More Items
                </button>
              </div>
            </Slide>
          </div>
        </Fade>

        {showToast &&
          ReactDOM.createPortal(
            <div className="toast">
              <div className="toast-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="white"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 2L6 12l-4-4 1.5-1.5L6 9l8.5-8.5z" />
                </svg>
              </div>
              <span className="toast-message">Order confirmed!</span>
              <button
                className="toast-close"
                onClick={() => setShowToast(false)}
              >
                ×
              </button>
            </div>,
            document.body
          )}

        {/* Hidden Print Receipt */}
        <div className="print-only-receipt" style={{ display: "none" }}>
          <div className="receipt-header">
            <h1>🍋 Little Lemon Restaurant</h1>
            <p>📍 123 Mediterranean Ave, Chicago, IL 60614</p>
            <p>📞 (555) 123-LEMON</p>
            <hr />
          </div>

          <div className="receipt-details">
            <p>
              <strong>Order #:</strong> LL{Date.now().toString().slice(-6)}
            </p>
            <p>
              <strong>Date:</strong> {new Date().toLocaleDateString()}{" "}
              {new Date().toLocaleTimeString()}
            </p>
            <p>
              <strong>Customer:</strong> Takeout Order
            </p>
            <hr />
          </div>

          <div className="receipt-items">
            <h3>ORDER ITEMS</h3>
            {orderItems.map((item, index) => (
              <div key={index} className="receipt-item">
                <div className="item-line">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">
                    ${formatPrice(item.price * item.quantity)}
                  </span>
                </div>
                <div className="item-details">
                  <span>
                    Qty: {item.quantity} × ${formatPrice(item.price)}
                  </span>
                </div>
              </div>
            ))}
            <hr />
          </div>

          <div className="receipt-totals">
            <div className="total-line">
              <span>Subtotal:</span>
              <span>
                $
                {formatPrice(
                  orderItems.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  )
                )}
              </span>
            </div>
            <div className="total-line">
              <span>Delivery Fee:</span>
              <span>${formatPrice(2.99)}</span>
            </div>
            <div className="total-line">
              <span>Tax (8.25%):</span>
              <span>
                $
                {formatPrice(
                  (orderItems.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  ) +
                    2.99) *
                    0.0825
                )}
              </span>
            </div>
            <hr />
            <div className="total-line final-total">
              <span>
                <strong>TOTAL:</strong>
              </span>
              <span>
                <strong>${formatPrice(orderTotal)}</strong>
              </span>
            </div>
          </div>

          <div className="receipt-footer">
            <hr />
            <p>Thank you for choosing Little Lemon!</p>
            <p>Your order is being prepared with fresh ingredients.</p>
            <p>Est. preparation time: 15-20 minutes</p>
            <hr />
            <p style={{ fontSize: "0.8em", textAlign: "center" }}>
              Visit us at littlelemon.com
              <br />
              Follow us @littlelemonrestaurant
            </p>
          </div>
        </div>

        <style jsx>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-only-receipt,
            .print-only-receipt * {
              visibility: visible;
            }
            .print-only-receipt {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              background: white !important;
              padding: 20px !important;
              display: block !important;
              font-family: "Courier New", monospace;
              font-size: 12px;
              line-height: 1.4;
              max-height: 100vh;
              overflow: hidden;
              page-break-inside: avoid;
            }
            .print-only-receipt {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              background: white !important;
              padding: 15px !important;
              display: block !important;
              font-family: "Courier New", monospace;
              font-size: 11px;
              line-height: 1.3;
              max-height: 95vh;
              overflow: hidden;
              page-break-inside: avoid;
              page-break-after: avoid;
            }
            .receipt-header h1 {
              text-align: center;
              margin: 0 0 8px 0;
              font-size: 16px;
              font-weight: bold;
            }
            .receipt-header p {
              text-align: center;
              margin: 1px 0;
              font-size: 10px;
            }
            .receipt-details p {
              margin: 2px 0;
              font-size: 10px;
            }
            .receipt-items h3 {
              margin: 8px 0 4px 0;
              font-size: 12px;
              font-weight: bold;
            }
            .receipt-item {
              margin: 6px 0;
            }
            .item-line {
              display: flex;
              justify-content: space-between;
              font-weight: bold;
              align-items: center;
            }
            .item-name {
              flex: 1;
              text-align: left;
            }
            .item-price {
              text-align: right;
              min-width: 50px;
            }
            .item-details {
              font-size: 9px;
              color: #666;
              text-align: right;
              margin-top: 1px;
            }
            .total-line {
              display: flex;
              justify-content: space-between;
              margin: 3px 0;
              font-size: 10px;
            }
            .final-total {
              font-size: 12px;
              font-weight: bold;
              margin-top: 6px;
            }
            .receipt-footer p {
              text-align: center;
              margin: 3px 0;
              font-size: 9px;
            }
            hr {
              border: none;
              border-top: 1px dashed #333;
              margin: 5px 0;
            }
            @page {
              margin: 0.3in;
              size: A4 portrait;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            @media print {
              * {
                page-break-inside: avoid !important;
                page-break-after: avoid !important;
              }
            }
          }

          .success-page {
            background: linear-gradient(135deg, #6c9a8b 0%, #2c3e50 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            margin: 0;
            min-height: 100vh;
            width: 100vw;
            position: relative;
            margin-left: calc(-50vw + 50%);
            margin-right: calc(-50vw + 50%);
            z-index: 1;
            overflow: hidden;
          }

          .order-success {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            padding: 4rem;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.2);
            max-width: min(90vw, 600px);
            width: 100%;
            animation: scaleIn 0.5s ease-out;
            position: relative;
            z-index: 1;
          }

          @media (max-width: 768px) {
            .success-page {
              padding: 1rem;
            }

            .order-success {
              padding: 2rem 1.5rem;
              border-radius: 16px;
              max-width: 95vw;
            }
          }

          .close-success-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: transparent;
            border: none;
            font-size: 2rem;
            color: #666;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            -webkit-tap-highlight-color: transparent;
            outline: none;
          }

          .close-success-btn:hover {
            background: rgba(0, 0, 0, 0.1);
            color: #333;
            transform: scale(1.1);
          }

          .success-animation {
            margin-bottom: 2rem;
          }

          .checkmark {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: #4caf50;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: bold;
            margin: 0 auto;
            box-shadow: 0 8px 24px rgba(76, 175, 80, 0.3);
            animation: pulse 2s ease-in-out infinite;
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 8px 24px rgba(76, 175, 80, 0.3);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 12px 32px rgba(76, 175, 80, 0.4);
            }
          }
          }

          @media (max-width: 768px) {
            .checkmark {
              width: 60px;
              height: 60px;
              font-size: 1.5rem;
            }
          }

          .order-success h2 {
            color: #495e57;
            margin-bottom: 1rem;
            font-size: clamp(1.5rem, 4vw, 1.8rem);
            font-weight: 700;
          }

          .order-success p {
            color: #666;
            margin-bottom: 2rem;
            line-height: 1.6;
            font-size: clamp(1rem, 3vw, 1.1rem);
            padding: 0 1rem;
          }

          .order-total {
            background: #f4ce14;
            color: #495e57;
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            font-size: clamp(1.1rem, 3.5vw, 1.2rem);
            font-weight: 600;
            margin-bottom: 2rem;
            display: inline-block;
          }

          .success-actions {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
          }

          .print-btn {
            background: #495e57;
            color: white;
            border: none;
            padding: 1.2rem 3rem;
            border-radius: 12px;
            font-size: clamp(1rem, 3vw, 1.2rem);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 200px;
            -webkit-tap-highlight-color: transparent;
            outline: none;
            box-shadow: 0 8px 24px rgba(73, 94, 87, 0.3);
          }

          .print-btn:hover {
            background: #364643;
            transform: translateY(-2px);
            box-shadow: 0 12px 32px rgba(73, 94, 87, 0.4);
          }

          .continue-btn {
            background: #495e57;
            color: white;
            border: none;
            padding: 1.2rem 3rem;
            border-radius: 12px;
            font-size: clamp(1rem, 3vw, 1.2rem);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 200px;
            -webkit-tap-highlight-color: transparent;
            outline: none;
            box-shadow: 0 8px 24px rgba(73, 94, 87, 0.3);
          }

          .toast {
            position: fixed !important;
            top: 1rem !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            background: #2e7d32 !important;
            z-index: 999999999 !important;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 1rem;
            min-width: 300px;
            max-width: 400px;
            animation: slideDown 0.4s ease;
            font-weight: 600;
            pointer-events: auto;
            font-size: 1rem;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .toast-icon svg {
            display: block;
          }

          .toast-message {
            flex: 1;
          }

          .toast-close {
            background: transparent;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            transition: transform 0.2s;
          }

          .toast-close:hover {
            transform: scale(1.2);
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translate(-50%, -40px);
            }
            to {
              opacity: 1;
              transform: translate(-50%, 0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes scaleIn {
            from {
              transform: scale(0.8);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes fadeOut {
            from {
              transform: scale(1);
              opacity: 1;
            }
            to {
              transform: scale(0.95);
              opacity: 0;
            }
          }

          @keyframes fadeInPage {
            from {
              transform: scale(0.98);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          .order-success.fade-out {
            animation: fadeOut 0.4s ease-in-out forwards;
          }

          .success-page.page-fade-out {
            animation: fadeOut 0.4s ease-in-out forwards;
          }

          .close-success-btn:disabled,
          .continue-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            pointer-events: none;
          }

          .cart-page.page-fade-in {
            animation: fadeInPage 0.5s ease-out;
          }

          .transition-page {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          }

          .transition-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            z-index: 9999;
          }

          .transition-overlay.fade-out {
            animation: fadeOut 0.4s ease-in-out forwards;
          }

          @media (max-width: 768px) {
            .continue-btn {
              padding: 1rem 2rem;
              min-width: 150px;
              font-size: 1rem;
            }

            .print-btn {
              padding: 1rem 2rem;
              min-width: 150px;
              font-size: 1rem;
            }

            .success-actions {
              flex-direction: column;
              align-items: center;
              gap: 0.8rem;
            }
          }

          .continue-btn:hover {
            background: #364643;
            transform: translateY(-2px);
            box-shadow: 0 12px 32px rgba(73, 94, 87, 0.4);
          }

          @keyframes scaleIn {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes pulse {
            0%,
            100% {
              transform: scale(1);
              box-shadow: 0 8px 24px rgba(76, 175, 80, 0.3);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 12px 32px rgba(76, 175, 80, 0.4);
            }
          }

          @keyframes float0 {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
            }
          }

          @keyframes float1 {
            0%,
            100% {
              transform: translateX(0px) rotate(0deg);
            }
            50% {
              transform: translateX(20px) rotate(180deg);
            }
          }

          @keyframes float2 {
            0%,
            100% {
              transform: translate(0px, 0px) rotate(0deg);
            }
            33% {
              transform: translate(10px, -10px) rotate(120deg);
            }
            66% {
              transform: translate(-10px, 10px) rotate(240deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // Show transition screen while navigating to prevent flash
  if (isTransitioning && !orderPlaced && !isPageFadingIn) {
    return (
      <div className="cart-page transition-page">
        <div className="transition-overlay fade-out"></div>
      </div>
    );
  }

  return (
    <div
      className={`cart-page full-width-page ${
        isPageFadingIn ? "page-fade-in" : ""
      }`}
    >
      {/* Header */}
      <div className="cart-header">
        <div className="header-content">
          {onBackToMenu && (
            <button onClick={onBackToMenu} className="back-button">
              ← Back to Menu
            </button>
          )}
          <h1 className="cart-title">Your Cart ({getTotalItems()} items)</h1>
          {onClose && (
            <button onClick={onClose} className="close-button">
              ×
            </button>
          )}
        </div>
      </div>

      <div className="cart-container">
        {cartItems.length === 0 && !orderPlaced ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some delicious items from our menu to get started!</p>
            {onBackToMenu && (
              <button onClick={onBackToMenu} className="browse-menu-btn">
                Browse Menu
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="cart-items">
              <h2 className="section-title">Order Items</h2>
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="cart-item"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-image"
                  />

                  <div className="item-details">
                    <div className="item-info">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-price-each">
                        ${formatPrice(item.price)} each
                      </p>
                    </div>

                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button
                          onClick={() => handleQuantityChange(item, "decrease")}
                          className="quantity-btn decrease"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>

                        <span className="quantity">{item.quantity}</span>

                        <button
                          onClick={() => handleQuantityChange(item, "increase")}
                          className="quantity-btn increase"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => deleteFromCart(item.id)}
                        className="delete-button"
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <div className="item-total">
                    <span className="total-price">
                      ${formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h2 className="section-title">Order Summary</h2>

              <div className="summary-content">
                <div className="summary-row">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${formatPrice(subtotal)}</span>
                </div>

                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>${formatPrice(deliveryFee)}</span>
                </div>

                <div className="summary-row">
                  <span>Tax (8.25%)</span>
                  <span>${formatPrice(tax)}</span>
                </div>

                <hr className="summary-divider" />

                <div className="summary-row total">
                  <span>Total</span>
                  <span>${formatPrice(finalTotal)}</span>
                </div>

                <div className="action-buttons">
                  <button
                    onClick={clearCart}
                    className="clear-cart-btn"
                    disabled={isCheckingOut}
                  >
                    Clear Cart
                  </button>

                  <button
                    onClick={handleCheckout}
                    className="checkout-btn"
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <>
                        <span className="spinner"></span>
                        Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .cart-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, sans-serif;
          overflow-x: hidden;
        }

        @media (max-width: 415px) {
          .cart-page {
            padding: 0;
          }
        }

        /* Remove tap highlight on all interactive elements */
        .cart-page * {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          outline: none;
        }

        .cart-header {
          background: linear-gradient(135deg, #495e57 0%, #3a4c47 100%);
          color: white;
          padding: 1.5rem 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          position: relative;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        @media (max-width: 768px) {
          .header-content {
            padding: 0 1rem;
          }
        }

        @media (max-width: 480px) {
          .header-content {
            padding: 0 0.8rem;
          }
        }

        @media (max-width: 415px) {
          .header-content {
            padding: 0 0.6rem;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .cart-header {
            padding: 1.2rem 0;
          }
        }

        @media (max-width: 375px) {
          .header-content {
            padding: 0 0.5rem;
          }

          .cart-header {
            padding: 1rem 0;
          }
        }

        .cart-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
          flex: 1;
          text-align: center;
        }

        @media (max-width: 768px) {
          .cart-title {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .cart-title {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 415px) {
          .cart-title {
            font-size: 1.2rem;
            line-height: 1.3;
          }
        }

        @media (max-width: 375px) {
          .cart-title {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 320px) {
          .cart-title {
            font-size: 1rem;
          }
        }

        .back-button,
        .close-button {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        @media (max-width: 768px) {
          .back-button {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .back-button {
            padding: 0.5rem 0.8rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 415px) {
          .back-button {
            padding: 0.5rem 0.7rem;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 375px) {
          .back-button {
            padding: 0.4rem 0.6rem;
            font-size: 0.75rem;
          }
        }

        @media (max-width: 320px) {
          .back-button {
            padding: 0.4rem 0.5rem;
            font-size: 0.7rem;
          }
        }

        .back-button:hover,
        .close-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .close-button {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          padding: 0;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .close-button {
            width: 40px;
            height: 40px;
            font-size: 1.3rem;
          }
        }

        @media (max-width: 480px) {
          .close-button {
            width: 35px;
            height: 35px;
            font-size: 1.2rem;
          }
        }

        @media (max-width: 415px) {
          .close-button {
            width: 32px;
            height: 32px;
            font-size: 1.1rem;
          }
        }

        @media (max-width: 375px) {
          .close-button {
            width: 30px;
            height: 30px;
            font-size: 1rem;
          }
        }

        @media (max-width: 320px) {
          .close-button {
            width: 28px;
            height: 28px;
            font-size: 0.9rem;
          }
        }

        .cart-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 20px;
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 3rem;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .cart-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2rem 1rem;
          }
        }

        @media (max-width: 768px) {
          .cart-container {
            padding: 1.5rem 0.8rem;
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .cart-container {
            padding: 1rem 0.6rem;
            gap: 1rem;
          }
        }

        @media (max-width: 415px) {
          .cart-container {
            padding: 0.8rem 0.5rem;
            gap: 0.8rem;
          }
        }

        @media (max-width: 375px) {
          .cart-container {
            padding: 0.6rem 0.4rem;
            gap: 0.6rem;
          }
        }

        @media (max-width: 320px) {
          .cart-container {
            padding: 0.5rem 0.3rem;
            gap: 0.5rem;
          }
        }

        .empty-cart {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          animation: fadeInUp 0.6s ease-out;
        }

        .empty-cart-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.3;
          animation: float 3s ease-in-out infinite;
        }

        .empty-cart h2 {
          color: #495e57;
          margin-bottom: 1rem;
          font-size: 1.8rem;
        }

        .empty-cart p {
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .browse-menu-btn {
          background: #f4ce14;
          color: #495e57;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .browse-menu-btn:hover {
          background: #e6b800;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(244, 206, 20, 0.3);
        }

        .cart-items {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          animation: fadeInUp 0.6s ease-out;
        }

        @media (max-width: 768px) {
          .cart-items {
            padding: 1.5rem;
            border-radius: 16px;
          }
        }

        @media (max-width: 480px) {
          .cart-items {
            padding: 1rem;
            border-radius: 12px;
          }
        }

        @media (max-width: 415px) {
          .cart-items {
            padding: 0.8rem;
            border-radius: 10px;
          }
        }

        @media (max-width: 375px) {
          .cart-items {
            padding: 0.6rem;
            border-radius: 8px;
          }
        }

        .section-title {
          color: #495e57;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          text-align: center;
          position: relative;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 1.3rem;
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 1.2rem;
            margin-bottom: 1rem;
          }
        }

        @media (max-width: 415px) {
          .section-title {
            font-size: 1.1rem;
            margin-bottom: 0.8rem;
          }
        }

        @media (max-width: 375px) {
          .section-title {
            font-size: 1rem;
            margin-bottom: 0.6rem;
          }
        }

        .section-title::after {
          content: "";
          width: 50px;
          height: 3px;
          background: #f4ce14;
          display: block;
          margin: 0.5rem auto 0;
          border-radius: 2px;
        }

        .cart-item {
          display: flex;
          gap: 0.7rem;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 16px;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          animation: slideInUp 0.5s ease-out both;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          align-items: center;
        }

        @media (max-width: 768px) {
          .cart-item {
            padding: 1rem;
            gap: 0.6rem;
            flex-direction: row;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .cart-item {
            padding: 0.8rem;
            gap: 0.6rem;
          }
        }

        @media (max-width: 415px) {
          .cart-item {
            padding: 0.6rem;
            gap: 0.5rem;
            margin-bottom: 1rem;
          }
        }

        @media (max-width: 375px) {
          .cart-item {
            padding: 0.5rem;
            gap: 0.4rem;
            margin-bottom: 0.8rem;
          }
        }

        @media (max-width: 320px) {
          .cart-item {
            padding: 0.4rem;
            gap: 0.3rem;
            flex-direction: column;
            align-items: stretch;
            text-align: center;
          }
        }

        .cart-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          border-color: #f4ce14;
        }

        .cart-item:last-child {
          margin-bottom: 0;
        }

        .item-image {
          width: 100px;
          height: 100px;
          border-radius: 12px;
          object-fit: cover;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .item-image {
            width: 85px;
            height: 85px;
            border-radius: 10px;
          }
        }

        @media (max-width: 480px) {
          .item-image {
            width: 75px;
            height: 75px;
            border-radius: 8px;
          }
        }

        @media (max-width: 415px) {
          .item-image {
            width: 65px;
            height: 65px;
            border-radius: 6px;
          }
        }

        @media (max-width: 375px) {
          .item-image {
            width: 60px;
            height: 60px;
            border-radius: 6px;
          }
        }

        @media (max-width: 320px) {
          .item-image {
            width: 55px;
            height: 55px;
            border-radius: 6px;
            align-self: center;
          }
        }

        .item-details {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          min-width: 0;
          flex: 1;
          justify-content: flex-start;
        }

        .item-info {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          margin: 0;
          padding: 0;
          text-align: left;
          align-items: flex-start;
        }

        .item-actions {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-top: auto;
        }

        @media (max-width: 768px) {
          .item-actions {
            gap: 0.6rem;
          }
        }

        @media (max-width: 480px) {
          .item-actions {
            gap: 0.5rem;
          }
        }

        @media (max-width: 415px) {
          .item-actions {
            gap: 0.4rem;
          }
        }

        @media (max-width: 375px) {
          .item-actions {
            gap: 0.3rem;
          }
        }

        @media (max-width: 320px) {
          .item-actions {
            gap: 0.5rem;
            justify-content: center;
            margin-top: 0.5rem;
          }
        }

        .item-name {
          color: #495e57;
          font-size: 1.4rem;
          font-weight: 700;
          margin: 0;
          line-height: 1.3;
          text-align: left;
        }

        @media (max-width: 768px) {
          .item-name {
            font-size: 1.3rem;
            line-height: 1.2;
          }
        }

        @media (max-width: 480px) {
          .item-name {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 415px) {
          .item-name {
            font-size: 1.1rem;
            line-height: 1.3;
          }
        }

        @media (max-width: 375px) {
          .item-name {
            font-size: 1rem;
          }
        }

        @media (max-width: 320px) {
          .item-name {
            font-size: 0.9rem;
            text-align: center;
          }
        }

        .delete-button {
          background: transparent;
          border: 2px solid transparent;
          color: #999;
          cursor: pointer;
          font-size: 1rem;
          padding: 0.4rem;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .delete-button {
            font-size: 0.9rem;
            padding: 0.35rem;
          }
        }

        .delete-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f4ce14, #e6b800);
          opacity: 0;
          border-radius: 8px;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .delete-button:hover {
          color: #495e57;
          border-color: #f4ce14;
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 4px 12px rgba(244, 206, 20, 0.3);
        }

        .delete-button:hover::before {
          opacity: 0.15;
        }

        .item-price-each {
          color: #666;
          font-size: 1rem;
          margin: 0;
          font-weight: 500;
          text-align: left;
        }

        @media (max-width: 768px) {
          .item-price-each {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 415px) {
          .item-price-each {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 375px) {
          .item-price-each {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 320px) {
          .item-price-each {
            text-align: center;
          }
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .quantity-controls {
            gap: 0.8rem;
          }
        }

        @media (max-width: 415px) {
          .quantity-controls {
            gap: 0.6rem;
          }
        }

        @media (max-width: 375px) {
          .quantity-controls {
            gap: 0.5rem;
          }
        }

        .quantity-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .quantity-btn {
            width: 34px;
            height: 34px;
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .quantity-btn {
            width: 32px;
            height: 32px;
            font-size: 1rem;
          }
        }

        @media (max-width: 415px) {
          .quantity-btn {
            width: 30px;
            height: 30px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 375px) {
          .quantity-btn {
            width: 28px;
            height: 28px;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 320px) {
          .quantity-btn {
            width: 26px;
            height: 26px;
            font-size: 0.8rem;
          }
        }

        .quantity-btn.decrease {
          background: #e0e0e0;
          color: #495e57;
        }

        .quantity-btn.decrease:hover:not(:disabled) {
          background: #d0d0d0;
          transform: scale(1.1);
        }

        .quantity-btn.decrease:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .quantity-btn.increase {
          background: #f4ce14;
          color: #495e57;
        }

        .quantity-btn.increase:hover {
          background: #e6b800;
          transform: scale(1.1);
        }

        .quantity {
          font-weight: 700;
          font-size: 1.2rem;
          color: #495e57;
          min-width: 30px;
          text-align: center;
          background: rgba(244, 206, 20, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 8px;
        }

        @media (max-width: 768px) {
          .quantity {
            font-size: 1.1rem;
            padding: 0.2rem 0.6rem;
          }
        }

        .item-total {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .total-price {
          font-size: 1.1rem;
          font-weight: 700;
          color: #495e57;
          background: #f4ce14;
          padding: 0.4rem 0.8rem;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(244, 206, 20, 0.3);
          text-align: center;
          display: inline-block;
        }

        @media (max-width: 768px) {
          .total-price {
            font-size: 1rem;
            padding: 0.35rem 0.65rem;
          }
        }

        @media (max-width: 480px) {
          .total-price {
            font-size: 0.95rem;
            padding: 0.3rem 0.6rem;
          }
        }

        .order-summary {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          height: fit-content;
          position: sticky;
          top: 2rem;
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }

        @media (max-width: 1024px) {
          .order-summary {
            position: relative;
            top: auto;
          }
        }

        @media (max-width: 768px) {
          .order-summary {
            padding: 1.5rem;
            border-radius: 16px;
          }
        }

        @media (max-width: 480px) {
          .order-summary {
            padding: 1rem;
            border-radius: 12px;
          }
        }

        @media (max-width: 415px) {
          .order-summary {
            padding: 0.8rem;
            border-radius: 10px;
          }
        }

        @media (max-width: 375px) {
          .order-summary {
            padding: 0.6rem;
            border-radius: 8px;
          }
        }

        .summary-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #666;
          font-size: 1rem;
          padding: 0.25rem 0;
        }

        @media (max-width: 415px) {
          .summary-row {
            font-size: 0.9rem;
            padding: 0.2rem 0;
          }
        }

        @media (max-width: 375px) {
          .summary-row {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 320px) {
          .summary-row {
            font-size: 0.8rem;
          }
        }

        .summary-row.total {
          color: #495e57;
          font-size: 1.3rem;
          font-weight: 700;
          background: rgba(244, 206, 20, 0.1);
          padding: 1rem;
          border-radius: 12px;
          margin-top: 0.5rem;
        }

        @media (max-width: 415px) {
          .summary-row.total {
            font-size: 1.1rem;
            padding: 0.8rem;
            border-radius: 10px;
          }
        }

        @media (max-width: 375px) {
          .summary-row.total {
            font-size: 1rem;
            padding: 0.6rem;
            border-radius: 8px;
          }
        }

        @media (max-width: 320px) {
          .summary-row.total {
            font-size: 0.9rem;
            padding: 0.5rem;
          }
        }

        .summary-divider {
          border: none;
          border-top: 2px solid #f0f0f0;
          margin: 1rem 0;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 2rem;
        }

        .clear-cart-btn {
          background: transparent;
          color: #f44336;
          border: 2px solid #f44336;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .clear-cart-btn {
            padding: 0.7rem 1.3rem;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .clear-cart-btn {
            padding: 0.6rem 1.1rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 415px) {
          .clear-cart-btn {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
            border-radius: 10px;
          }
        }

        @media (max-width: 375px) {
          .clear-cart-btn {
            padding: 0.45rem 0.9rem;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 320px) {
          .clear-cart-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.75rem;
          }
        }

        .clear-cart-btn:hover:not(:disabled) {
          background: rgba(244, 67, 54, 0.1);
          transform: translateY(-2px);
        }

        .clear-cart-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .checkout-btn {
          background: linear-gradient(135deg, #f4ce14 0%, #e6b800 100%);
          color: #495e57;
          border: none;
          padding: 1.2rem 2rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 4px 15px rgba(244, 206, 20, 0.3);
        }

        @media (max-width: 768px) {
          .checkout-btn {
            padding: 1rem 1.8rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .checkout-btn {
            padding: 0.9rem 1.5rem;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 415px) {
          .checkout-btn {
            padding: 0.8rem 1.2rem;
            font-size: 0.9rem;
            border-radius: 10px;
          }
        }

        @media (max-width: 375px) {
          .checkout-btn {
            padding: 0.7rem 1rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 320px) {
          .checkout-btn {
            padding: 0.6rem 0.8rem;
            font-size: 0.8rem;
          }
        }

        .checkout-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(244, 206, 20, 0.4);
        }

        .checkout-btn:disabled {
          opacity: 0.8;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid #495e57;
          border-radius: 50%;
          animation: spin 1s linear infinite;
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

        @keyframes slideInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
