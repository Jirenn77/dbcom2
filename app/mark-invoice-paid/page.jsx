"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import { Toaster, toast } from 'sonner';

export default function MarkInvoicePaid() {
  const [invoices, setInvoices] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost/API/getBalance.php?action=get_invoices');

        // Log the response to verify its structure
        console.log("Invoices Response:", response.data);

        // Check if the response data is an array
        if (Array.isArray(response.data)) {
          setInvoices(response.data);
        } else {
          toast.error('Unexpected response format. Expected an array of invoices.');
        }
      } catch (error) {
        toast.error('Error fetching invoices.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleMarkAsPaid = async (e) => {
    e.preventDefault();
    // Handle the logic for marking the invoice as paid here
    // For example, send a request to the backend to update the invoice status
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white p-6">
      <Toaster />
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Mark Invoice as Paid</h2>
        {loading ? (
          <p>Loading invoices...</p>
        ) : (
          <form onSubmit={handleMarkAsPaid} className="space-y-4">
            <div>
              <label className="block mb-1" htmlFor="invoice">Select Invoice</label>
              <select
                name="invoice"
                value={selectedInvoice}
                onChange={(e) => setSelectedInvoice(e.target.value)}
                required
                className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select an invoice</option>
                {Array.isArray(invoices) && invoices.map((invoice) => (
                  <option key={invoice.id} value={invoice.id}>
                    Invoice ID: {invoice.id} - {invoice.CustomerName}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className={`w-full py-2 mt-4 ${!selectedInvoice ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'} transition rounded-md`}
              disabled={!selectedInvoice}
            >
              Mark as Paid
            </button>
          </form>
        )}
        <div className="mt-6 text-center">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
