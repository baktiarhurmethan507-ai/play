import React from 'react';
import { useNavigate } from 'react-router-dom';

// Props арқылы cart және setCart қабылдаймыз
const CartPage = ({ cart, setCart }) => {
    const navigate = useNavigate();

    // Жалпы сомманы есептеу (quantity ескерілген)
    const totalSum = cart.reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 1)), 0);

    // Себетті тазалау функциясы
    const clearCart = () => {
        setCart([]); // App.js-тегі useEffect автоматты түрде LocalStorage-ті тазалайды
    };

    // Бір тауарды өшіру
    const removeItem = (id) => {
        const newCart = cart.filter(item => item.id !== id);
        setCart(newCart);
    };

    return (
        <div className="cart-page">
            <header className="header">
                <button onClick={() => navigate('/')} className="back-btn">← ДҮКЕНГЕ ҚАЙТУ</button>
                <h1>СЕНІҢ СЕБЕТІҢ</h1>
            </header>

            <div className="cart-container">
                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <h2>Себетіңіз әлі бос...</h2>
                        <button onClick={() => navigate('/')}>Ойындарды қарау</button>
                    </div>
                ) : (
                    <>
                        <div className="cart-list">
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.imageUrl} alt={item.title} className="cart-img" />
                                    <div className="cart-info">
                                        <h3>{item.title}</h3>
                                        <p className="cart-item-price">
                                            {item.price} KZT {item.quantity > 1 && `x ${item.quantity}`}
                                        </p>
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        Өшіру
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <div className="total-box">
                                <span>ЖАЛПЫ СОММАСЫ:</span>
                                <span className="total-price">{totalSum} KZT</span>
                            </div>
                            <div className="cart-actions">
                                <button className="pay-btn">ТӨЛЕМ ЖАСАУ</button>
                                <button onClick={clearCart} className="clear-btn">СЕБЕТТІ ТАЗАЛАУ</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartPage;