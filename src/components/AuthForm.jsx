import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthForm = ({ setUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
    const navigate = useNavigate();

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
                // Деректерді сақтау
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.data));

                if (setUser) {
                    setUser(data.data);
                }

                alert(isLogin ? "Қош келдіңіз!" : "Тіркелу сәтті аяқталды!");
                navigate('/'); // Басты бетке қайту
            } else {

                alert(data.message || "Email немесе құпия сөз қате");
            }
        } catch (err) {
            console.error("Auth error:", err);
            alert("Сервермен байланыс үзілді немесе API URL қате.");
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-title">
                    {isLogin ? 'ЖҮЙЕГЕ КІРУ' : 'ТІРКЕЛУ'}
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

                <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
                    {isLogin ? 'Аккаунт жоқ па? Тіркелу' : 'Аккаунтыңыз бар ма? Кіру'}
                </p>
            </form>
        </div>
    );
};

export default AuthForm;