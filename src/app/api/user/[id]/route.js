import db from '@/lib/db';

export async function GET(req, { params }) {
    const userId = params.id;

    try {
        const [rows] = await db.query(
            'SELECT id, username, streak, points FROM users WHERE id = ?',
            [userId]
        );

        if (rows.length === 0) {
            return new Response(JSON.stringify({ success: false, message: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ success: true, user: rows[0] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error('DB error', err);
        return new Response(JSON.stringify({ success: false, message: 'Database error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}