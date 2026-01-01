'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Check if the input is a valid email
        if (isLogin && formData.username.includes('@')) {
            // Simple client-side mapping if username field is used for email
            // Or backend supports email login with same field.
            // For strict backend: username is username.
            // Let's assume user enters username for now as per backend design.
        }

        try {
            const endpoint = isLogin ? `${API_URL}/api/auth/login` : `${API_URL}/api/auth/register`;

            const payload = isLogin
                ? { username: formData.username, password: formData.password }
                : { username: formData.username, password: formData.password, email: formData.email };

            const res = await axios.post(endpoint, payload);

            if (isLogin) {
                localStorage.setItem('token', 'dummy-jwt-token');
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('username', res.data.username);
                router.push('/resume');
            } else {
                setIsLogin(true);
                alert('Registration successful! Please login.');
            }
        } catch (err: any) {
            setError(err.response?.data || 'An error occurred');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>{isLogin ? 'Login' : 'Register'}</h2>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            style={styles.input}
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email</label>
                            <input
                                style={styles.input}
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    )}

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            style={styles.input}
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    {error && <p style={styles.error}>{error}</p>}

                    <button type="submit" style={styles.btn}>{isLogin ? 'Login' : 'Register'}</button>
                </form>

                <p style={styles.toggleText}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span style={styles.link} onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Register' : 'Login'}
                    </span>
                </p>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif' },
    card: { padding: '30px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '350px' },
    title: { textAlign: 'center', color: '#333', marginBottom: '20px' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
    label: { fontSize: '14px', color: '#666', fontWeight: 500 },
    input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' },
    btn: { padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    error: { color: 'red', fontSize: '14px', textAlign: 'center' },
    toggleText: { marginTop: '15px', textAlign: 'center', fontSize: '14px' },
    link: { color: '#0070f3', cursor: 'pointer', textDecoration: 'underline' }
};
