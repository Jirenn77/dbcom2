"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton'; // Adjust path as necessary

export default function ViewBalance() {
  const [customerName, setCustomerName] = useState('');
  const [balance, setBalance] = useState(null);
  const [history, setHistory] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost/API/getBalance.php?action=get_customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setBalance(null);
    setHistory([]);
    setCustomerInfo(null);
    setLoading(true);

    // Validate customerName
    if (!customerName) {
      setMessage('Please select a valid Customer Name');
      setLoading(false);
      return;
    }

    console.log("Fetching balance for CustomerName:", customerName);

    try {
      const response = await axios.get(`http://localhost/API/getBalance.php?action=view_balance&CustomerName=${customerName}`);
      console.log('API Response:', response.data);
      if (response.data.error) {
        setMessage(response.data.error);
      } else {
        setBalance(Number(response.data.balance) || 0);
        setHistory(Array.isArray(response.data.history) ? response.data.history : []);
        setCustomerInfo(response.data.customer);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Error fetching balance and history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">View Balance</h2>
        <form onSubmit={handleSubmit} className="mb-6">
          <div>
            <label className="block mb-1" htmlFor="CustomerName">Customer Name</label>
            <select
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.name}>{customer.name}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-500 transition rounded-md"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'View Balance'}
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}

        {customerInfo && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Customer Information:</h3>
            <p>Name: {customerInfo.CustomerName}</p>
            <p>Email: {customerInfo.Email}</p>
            <p>Contact: {customerInfo.ContactDetails}</p>
          </div>
        )}

        <div className="bg-gray-700 rounded-md p-4 mb-6">
          <h3 className="text-lg font-semibold">Current Balance</h3>
          <p className="text-xl">₱{balance !== null ? balance.toFixed(2) : '0.00'}</p>
        </div>

        <div className="bg-gray-700 rounded-md p-4">
          <h3 className="text-lg font-semibold">Transaction History</h3>
          {history.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full mt-2 bg-gray-600 rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Transaction ID</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Product Price</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((transaction) => (
                    <tr key={transaction.TransactionID} className="border-b border-gray-600">
                      <td className="px-4 py-2">{transaction.TransactionID}</td>
                      <td className="px-4 py-2">{transaction.TransactionType}</td>
                      <td className="px-4 py-2">{transaction.ProductName || 'N/A'}</td>
                      <td className="px-4 py-2">₱{transaction.Price ? parseFloat(transaction.Price).toFixed(2) : 'N/A'}</td>
                      <td className="px-4 py-2">{new Date(transaction.TransactionDate).toLocaleString()}</td>
                      <td className="px-4 py-2">{transaction.Description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No transaction history available.</p>
          )}
        </div>

        <div className="mt-6 text-center">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
