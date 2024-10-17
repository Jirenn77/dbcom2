"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import { Toaster, toast } from 'sonner';

export default function SendPaymentReminders() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost/API/getBalance.php?action=get_customers');
        setCustomers(response.data);
      } catch (error) {
        toast.error('Error fetching customers.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleSendReminder = async (customerID) => {
    try {
      await axios.post('http://localhost/API/getBalance.php?action=send_payment_reminder', { CustomerID: customerID });
      toast.success('Payment reminder sent successfully!');
    } catch (error) {
      toast.error('Error sending payment reminder.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white p-6">
      <Toaster />
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Send Payment Reminders</h2>
        {loading ? (
          <p>Loading customers...</p>
        ) : (
          <ul className="space-y-4">
            {customers.map((customer) => (
              <li key={customer.id} className="flex justify-between items-center">
                <span>{customer.name}</span>
                <button
                  onClick={() => handleSendReminder(customer.id)}
                  className="bg-blue-600 hover:bg-blue-500 transition rounded-md py-1 px-3"
                >
                  Send Reminder
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 text-center">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
