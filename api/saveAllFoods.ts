import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' });

  const {
    foods: newFoods,
    foodMoodWeights: newMoodWeights,
    foodWeatherWeights: newWeatherWeights,
  } = req.body;

  const foodsPath = path.join(process.cwd(), 'src/data/foods.json');
  const moodPath = path.join(process.cwd(), 'src/data/foodMoodWeights.json');
  const weatherPath = path.join(
    process.cwd(),
    'src/data/foodWeatherWeights.json'
  );

  const foodsData = JSON.parse(await fs.readFile(foodsPath, 'utf-8'));
  const moodData = JSON.parse(await fs.readFile(moodPath, 'utf-8'));
  const weatherData = JSON.parse(await fs.readFile(weatherPath, 'utf-8'));

  // 음식 병합
  newFoods.forEach((f: any) => {
    const idx = foodsData.findIndex((e: any) => e.id === f.id);
    if (idx >= 0) foodsData[idx] = f;
    else foodsData.push(f);
  });

  // 기분 가중치 병합
  newMoodWeights.forEach((w: any) => {
    const idx = moodData.findIndex(
      (e: any) => e.foodId === w.foodId && e.moodId === w.moodId
    );
    if (idx >= 0) moodData[idx] = w;
    else moodData.push(w);
  });

  // 날씨 가중치 병합
  newWeatherWeights.forEach((w: any) => {
    const idx = weatherData.findIndex(
      (e: any) => e.foodId === w.foodId && e.weatherId === w.weatherId
    );
    if (idx >= 0) weatherData[idx] = w;
    else weatherData.push(w);
  });

  // 파일 저장
  await fs.writeFile(foodsPath, JSON.stringify(foodsData, null, 2));
  await fs.writeFile(moodPath, JSON.stringify(moodData, null, 2));
  await fs.writeFile(weatherPath, JSON.stringify(weatherData, null, 2));

  res.status(200).json({ message: '전체 저장 완료' });
}
