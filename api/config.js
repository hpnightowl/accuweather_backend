// /pages/api/config.js
export default function handler(req, res) {
    res.status(200).json({
        data: {
            apikey: process.env.ACCUWEATHER_API_KEY,
        }
    });
}