"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import BackButton from '../components/BackButton';

export default function AddProduct() {
    const [products, setProducts] = useState([]); 
    const [customers, setCustomers] = useState([]); // State to hold customers
    const [formData, setFormData] = useState({ ProductID: '', Quantity: '', CustomerID: '' }); 
    const [message, setMessage] = useState(''); 
    const [isSuccess, setIsSuccess] = useState(false); 
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost/API/getBalance.php?action=get_products');
                const data = await res.json();
                console.log('Fetched Products:', data); 
                
                if (Array.isArray(data) && data.every(item => item.ProductID && item.ProductName)) {
                    setProducts(data);
                } else {
                    console.error('Invalid data format:', data);
                    setProducts([]); 
                }   
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchCustomers = async () => {
            try {
                const res = await fetch('http://localhost/API/getBalance.php?action=get_customers'); // Update to your endpoint
                const data = await res.json();
                console.log('Fetched Customers:', data);

                if (Array.isArray(data) && data.every(item => item.id && item.name)) {
                    setCustomers(data);
                } else {
                    console.error('Invalid customer data format:', data);
                    setCustomers([]); 
                }
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchProducts(); 
        fetchCustomers(); 
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
    

        const quantity = parseInt(formData.Quantity);
        if (isNaN(quantity) || quantity <= 0) {
            setMessage('Quantity must be a valid positive number');
            setIsSuccess(false);
            return;
        }
    
        if (!formData.ProductID || !formData.CustomerID) {
            setMessage('ProductID and CustomerID are required');
            setIsSuccess(false);
            return;
        }
    
        console.log('Sending data:', {
            ProductID: formData.ProductID,
            Quantity: quantity,
            CustomerID: formData.CustomerID 
        }); 
    
        try {
            const response = await fetch('http://localhost/API/getBalance.php?action=add_product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ProductID: parseInt(formData.ProductID),
                    Quantity: quantity,
                    CustomerID: formData.CustomerID 
                }),
            });
    
            const data = await response.json();
            setMessage(data.success || data.error); 
            setIsSuccess(data.success); 
    
            if (data.success) {
                toast.success('Product added successfully!'); 
                setFormData({ ProductID: '', Quantity: '', CustomerID: '' }); 
                setTimeout(() => {
                    router.push('/add-product'); 
                }, 2000);
            }
        } catch (error) {
            setMessage('Error adding product'); 
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
                <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1" htmlFor="ProductID">Select Product</label>
                        <select
                            name="ProductID"
                            value={formData.ProductID}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a product</option>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <option key={product.ProductID} value={product.ProductID}>
                                        {product.ProductName}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No products available</option>
                            )}
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
                        <label className="block mb-1" htmlFor="CustomerID">Select Customer</label>
                        <select
                            name="CustomerID"
                            value={formData.CustomerID}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a customer</option>
                            {customers.length > 0 ? (
                                customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No customers available</option>
                            )}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-500 transition rounded-md shadow-md"
                    >
                        Add Product
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
