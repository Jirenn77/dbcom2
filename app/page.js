"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import axios from 'axios';
import { Toaster, toast } from 'sonner';

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

            if (res.data !== false) {
                toast.success('Login successful!');
                router.push('/home'); 
            } else {
                setError(res.data.error || 'Login failed');
                toast.error('Login failed. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again.');
            toast.error('An error occurred. Please try again.');
        }
    };  

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white p-6">
            <Toaster />
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
                            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transform hover:scale-105 focus:scale-105"
                            placeholder="Enter your email"
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
                            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transform hover:scale-105 focus:scale-105"
                            placeholder="Enter your password"
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
