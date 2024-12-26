// api/config.js - Simple endpoint for app consumption
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

// api/_admin/status.js - Internal status endpoint for backend developers
export default async function handler(req, res) {
    // Verify admin secret
    const adminKey = req.headers['admin-key'];
    if (!adminKey || adminKey !== process.env.ADMIN_SECRET) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized'
        });
    }

    try {
        // Check AccuWeather API status
        const response = await fetch(
            `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.ACCUWEATHER_API_KEY}&q=London`
        );
        
        res.status(200).json({
            key_status: {
                isActive: response.status === 200,
                lastChecked: new Date().toISOString(),
                remainingCalls: response.headers.get('RateLimit-Remaining') || 'unknown',
                lastUpdated: process.env.KEY_LAST_UPDATED || 'unknown'
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Status check failed',
            error: error.message
        });
    }
}