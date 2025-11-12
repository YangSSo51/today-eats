export interface Mood {
  id: number;
  name: string;
  code: string;
}

export interface Weather {
  id: number;
  name: string;
  code: string;
}

export interface FoodMoodWeight {
  foodId: number;
  moodId: number;
  weight: number;
}

export interface FoodWeatherWeight {
  foodId: number;
  weatherId: number;
  weight: number;
}
export interface Food {
  id: number;
  name: string;
  category: '한식' | '중식' | '일식' | '양식';
  calories: number;
  dietFriendly: boolean;
  seasonMonths?: number[];
  alwaysAvailable?: boolean;
  drinkSide?: boolean;
  image?: string;
  total?: number; // 추천 점수 계산 후 저장
}
