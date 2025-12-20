// 12星座
export type ZodiacSign =
  | 'aries' | 'taurus' | 'gemini' | 'cancer'
  | 'leo' | 'virgo' | 'libra' | 'scorpio'
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces'

// 天体
export type Planet =
  | 'sun' | 'moon' | 'mercury' | 'venus' | 'mars'
  | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto'

// ハウス (1-12)
export type House = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

// アスペクト
export type AspectType = 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition'

// 金運タイプ
export type MoneyType =
  | 'steady'      // 堅実蓄財型
  | 'intuitive'   // 直感投資型
  | 'network'     // 人脈活用型
  | 'creative'    // クリエイティブ型
  | 'intellectual' // 知的労働型
  | 'entrepreneur' // 起業家型
  | 'inheritance' // 継承発展型
  | 'stable'      // 安定収入型
  | 'expansion'   // 拡大成長型
  | 'transform'   // 変革型
  | 'spiritual'   // スピリチュアル型
  | 'balanced'    // バランス型

// 成功タイプ
export type SuccessType =
  | 'early'       // 早熟型
  | 'late_bloomer' // 大器晩成型
  | 'turning_point' // 転機活用型
  | 'steady_progress' // コツコツ型
  | 'big_break'   // 一発逆転型
  | 'networking'  // 人脈型
  | 'specialist'  // 専門家型
  | 'challenger'  // チャレンジ型

// 惑星位置
export interface PlanetPosition {
  planet: Planet
  sign: ZodiacSign
  degree: number
  house: House
}

// アスペクト
export interface Aspect {
  planet1: Planet
  planet2: Planet
  type: AspectType
  degree: number
  orb: number
}

// ホロスコープチャート
export interface HoroscopeChart {
  birthDate: Date
  birthTime: string
  birthPlace: string
  latitude: number
  longitude: number
  planets: PlanetPosition[]
  houseCusps: number[]
  ascendant: number
  midheaven: number
  aspects: Aspect[]
}

// 金運診断結果
export interface FortuneResult {
  moneyType: MoneyType
  moneyTypeScore: number
  successType: SuccessType
  strengths: Strength[]
  weaknesses: Weakness[]
  careers: Career[]
  monthlyFortune: MonthlyFortune[]
  radarScores: RadarScores
  luckyItems: LuckyItems
  advice: Advice
}

// 強み
export interface Strength {
  title: string
  description: string
  score: number
}

// 弱み
export interface Weakness {
  title: string
  description: string
  advice: string
}

// 職業
export interface Career {
  name: string
  compatibility: number
  description: string
}

// 月別運勢
export interface MonthlyFortune {
  month: number
  overall: number
  income: number
  investment: number
  description: string
}

// レーダーチャートスコア
export interface RadarScores {
  income: number      // 収入力
  savings: number     // 貯蓄力
  investment: number  // 投資運
  windfall: number    // 臨時収入運
  network: number     // 人脈財運
  inheritance: number // 継承運
}

// ラッキーアイテム
export interface LuckyItems {
  colors: string[]
  numbers: number[]
  day: string
  gemstone: string
  items: string[]
}

// アドバイス
export interface Advice {
  shortTerm: string[]
  midTerm: string[]
  longTerm: string[]
  warnings: string[]
  luckyActions: string[]
}

// 入力データ
export interface BirthData {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  birthPlace: string
  latitude: number
  longitude: number
  unknownTime: boolean
}

// 星座情報
export interface ZodiacInfo {
  key: ZodiacSign
  name: string
  symbol: string
  element: 'fire' | 'earth' | 'air' | 'water'
  ruler: Planet
  startDegree: number
}

// 惑星情報
export interface PlanetInfo {
  key: Planet
  name: string
  symbol: string
  moneyMeaning: string
}
