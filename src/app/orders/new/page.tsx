'use client';

import { CLIENT_URL } from '@/lib/constant';
import { useState } from 'react';

type Order = {
	order_id: string;
	date: string;
	address: string;
	status1: boolean;
	status2: boolean;
	status3: boolean;
};

export default function NewOrderPage() {
	const [order, setOrder] = useState<Order>({
		order_id: '',
		date: '',
		address: '',
		status1: true,
		status2: false,
		status3: false,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setOrder((prev) => ({ ...prev, [name]: value }));
	};

	const handleStatusChange = (status: string) => {
		// @ts-ignore
		order[status] = true;
		setOrder(order);
	};

	const handleSubmit = async () => {
		const res = await fetch(`${CLIENT_URL}/api/orders`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(order),
		});
		console.log(res);
		if (res.ok) alert('Order created successfully!');
		else alert('Failed to create order');
	};

	return (
		<div className="flex flex-col items-center gap-4 mt-8">
			<h1 className="text-2xl font-bold">Create New Order</h1>
			<input
				type="text"
				name="order_id"
				placeholder="Order ID"
				value={order.order_id}
				onChange={handleInputChange}
				className="p-2 w-72 border border-gray-300 rounded-md"
			/>
			<input
				type="date"
				name="date"
				value={order.date}
				onChange={handleInputChange}
				className="p-2 w-72 border border-gray-300 rounded-md"
			/>
			<textarea
				name="address"
				placeholder="Address"
				value={order.address}
				onChange={handleInputChange}
				className="p-2 w-72 border border-gray-300 rounded-md"
			></textarea>
			<div className="flex gap-4">
				{['status1', 'status2', 'status3'].map((status) => (
					<div key={status} className="flex items-center gap-2">
						<input
							type="radio"
							name="status"
							checked={order[status as keyof Order] as boolean}
							onChange={() => handleStatusChange(status)}
						/>
						<label>{status}</label>
					</div>
				))}
			</div>
			<button
				onClick={handleSubmit}
				className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
			>
				Create Order
			</button>
		</div>
	);
}
