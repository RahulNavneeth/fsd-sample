import { CLIENT_URL } from "@/lib/constant";

export default async function OrderDetailPage(props: { params: Promise<{ id: string }> }) {
	const params = await props.params;
	const res = await fetch(`${CLIENT_URL}/api/orders/${params.id}`, { cache: "no-store" });
	console.log(res);
	if (!res.ok) return <h1 className="text-center text-red-500 text-xl font-bold mt-8">Order not found</h1>;

	const order = await res.json();
	const statuses = ["status1", "status2", "status3"];
	console.log(order);
	return (
		<div className="flex flex-col items-center gap-4 mt-8">
			<h1 className="text-2xl font-bold">Order Details</h1>
			<p className="text-lg">
				<strong>Order ID:</strong> {order.order_id}
			</p>
			<p className="text-lg">
				<strong>Date:</strong> {order.date}
			</p>
			<p className="text-lg">
				<strong>Address:</strong> {order.address}
			</p>
			<div className="flex justify-between gap-4 my-4 w-full max-w-md">
				{statuses.map((status, index) => (
					<div key={index} className="text-center">
						<div
							className={`w-24 h-2 mx-auto rounded ${order[status] ? "bg-green-500" : "bg-gray-400"
								}`}
						></div>
						<p className="text-sm mt-2">{status}</p>
					</div>
				))}
			</div>
			<p className="text-lg">
				<strong>Log:</strong> {order.log}
			</p>
		</div>
	);
}
