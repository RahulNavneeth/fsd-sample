import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
	try {
		const { rows } = await pool.query('SELECT * FROM orders ORDER BY date DESC');
		return NextResponse.json(rows);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const { order_id, date, address, log, status1, status2, status3 } = await request.json();
		await pool.query(
			`INSERT INTO orders (order_id, date, address, log, status1, status2, status3) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
			[order_id, date, address, log || '', status1, status2, status3]
		);
		return NextResponse.json({ message: 'Order created successfully' });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
	}
}
