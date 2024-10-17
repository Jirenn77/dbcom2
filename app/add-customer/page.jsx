"use client";

import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import BackButton from '../components/BackButton';

export default function AddCustomer() {
  const [formData, setFormData] = useState({ CustomerName: '', Email: '', ContactDetails: '' });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // First, check the customer's balance
        const balanceResponse = await axios.post('http://localhost/API/getBalance.php?action=check_balance', {
            CustomerName: formData.CustomerName,
        }, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (balanceResponse.data.canOwe === false) {
            toast.error('This customer cannot owe money or products.');
            return;
        }

        // Proceed to add the customer
        const response = await axios.post('http://localhost/API/getBalance.php?action=add_customer', formData, {
            headers: { 'Content-Type': 'application/json' },
        });

        setMessage(response.data.success || response.data.error);
        setIsSuccess(response.data.success);

        if (response.data.success) {
            toast.success('Customer added successfully!');
            setFormData({ CustomerName: '', Email: '', ContactDetails: '' });
        }

    } catch (error) {
        setMessage('Error adding customer');
        console.error('Error details:', error);
    }
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white p-6">
      <Toaster />
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['CustomerName', 'Email', 'ContactDetails'].map((field, index) => (
            <div key={index}>
              <label className="block mb-1" htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type={field === 'Email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-500 transition rounded-md shadow-md"
          >
            Add Customer
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
        <div className="mt-6 text-center">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
