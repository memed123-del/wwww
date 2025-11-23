import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple skeleton for server-side image generation endpoint.
// - If env var GENAI_API_KEY (or VERCEL_GENAI_API_KEY) is not set, returns 501 with a helpful message.
// - If set, you can implement the actual call to Google GenAI or another image API here.

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ message: 'Missing prompt' });
    return;
  }

  const key = process.env.GENAI_API_KEY || process.env.VERCEL_GENAI_API_KEY;
  if (!key) {
    res.status(501).json({ message: 'Image generation not configured. Set GENAI_API_KEY in your Vercel environment variables.' });
    return;
  }

  // Placeholder: real implementation should call the GenAI service here using server-side SDK or HTTP.
  // For now, return a 501 to indicate that the server is ready but the API key is not configured.
  res.status(501).json({ message: 'Server endpoint ready but real GenAI implementation is not enabled.' });
}
