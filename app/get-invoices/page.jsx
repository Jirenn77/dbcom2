"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import { Toaster, toast } from 'sonner';

export default function ViewInvoices() {
  const [invoices, setInvoices] = useState([]); // Ensure this is initialized as an array
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white p-6">
      <Toaster />
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Invoices</h2>
        {loading ? (
          <p>Loading invoices...</p>
        ) : (
          <ul className="space-y-4">
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <li key={invoice.id} className="border-b border-gray-600 pb-2 mb-2">
                  <p><strong>Invoice ID:</strong> {invoice.id}</p>
                  <p><strong>Customer:</strong> {invoice.CustomerName}</p>
                  <p><strong>Total Amount:</strong> {invoice.TotalAmount}</p>
                  <p><strong>Invoice Date:</strong> {invoice.InvoiceDate}</p>
                </li>
              ))
            ) : (
              <p>No invoices found.</p>
            )}
          </ul>
        )}
        <div className="mt-6 text-center">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
