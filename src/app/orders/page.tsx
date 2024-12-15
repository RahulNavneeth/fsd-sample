'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CLIENT_URL } from '@/lib/constant';

export default function OrdersPage() {
	const [orderId, setOrderId] = useState('');
	const router = useRouter();

	const handleSearch = async () => {
		if (!orderId) return alert('Please enter an order ID');
		router.push(`${CLIENT_URL}/orders/${orderId}`);
	};

	return (
		<div className="flex flex-col items-center gap-4 mt-8">
			<h1 className="text-2xl font-bold">Track Your Order</h1>
			<input
				type="text"
				placeholder="Enter Order ID"
				value={orderId}
				onChange={(e) => setOrderId(e.target.value)}
				className="p-2 w-72 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<button
				onClick={handleSearch}
				className="px-4 py-2 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
			>
				Track Order
			</button>
		</div>
	);
}
