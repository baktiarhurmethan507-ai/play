import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CategoryPage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // URL-дегі ?type= мәнін алу үшін useSearchParams қолданамыз
    const [searchParams] = useSearchParams();
    const categoryType = searchParams.get('type');

    useEffect(() => {
        if (!categoryType) return;

        setLoading(true);
        // Mokky API-ге сұраныс жіберу
        fetch(`https://41c033e72d3f5f7c.mokky.dev/store?category=${categoryType}`)
            .then(res => res.json())
            .then(data => {
                setGames(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Қате:", err);
                setLoading(false);
            });
    }, [categoryType]);

    if (loading) return <h2 className="loading-text">ЖҮКТЕЛУДЕ...</h2>;

    return (
        <div className="category-page">
            <header className="header">
                <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    ONLINE STORE
                </h1>
                <div className="nav-menu">
                    <span onClick={() => navigate('/')}>ALL</span>
                    <span onClick={() => navigate('/categories?type=new')}>NEW</span>
                    <span onClick={() => navigate('/categories?type=exclusive')}>EXCLUSIVE</span>
                    <span onClick={() => navigate('/categories?type=bestsellers')}>BESTSELLERS</span>
                    <span onClick={() => navigate('/categories?type=discounts')}>DISCOUNTS</span>
                </div>
            </header>

            <button className="back-btn" onClick={() => navigate('/')}>
                ← АРТҚА
            </button>

            {games.length === 0 ? (
                <h2 className="error-msg">Ойындар табылмады. URL: {categoryType}</h2>
            ) : (
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
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryPage;