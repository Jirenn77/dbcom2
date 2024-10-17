"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const res = await axios.post('http://localhost/API/getBalance.php?action=login', new URLSearchParams({
              email,
              password,
          }));

          console.log("response sa login" , res);
  
          if (res.data !== false) {
              router.push('/'); // Redirect to home page
          } else {
              setError(data.error);
          }
      } catch (err) {
          console.error(err);
          setError('An error occurred. Please try again.');
      }
  };  
  


    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white p-6">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-700"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-700"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 transition rounded-md py-2">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
