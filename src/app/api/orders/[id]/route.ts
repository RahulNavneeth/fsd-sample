import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(_: Request, props: { params: Promise<{ id: string }> }) {
	const params = await props.params;
	try {
		const { rows } = await pool.query('SELECT * FROM orders WHERE order_id = $1', [params.id]);
		if (rows.length === 0) {
			return NextResponse.json({ error: 'Order not found' }, { status: 404 });
		}
		return NextResponse.json(rows[0]);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
	const params = await props.params;
	try {
		const { order_id, date, address, status1, status2, status3, log } = await request.json();
		const result = await pool.query(
			`UPDATE orders 
       SET order_id = $1, date = $2, address = $3, status1 = $4, status2 = $5, status3 = $6, log = $7
       WHERE order_id = $8 RETURNING *`,
			[order_id, date, address, status1, status2, status3, log, params.id]
		);
		if (result.rowCount === 0) {
			return NextResponse.json({ error: 'Order not found' }, { status: 404 });
		}
		return NextResponse.json({ message: 'Order updated successfully', order: result.rows[0] });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
	}
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
	const params = await props.params;
	try {
		const result = await pool.query('DELETE FROM orders WHERE order_id = $1 RETURNING *', [params.id]);
		if (result.rowCount === 0) {
			return NextResponse.json({ error: 'Order not found' }, { status: 404 });
		}
		return NextResponse.json({ message: 'Order deleted successfully', order: result.rows[0] });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
	}
}
