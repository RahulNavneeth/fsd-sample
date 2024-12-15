'use client';

import { useState } from 'react';

type Order = {
	order_id: string;
	date: string;
	address: string;
	status1: boolean;
	status2: boolean;
	status3: boolean;
};

export default function UpdateOrderPage() {
	const [orderId, setOrderId] = useState('');
	const [order, setOrder] = useState<Order | null>(null);

	const handleFetchOrder = async () => {
		const res = await fetch(`/api/orders/${orderId}`);
		if (res.ok) {
			const data = await res.json();
			setOrder(data);
		} else {
			alert('Order not found');
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setOrder((prev) => prev ? { ...prev, [name]: value } : null);
	};

	const handleStatusChange = (status: string) => {
		setOrder((prev) => ({
			...prev!,
			status1: false,
			status2: false,
			status3: false,
			[status]: true,
		}));
	};

	const handleUpdate = async () => {
		if (!order) return;
		const res = await fetch(`/api/orders/${orderId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(order),
		});
		if (res.ok) alert('Order updated successfully!');
		else alert('Failed to update order');
	};

	return (
		<div className="flex flex-col items-center gap-4 mt-8">
			<h1 className="text-2xl font-bold">Update Order</h1>
			{!order ? (
				<>
					<input
						type="text"
						placeholder="Enter Order ID"
						value={orderId}
						onChange={(e) => setOrderId(e.target.value)}
						className="p-2 w-72 border border-gray-300 rounded-md"
					/>
					<button
						onClick={handleFetchOrder}
						className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
					>
						Fetch Order
					</button>
				</>
			) : (
				<>
					<input
						type="text"
						name="order_id"
						value={order.order_id}
						disabled
						className="p-2 w-72 border border-gray-300 rounded-md bg-gray-100"
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
						onClick={handleUpdate}
						className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
					>
						Update Order
					</button>
				</>
			)}
		</div>
	);
}
