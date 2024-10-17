import Link from 'next/link';

const cardData = [
    { href: "/add-customer", label: "Add Customer", icon: "➕", description: "Quickly add a new customer.", bgColor: "bg-blue-600" },
    { href: "/add-transaction", label: "Add Transaction", icon: "💳", description: "Record a new transaction.", bgColor: "bg-green-600" },
    { href: "/get-invoices", label: "View Invoices", icon: "🧾", description: "Check all invoices issued.", bgColor: "bg-blue-600" },
    { href: "/mark-invoice-paid", label: "Mark Invoice as Paid", icon: "✅", description: "Update invoice status.", bgColor: "bg-green-600" },
    { href: "/get-aging-report", label: "View Aging Report", icon: "📊", description: "Analyze outstanding invoices.", bgColor: "bg-yellow-600" },
    { href: "/send-payment-reminders", label: "Send Payment Reminders", icon: "🔔", description: "Notify customers of overdue payments.", bgColor: "bg-orange-600" },
    { href: "/view-balance", label: "View Balance & History", icon: "💰", description: "Check account balance and history.", bgColor: "bg-purple-600" },
];

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6">
            <h1 className="text-4xl font-bold mb-8 text-blue-400 text-center">Accounts Receivable System</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                {cardData.map(item => (
                    <div key={item.href} className={`p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${item.bgColor}`}>
                        <Link href={item.href} className="block text-center">
                            <div className="text-3xl">{item.icon}</div>
                            <h2 className="text-lg font-semibold">{item.label}</h2>
                            <p className="text-sm mt-2">{item.description}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
