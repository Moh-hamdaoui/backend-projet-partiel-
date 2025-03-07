import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                router.push('/login');
            } else {
                const data = await response.json();
                setError(data.message || 'Erreur lors de l\'inscription');
            }
        } catch (err) {
            setError('Une erreur s\'est produite, veuillez réessayer.');
        }

        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
                <h2 className="text-2xl font-semibold mb-4">Inscription</h2>
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md ${loading ? 'opacity-50' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Chargement...' : 'S\'inscrire'}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Déjà un compte ?{' '}
                    <a href="/login" className="text-blue-500">Connectez-vous</a>
                </p>
            </div>
        </div>
    );
}
