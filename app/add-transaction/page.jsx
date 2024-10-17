"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import BackButton from '../components/BackButton';
import axios from 'axios';

export default function AddTransaction() {
  const [formData, setFormData] = useState({
    CustomerName: '',
    ProductID: '',
    TransactionType: 'Credit',
    Quantity: '',
    Amount: '',
    Description: '',
    DueDate: '' // Added DueDate field
  });

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('http://localhost/API/getBalance.php?action=get_customers');
        const data = await res.json();
        console.log('Fetched Customers:', data);
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost/API/getBalance.php?action=get_products');
        const data = await res.json();
        console.log('Fetched Products:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCustomers();
    fetchProducts();
  }, []);

  // Inside AddTransaction.js

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Form data before submission:", formData);

    try {
      const response = await axios.post('http://localhost/API/getBalance.php?action=add_transaction', {
        ...formData,
        Amount: formData.Amount,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Response from server:", response.data);

      if (response.data && response.data.success) {
        toast.success('Transaction added successfully!');
        resetForm();
        router.push('/view-invoice'); // Redirect to view invoices after adding a transaction
      } else {
        toast.error(response.data.error || 'Error adding transaction. Please try again.');
      }
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error);
      toast.error('Error adding transaction. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const resetForm = () => {
    setFormData({
      CustomerName: '',
      ProductID: '',
      TransactionType: 'Credit',
      Quantity: '',
      Amount: '',
      Description: '',
      DueDate: '' // Reset DueDate
    });
    setSelectedProductPrice(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'ProductID') {
      const selectedProduct = products.find(product => product.ProductID == value);
      if (selectedProduct) {
        setSelectedProductPrice(selectedProduct.Price);
        const calculatedAmount = formData.Quantity ? formData.Quantity * selectedProduct.Price : '';
        setFormData(prev => ({ ...prev, Amount: calculatedAmount }));
      }
    }

    if (name === 'Quantity') {
      const quantity = parseInt(value);
      const calculatedAmount = !isNaN(quantity) ? quantity * selectedProductPrice : '';
      setFormData(prev => ({ ...prev, Amount: calculatedAmount }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <Toaster />
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-4xl w-full overflow-hidden">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Transaction</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1" htmlFor="CustomerName">Customer Name</label>
            <select
              name="CustomerName"
              value={formData.CustomerName}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select a customer</option>
              {Array.isArray(customers) && customers.map((customer) => (
                <option key={customer.id} value={customer.name}>{customer.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1" htmlFor="ProductID">Select Product</label>
            <select
              name="ProductID"
              value={formData.ProductID}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select a product</option>
              {Array.isArray(products) && products.map((product) => (
                <option key={product.ProductID} value={product.ProductID}>
                  {product.ProductName} - ₱{Number(product.Price).toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1" htmlFor="Quantity">Quantity</label>
            <input
              type="number"
              name="Quantity"
              value={formData.Quantity}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Quantity"
            />
          </div>

          <div>
            <label className="block mb-1" htmlFor="Amount">Amount</label>
            <input
              type="number"
              name="Amount"
              value={formData.Amount}
              readOnly
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Calculated amount will appear here"
            />
          </div>

          <div>
            <label className="block mb-1" htmlFor="DueDate">Due Date</label>
            <input
              type="date"
              name="DueDate"
              value={formData.DueDate}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1" htmlFor="TransactionType">Transaction Type</label>
            <select
              name="TransactionType"
              value={formData.TransactionType}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block mb-1" htmlFor="Description">Description</label>
            <input
              type="text"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className={`w-full py-2 mt-4 ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'} transition rounded-md`}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Transaction'}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
