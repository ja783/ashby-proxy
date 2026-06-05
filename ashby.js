export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-ashby-key');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = req.headers['x-ashby-key'];
  if (!apiKey) return res.status(400).json({ error: 'Missing x-ashby-key header' });

  const { endpoint, body } = req.body || {};
  if (!endpoint) return res.status(400).json({ error: 'Missing endpoint in request body' });

  const allowedEndpoints = [
    'job.list', 'application.list', 'candidate.list',
    'jobPosting.list', 'interview.list', 'offer.list',
    'hiringTeam.list', 'department.list', 'location.list'
  ];
  if (!allowedEndpoints.includes(endpoint)) {
    return res.status(403).json({ error: 'Endpoint not allowed: ' + endpoint });
  }

  try {
    const ashbyRes = await fetch(`https://api.ashbyhq.com/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json; version=1',
        'Authorization': 'Basic ' + Buffer.from(apiKey + ':').toString('base64')
      },
      body: JSON.stringify(body || {})
    });

    const data = await ashbyRes.json();
    return res.status(ashbyRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Proxy error: ' + err.message });
  }
}
