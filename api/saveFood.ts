import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' });

  const { food, foods, foodMoodWeights, foodWeatherWeights } = req.body;

  const foodsPath = path.join(process.cwd(), 'src/data/foods.json');
  const moodPath = path.join(process.cwd(), 'src/data/foodMoodWeights.json');
  const weatherPath = path.join(
    process.cwd(),
    'src/data/foodWeatherWeights.json'
  );

  if (food) {
    // 카드 단위 저장
    const foodsData = JSON.parse(await fs.readFile(foodsPath, 'utf-8'));
    const idx = foodsData.findIndex((f: any) => f.id === food.id);
    if (idx >= 0) foodsData[idx] = food;
    else foodsData.push(food);
    await fs.writeFile(foodsPath, JSON.stringify(foodsData, null, 2));
  }

  if (foods) {
    // 전체 저장
    await fs.writeFile(foodsPath, JSON.stringify(foods, null, 2));
  }

  if (foodMoodWeights)
    await fs.writeFile(moodPath, JSON.stringify(foodMoodWeights, null, 2));
  if (foodWeatherWeights)
    await fs.writeFile(
      weatherPath,
      JSON.stringify(foodWeatherWeights, null, 2)
    );

  res.status(200).json({ message: '저장 완료' });
}
