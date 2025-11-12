import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const filePath = path.join(
      process.cwd(),
      'src/data/foodWeatherWeights.json'
    );
    await fs.writeFile(filePath, JSON.stringify(req.body, null, 2), 'utf-8');
    res
      .status(200)
      .json({ message: 'foodWeatherWeights.json updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save foodWeatherWeights.json' });
  }
}
