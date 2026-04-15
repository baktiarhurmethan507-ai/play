import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="game-header">
            {/* Иконка меню слева, как на макете */}
            <div className="menu-icon">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            {/* Ссылка на страницу категорий (Макет 3) */}
            <Link to="/categories" className="categories-link">
                ЖАНРЫ
            </Link>
        </header>
    );
};

export default Header;