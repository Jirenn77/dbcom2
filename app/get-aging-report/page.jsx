"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import { Toaster, toast } from 'sonner';

export default function GetAgingReport() {
  const [agingReport, setAgingReport] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgingReport = async () => {
      try {
        const response = await axios.get('http://localhost/API/getBalance.php?action=get_aging_report');
        
        // Log the response to verify its structure
        console.log("Aging Report Response:", response.data);

        // Check if the response data is an array
        if (Array.isArray(response.data)) {
          setAgingReport(response.data);
        } else {
          toast.error('Unexpected response format. Expected an array of aging report entries.');
        }
      } catch (error) {
        console.error('Error fetching aging report:', error);
        toast.error('Error fetching aging report.');
      } finally {
        setLoading(false);
      }
    };

    fetchAgingReport();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white p-6">
      <Toaster />
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Aging Report</h2>
        {loading ? (
          <p>Loading aging report...</p>
        ) : (
          <ul className="space-y-4">
            {agingReport.length > 0 ? (
              agingReport.map((entry) => (
                <li key={entry.CustomerID} className="border-b border-gray-600 pb-2 mb-2">
                  <p><strong>Customer:</strong> {entry.CustomerName}</p>
                  <p><strong>Total Amount Due:</strong> {entry.TotalAmountDue}</p>
                </li>
              ))
            ) : (
              <p>No entries found in the aging report.</p>
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
