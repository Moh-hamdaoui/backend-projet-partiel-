import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      
      localStorage.setItem('token', response.data.token);
     
      router.push('/dashboard');
    } catch (err) {
      setError('Échec de la connexion, veuillez vérifier vos informations.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleLogin} className="w-96 p-6 bg-white shadow-md rounded-lg space-y-4">
        <h2 className="text-2xl font-semibold">Se connecter</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label className="block text-sm">Email</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Mot de passe</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
