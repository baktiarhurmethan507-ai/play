import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ item }) => {
    const navigate = useNavigate();

    const handleOpen = () => {

        navigate('/product', { state: { data: item } });
    };

    return (
        <div className="card" onClick={handleOpen} style={{ cursor: 'pointer' }}>
            <p className="card-title">{item.title}</p>
            <img src={item.imageUrl} alt={item.title} className="card-img" />
            <div className="price-tag">{item.price}</div>
        </div>
    );
};

export default PostCard;