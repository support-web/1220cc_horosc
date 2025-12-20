// 主要都市の緯度・経度データ
export interface City {
  name: string
  prefecture: string
  latitude: number
  longitude: number
}

export const prefectures = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
  '岐阜県', '静岡県', '愛知県', '三重県',
  '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
  '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県',
  '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
  '海外',
]

export const cities: City[] = [
  // 北海道
  { name: '札幌市', prefecture: '北海道', latitude: 43.0618, longitude: 141.3545 },
  { name: '函館市', prefecture: '北海道', latitude: 41.7687, longitude: 140.7288 },
  { name: '旭川市', prefecture: '北海道', latitude: 43.7707, longitude: 142.3650 },

  // 東北
  { name: '青森市', prefecture: '青森県', latitude: 40.8246, longitude: 140.7400 },
  { name: '盛岡市', prefecture: '岩手県', latitude: 39.7036, longitude: 141.1527 },
  { name: '仙台市', prefecture: '宮城県', latitude: 38.2682, longitude: 140.8694 },
  { name: '秋田市', prefecture: '秋田県', latitude: 39.7186, longitude: 140.1024 },
  { name: '山形市', prefecture: '山形県', latitude: 38.2404, longitude: 140.3633 },
  { name: '福島市', prefecture: '福島県', latitude: 37.7608, longitude: 140.4748 },

  // 関東
  { name: '水戸市', prefecture: '茨城県', latitude: 36.3418, longitude: 140.4468 },
  { name: '宇都宮市', prefecture: '栃木県', latitude: 36.5658, longitude: 139.8836 },
  { name: '前橋市', prefecture: '群馬県', latitude: 36.3912, longitude: 139.0608 },
  { name: 'さいたま市', prefecture: '埼玉県', latitude: 35.8617, longitude: 139.6455 },
  { name: '千葉市', prefecture: '千葉県', latitude: 35.6050, longitude: 140.1233 },
  { name: '東京23区', prefecture: '東京都', latitude: 35.6895, longitude: 139.6917 },
  { name: '八王子市', prefecture: '東京都', latitude: 35.6664, longitude: 139.3160 },
  { name: '横浜市', prefecture: '神奈川県', latitude: 35.4437, longitude: 139.6380 },
  { name: '川崎市', prefecture: '神奈川県', latitude: 35.5309, longitude: 139.7030 },

  // 中部
  { name: '新潟市', prefecture: '新潟県', latitude: 37.9026, longitude: 139.0232 },
  { name: '富山市', prefecture: '富山県', latitude: 36.6959, longitude: 137.2137 },
  { name: '金沢市', prefecture: '石川県', latitude: 36.5944, longitude: 136.6256 },
  { name: '福井市', prefecture: '福井県', latitude: 36.0652, longitude: 136.2216 },
  { name: '甲府市', prefecture: '山梨県', latitude: 35.6642, longitude: 138.5684 },
  { name: '長野市', prefecture: '長野県', latitude: 36.6485, longitude: 138.1950 },
  { name: '岐阜市', prefecture: '岐阜県', latitude: 35.4232, longitude: 136.7606 },
  { name: '静岡市', prefecture: '静岡県', latitude: 34.9769, longitude: 138.3831 },
  { name: '浜松市', prefecture: '静岡県', latitude: 34.7108, longitude: 137.7261 },
  { name: '名古屋市', prefecture: '愛知県', latitude: 35.1815, longitude: 136.9066 },
  { name: '津市', prefecture: '三重県', latitude: 34.7303, longitude: 136.5086 },

  // 近畿
  { name: '大津市', prefecture: '滋賀県', latitude: 35.0045, longitude: 135.8686 },
  { name: '京都市', prefecture: '京都府', latitude: 35.0116, longitude: 135.7681 },
  { name: '大阪市', prefecture: '大阪府', latitude: 34.6937, longitude: 135.5023 },
  { name: '堺市', prefecture: '大阪府', latitude: 34.5733, longitude: 135.4830 },
  { name: '神戸市', prefecture: '兵庫県', latitude: 34.6901, longitude: 135.1956 },
  { name: '姫路市', prefecture: '兵庫県', latitude: 34.8152, longitude: 134.6854 },
  { name: '奈良市', prefecture: '奈良県', latitude: 34.6851, longitude: 135.8049 },
  { name: '和歌山市', prefecture: '和歌山県', latitude: 34.2260, longitude: 135.1675 },

  // 中国
  { name: '鳥取市', prefecture: '鳥取県', latitude: 35.5011, longitude: 134.2351 },
  { name: '松江市', prefecture: '島根県', latitude: 35.4723, longitude: 133.0505 },
  { name: '岡山市', prefecture: '岡山県', latitude: 34.6618, longitude: 133.9350 },
  { name: '広島市', prefecture: '広島県', latitude: 34.3853, longitude: 132.4553 },
  { name: '山口市', prefecture: '山口県', latitude: 34.1859, longitude: 131.4714 },

  // 四国
  { name: '徳島市', prefecture: '徳島県', latitude: 34.0658, longitude: 134.5593 },
  { name: '高松市', prefecture: '香川県', latitude: 34.3401, longitude: 134.0434 },
  { name: '松山市', prefecture: '愛媛県', latitude: 33.8416, longitude: 132.7657 },
  { name: '高知市', prefecture: '高知県', latitude: 33.5597, longitude: 133.5311 },

  // 九州
  { name: '福岡市', prefecture: '福岡県', latitude: 33.5902, longitude: 130.4017 },
  { name: '北九州市', prefecture: '福岡県', latitude: 33.8835, longitude: 130.8752 },
  { name: '佐賀市', prefecture: '佐賀県', latitude: 33.2494, longitude: 130.2988 },
  { name: '長崎市', prefecture: '長崎県', latitude: 32.7503, longitude: 129.8779 },
  { name: '熊本市', prefecture: '熊本県', latitude: 32.7898, longitude: 130.7417 },
  { name: '大分市', prefecture: '大分県', latitude: 33.2382, longitude: 131.6126 },
  { name: '宮崎市', prefecture: '宮崎県', latitude: 31.9111, longitude: 131.4239 },
  { name: '鹿児島市', prefecture: '鹿児島県', latitude: 31.5966, longitude: 130.5571 },
  { name: '那覇市', prefecture: '沖縄県', latitude: 26.2124, longitude: 127.6809 },

  // 海外主要都市
  { name: 'ニューヨーク', prefecture: '海外', latitude: 40.7128, longitude: -74.0060 },
  { name: 'ロサンゼルス', prefecture: '海外', latitude: 34.0522, longitude: -118.2437 },
  { name: 'ロンドン', prefecture: '海外', latitude: 51.5074, longitude: -0.1278 },
  { name: 'パリ', prefecture: '海外', latitude: 48.8566, longitude: 2.3522 },
  { name: '北京', prefecture: '海外', latitude: 39.9042, longitude: 116.4074 },
  { name: '上海', prefecture: '海外', latitude: 31.2304, longitude: 121.4737 },
  { name: 'ソウル', prefecture: '海外', latitude: 37.5665, longitude: 126.9780 },
  { name: 'シンガポール', prefecture: '海外', latitude: 1.3521, longitude: 103.8198 },
  { name: 'シドニー', prefecture: '海外', latitude: -33.8688, longitude: 151.2093 },
]

export function getCitiesByPrefecture(prefecture: string): City[] {
  return cities.filter(city => city.prefecture === prefecture)
}

export function getDefaultCity(): City {
  return cities.find(city => city.name === '東京23区')!
}
