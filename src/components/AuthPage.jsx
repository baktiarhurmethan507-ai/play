import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthPage = ({ setUser, initialIsLogin }) => {
    const [isLogin, setIsLogin] = useState(initialIsLogin);
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });

    const navigate = useNavigate();
    const location = useLocation();

    // URL өзгергенде (мысалы, /login-нен /register-ге өткенде) режимді ауыстыру
    useEffect(() => {
        setIsLogin(location.pathname === '/login');
    }, [location]);

    const handleToggle = () => {
        // Басқан кезде жай ғана URL-ді ауыстырамыз, қалғанын useEffect істейді
        if (isLogin) {
            navigate('/register');
        } else {
            navigate('/login');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? 'auth' : 'register';

        try {
            const res = await fetch(`https://41c033e72d3f5f7c.mokky.dev/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.data));
                setUser(data.data);
                alert(isLogin ? "Қош келдіңіз!" : "Тіркелу сәтті аяқталды!");
                navigate('/');
            } else {
                alert(data.message || "Email немесе құпия сөз қате");
            }
        } catch (err) {
            console.error("Auth error:", err);
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 style={{ color: 'white', textAlign: 'center' }}>
                    {isLogin ? 'КІРУ' : 'ТІРКЕЛУ'}
                </h2>

                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Толық атыңыз"
                        className="auth-input"
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                    />
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="auth-input"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />

                <input
                    type="password"
                    placeholder="Құпия сөз"
                    className="auth-input"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />

                <button type="submit" className="auth-btn">
                    {isLogin ? 'КІРУ' : 'ТІРКЕЛУ'}
                </button>

                <p onClick={handleToggle} className="toggle-auth" style={{ color: '#aaa', cursor: 'pointer', textAlign: 'center', marginTop: '10px' }}>
                    {isLogin ? 'Аккаунтыңыз жоқ па? Тіркелу' : 'Аккаунтыңыз бар ма? Кіру'}
                </p>
            </form>
        </div>
    );
};

export default AuthPage;