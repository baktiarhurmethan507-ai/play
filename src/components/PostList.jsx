import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';

function PostList() {
    // Создаем состояние для хранения товаров из API
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Запрос к твоему ресурсу на Mokky.dev
        fetch('https://41c033e72d3f5f7c.mokky.dev/store')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Ошибка загрузки:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <h2 className="loading-text">Загрузка товаров из базы...</h2>;

    return (
        <div className="props">
            {products.map((post) => (
                <PostCard
                    key={post.id}
                    item={post}
                />
            ))}
        </div>
    );
}

export default PostList;