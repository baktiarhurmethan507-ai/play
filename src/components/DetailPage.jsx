import React, { useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';

const DetailPage = ({ addToCart, cartCount }) => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // HomePage-тен келген деректер
    const gameData = location.state?.gameData;

    // --- ПІКІРЛЕРГЕ АРНАЛҒАН МАССИВ ЖӘНЕ STATE ---
    const [comments, setComments] = useState([
        { id: 1, user: "Nurgisa", text: "Керемет ойын!", rating: 5 },
        { id: 2, user: "Erasyl", text: "Графикасы жақсы.", rating: 4 }
    ]);
    const [newComment, setNewComment] = useState("");
    const [userRating, setUserRating] = useState(5);

    // ПІКІР ҚОСУ ФУНКЦИЯСЫ
    const handleAddComment = () => {
        if (newComment.trim() !== "") {
            const commentObj = {
                id: Date.now(),
                user: "Пайдаланушы",
                text: newComment,
                rating: userRating
            };
            setComments([...comments, commentObj]); // Spread операторы арқылы массивті жаңарту
            setNewComment("");
            setUserRating(5);
        }
    };

    // ПІКІРДІ ӨШІРУ ФУНКЦИЯСЫ
    const deleteComment = (commentId) => {
        // .filter() әдісі арқылы таңдалғаннан басқаларын қалдыру
        setComments(comments.filter(item => item.id !== commentId));
    };

    // Деректер жоқ болса тексеру
    if (!gameData) {
        return (
            <div className="error-page" style={{ color: 'white', textAlign: 'center', padding: '50px' }}>
                <h2>Ойын деректері жүктелмеді</h2>
                <button onClick={() => navigate('/')} style={{ padding: '10px', marginTop: '20px', cursor: 'pointer' }}>Артқа қайту</button>
            </div>
        );
    }

    const handleAddClick = () => {
        const productToCart = {
            id: id,
            title: gameData.title,
            price: gameData.price,
            imageUrl: gameData.imageUrl
        };
        addToCart(productToCart);
    };

    return (
        <div className="detail-page full-screen-fix" style={{ color: 'white' }}>
            {/* ХЕДЕР */}
            <header className="detail-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: '#111' }}>
                <button onClick={() => navigate('/')} className="back-btn">← Артқа</button>
                <div className="header-logo" style={{ fontWeight: 'bold' }}>ИГРОВОЙ МАГАЗИН</div>
                <Link to="/cart" style={{ color: '#ffc107', textDecoration: 'none', fontWeight: 'bold' }}>
                    🛒 СЕБЕТ ({cartCount})
                </Link>
            </header>

            {/* НЕГІЗГІ МАZMҰН */}
            <div className="detail-content-wrapper" style={{ display: 'flex', padding: '40px', gap: '40px' }}>
                <div className="detail-left">
                    <img src={gameData.imageUrl} alt={gameData.title} style={{ width: '300px', borderRadius: '10px' }} />
                </div>

                <div className="detail-right" style={{ flex: 1 }}>
                    <div className="id-tag">ID: {id}</div>
                    <h1>{gameData.title}</h1>
                    <p style={{ color: '#ccc', lineHeight: '1.6' }}>{gameData.description || "Бұл ойын туралы толық ақпарат жақында қосылады."}</p>

                    <div className="purchase-block" style={{ marginTop: '30px' }}>
                        <h2 style={{ color: '#ffc107' }}>БАҒАСЫ: {gameData.price} KZT</h2>
                        <button className="buy-btn" onClick={handleAddClick} style={{ background: '#ffc107', padding: '15px 30px', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '5px' }}>
                            СЕБЕТКЕ САЛУ
                        </button>
                    </div>

                    {/* ПІКІРЛЕР БӨЛІМІ */}
                    <div className="comments-section" style={{ marginTop: '50px', borderTop: '1px solid #333', paddingTop: '30px' }}>
                        <h3>Пікірлер ({comments.length})</h3>

                        {/* ПІКІР ҚАЛДЫРУ */}
                        <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Ойын туралы ойыңызбен бөлісіңіз..."
                                style={{ width: '100%', padding: '12px', background: '#222', color: 'white', border: '1px solid #444', borderRadius: '5px' }}
                            />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span>Бағалау:</span>
                                <select
                                    value={userRating}
                                    onChange={(e) => setUserRating(Number(e.target.value))}
                                    style={{ background: '#333', color: '#ffc107', padding: '8px', border: 'none', borderRadius: '5px' }}
                                >
                                    {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} ★</option>)}
                                </select>
                                <button onClick={handleAddComment} style={{ background: '#ffc107', padding: '10px 20px', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '5px' }}>
                                    Пікір қалдыру
                                </button>
                            </div>
                        </div>

                        {/* ПІКІРЛЕР ТІЗІМІ (МАССИВТІ MAP-ПЕН ШЫҒАРУ) */}
                        <div className="comments-list">
                            {comments.map(item => (
                                <div key={item.id} style={{ background: '#1a1a1a', padding: '15px', marginBottom: '15px', borderRadius: '8px', borderLeft: '4px solid #ffc107' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <strong style={{ color: '#ffc107' }}>{item.user}</strong>
                                            <div style={{ color: '#ffc107', fontSize: '12px', margin: '5px 0' }}>
                                                {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteComment(item.id)}
                                            style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '20px' }}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    <p style={{ margin: '5px 0 0 0', color: '#eee' }}>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// МЫНА ЖОЛДЫ ЕШҚАШАН ҰМЫТПА!
export default DetailPage;