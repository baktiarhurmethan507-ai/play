import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const HomePage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null); // Қолданушы мәліметі
    const navigate = useNavigate();
    const { categoryName } = useParams();

    useEffect(() => {
        // 1. Жүйеге кірген қолданушыны тексереміз
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
            setUser(savedUser);
        }

        setLoading(true);
        const filter = categoryName ? `?category=${categoryName}` : '';
        fetch(`https://41c033e72d3f5f7c.mokky.dev/store${filter}`)
            .then(res => res.json())
            .then(data => {
                setGames(data.sort((a, b) => a.id - b.id));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [categoryName]);

    // Шығу (Logout) функциясы
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/auth');
    };

    const addToCart = (e, game) => {
        e.stopPropagation();
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            id: game.id,
            title: game.title,
            price: game.price,
            imageUrl: game.imageUrl
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${game.title} себетке қосылды!`);
    };

    if (loading) return <h2 className="loading-text">ЗАГРУЗКА ИГР...</h2>;

    return (
        <div className="home-page">
            <header className="header">
                <div className="header-top">
                    <h1>Online Store</h1>

                    <div className="header-right">
                        {/* АВТОРИЗАЦИЯ БӨЛІМІ */}
                        {user ? (
                            <div className="user-profile">
                                <span>👤 {user.fullName}</span>
                                <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
                            </div>
                        ) : (
                            <button className="login-btn" onClick={() => navigate('/auth')}>LOGIN</button>
                        )}
                        <button className="cart-btn" onClick={() => navigate('/cart')}>🛒 CART</button>
                    </div>
                </div>

                <div className="nav-menu">
                    <span onClick={() => navigate('/')}>ALL</span>
                    <span onClick={() => navigate('/categories?type=new')}>NEW</span>
                    <span onClick={() => navigate('/categories?type=exclusive')}>EXCLUSIVE</span>
                    <span onClick={() => navigate('/categories?type=bestsellers')}>BESTSELLERS</span>
                    <span onClick={() => navigate('/categories?type=discounts')}>DISCOUNTS</span>
                </div>
            </header>

            <div className="grid-list">
                {games.map(game => (
                    <div
                        key={game.id}
                        className="card"
                        onClick={() => navigate(`/detail/${game.id}`, { state: { gameData: game } })}
                    >
                        <div className="card-img-box">
                            <img src={game.imageUrl} alt={game.title} />
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">{game.title}</h3>
                            <p className="card-price">{game.price} KZT</p>
                            <button className="add-btn" onClick={(e) => addToCart(e, game)}>
                                + ADD TO CART
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;