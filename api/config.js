// /pages/api/config.js
export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            status: 'error',
            message: 'Method not allowed'
        });
    }

    // Verify client secret
    const clientApiKey = req.headers['x-api-key'];
    if (!clientApiKey || clientApiKey !== process.env.CLIENT_SECRET) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized'
        });
    }

    // Simple response for app
    res.status(200).json({
        data: {
            apikey: process.env.ACCUWEATHER_API_KEY
        }
    });
}