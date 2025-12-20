import {
  ZodiacSign,
  Planet,
  House,
  AspectType,
  PlanetPosition,
  Aspect,
  HoroscopeChart,
  BirthData,
  ZodiacInfo,
  PlanetInfo,
} from '@/types/horoscope'

// 星座データ
export const zodiacData: ZodiacInfo[] = [
  { key: 'aries', name: '牡羊座', symbol: '♈', element: 'fire', ruler: 'mars', startDegree: 0 },
  { key: 'taurus', name: '牡牛座', symbol: '♉', element: 'earth', ruler: 'venus', startDegree: 30 },
  { key: 'gemini', name: '双子座', symbol: '♊', element: 'air', ruler: 'mercury', startDegree: 60 },
  { key: 'cancer', name: '蟹座', symbol: '♋', element: 'water', ruler: 'moon', startDegree: 90 },
  { key: 'leo', name: '獅子座', symbol: '♌', element: 'fire', ruler: 'sun', startDegree: 120 },
  { key: 'virgo', name: '乙女座', symbol: '♍', element: 'earth', ruler: 'mercury', startDegree: 150 },
  { key: 'libra', name: '天秤座', symbol: '♎', element: 'air', ruler: 'venus', startDegree: 180 },
  { key: 'scorpio', name: '蠍座', symbol: '♏', element: 'water', ruler: 'pluto', startDegree: 210 },
  { key: 'sagittarius', name: '射手座', symbol: '♐', element: 'fire', ruler: 'jupiter', startDegree: 240 },
  { key: 'capricorn', name: '山羊座', symbol: '♑', element: 'earth', ruler: 'saturn', startDegree: 270 },
  { key: 'aquarius', name: '水瓶座', symbol: '♒', element: 'air', ruler: 'uranus', startDegree: 300 },
  { key: 'pisces', name: '魚座', symbol: '♓', element: 'water', ruler: 'neptune', startDegree: 330 },
]

// 惑星データ
export const planetData: PlanetInfo[] = [
  { key: 'sun', name: '太陽', symbol: '☉', moneyMeaning: '基本的な金運傾向、社会的成功' },
  { key: 'moon', name: '月', symbol: '☽', moneyMeaning: 'お金に対する感情、消費傾向' },
  { key: 'mercury', name: '水星', symbol: '☿', moneyMeaning: 'ビジネスセンス、商才' },
  { key: 'venus', name: '金星', symbol: '♀', moneyMeaning: '金銭感覚、豊かさの引き寄せ' },
  { key: 'mars', name: '火星', symbol: '♂', moneyMeaning: '稼ぐ力、行動力' },
  { key: 'jupiter', name: '木星', symbol: '♃', moneyMeaning: '幸運、拡大、財運の大きさ' },
  { key: 'saturn', name: '土星', symbol: '♄', moneyMeaning: '貯蓄能力、堅実さ、試練' },
  { key: 'uranus', name: '天王星', symbol: '♅', moneyMeaning: '革新的収入源、変動' },
  { key: 'neptune', name: '海王星', symbol: '♆', moneyMeaning: '直感的投資、芸術的収入' },
  { key: 'pluto', name: '冥王星', symbol: '♇', moneyMeaning: '財の変容、大きな転換' },
]

// アスペクト設定
const aspectConfig: { type: AspectType; angle: number; orb: number }[] = [
  { type: 'conjunction', angle: 0, orb: 8 },
  { type: 'sextile', angle: 60, orb: 6 },
  { type: 'square', angle: 90, orb: 8 },
  { type: 'trine', angle: 120, orb: 8 },
  { type: 'opposition', angle: 180, orb: 8 },
]

// ユリウス日計算
function toJulianDay(year: number, month: number, day: number, hour: number = 12): number {
  if (month <= 2) {
    year -= 1
    month += 12
  }
  const A = Math.floor(year / 100)
  const B = 2 - A + Math.floor(A / 4)
  const JD = Math.floor(365.25 * (year + 4716)) +
    Math.floor(30.6001 * (month + 1)) +
    day + (hour / 24) + B - 1524.5
  return JD
}

// 太陽の黄経計算 (簡易版)
function getSunLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525
  const L0 = (280.46646 + 36000.76983 * T + 0.0003032 * T * T) % 360
  const M = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) % 360
  const e = 0.016708634 - 0.000042037 * T
  const C = (1.914602 - 0.004817 * T) * Math.sin(M * Math.PI / 180) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M * Math.PI / 180)
  return (L0 + C + 360) % 360
}

// 月の黄経計算 (簡易版)
function getMoonLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525
  const L = (218.3164477 + 481267.88123421 * T) % 360
  const D = (297.8501921 + 445267.1114034 * T) % 360
  const M = (357.5291092 + 35999.0502909 * T) % 360
  const Mm = (134.9633964 + 477198.8675055 * T) % 360
  const F = (93.272095 + 483202.0175233 * T) % 360

  let longitude = L +
    6.289 * Math.sin(Mm * Math.PI / 180) +
    1.274 * Math.sin((2 * D - Mm) * Math.PI / 180) +
    0.658 * Math.sin(2 * D * Math.PI / 180)

  return (longitude + 360) % 360
}

// 惑星の黄経計算 (簡易版 - 各惑星の平均運動に基づく)
function getPlanetLongitude(planet: Planet, jd: number): number {
  const T = (jd - 2451545.0) / 36525

  // 各惑星の軌道要素 (簡易版)
  const orbits: Record<Planet, { L0: number; rate: number }> = {
    sun: { L0: 280.46646, rate: 0.9856474 },
    moon: { L0: 218.32, rate: 13.176358 },
    mercury: { L0: 252.25, rate: 4.0923344 },
    venus: { L0: 181.98, rate: 1.6021302 },
    mars: { L0: 355.43, rate: 0.5240208 },
    jupiter: { L0: 34.35, rate: 0.0830853 },
    saturn: { L0: 50.08, rate: 0.0334979 },
    uranus: { L0: 314.06, rate: 0.0117258 },
    neptune: { L0: 304.35, rate: 0.0059891 },
    pluto: { L0: 238.96, rate: 0.003972 },
  }

  if (planet === 'sun') return getSunLongitude(jd)
  if (planet === 'moon') return getMoonLongitude(jd)

  const orbit = orbits[planet]
  const days = jd - 2451545.0
  return (orbit.L0 + orbit.rate * days + 360) % 360
}

// 黄経から星座を取得
function getSignFromLongitude(longitude: number): ZodiacSign {
  const signIndex = Math.floor(longitude / 30)
  return zodiacData[signIndex].key
}

// 黄経からハウスを取得 (簡易版: Whole Sign House)
function getHouseFromLongitude(longitude: number, ascendant: number): House {
  const adjusted = (longitude - ascendant + 360) % 360
  return (Math.floor(adjusted / 30) + 1) as House
}

// アセンダント計算 (簡易版)
function calculateAscendant(jd: number, latitude: number, longitude: number): number {
  const T = (jd - 2451545.0) / 36525
  const GMST = (280.46061837 + 360.98564736629 * (jd - 2451545.0) +
    0.000387933 * T * T) % 360
  const LST = (GMST + longitude + 360) % 360

  // 簡易アセンダント計算
  const latRad = latitude * Math.PI / 180
  const obliquity = 23.4393 * Math.PI / 180
  const lstRad = LST * Math.PI / 180

  const asc = Math.atan2(
    Math.cos(lstRad),
    -(Math.sin(lstRad) * Math.cos(obliquity) + Math.tan(latRad) * Math.sin(obliquity))
  ) * 180 / Math.PI

  return (asc + 360) % 360
}

// アスペクト計算
function calculateAspects(planets: PlanetPosition[]): Aspect[] {
  const aspects: Aspect[] = []

  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const diff = Math.abs(planets[i].degree - planets[j].degree)
      const normalizedDiff = diff > 180 ? 360 - diff : diff

      for (const config of aspectConfig) {
        const orb = Math.abs(normalizedDiff - config.angle)
        if (orb <= config.orb) {
          aspects.push({
            planet1: planets[i].planet,
            planet2: planets[j].planet,
            type: config.type,
            degree: normalizedDiff,
            orb: orb,
          })
          break
        }
      }
    }
  }

  return aspects
}

// ホロスコープチャート生成
export function calculateHoroscope(birthData: BirthData): HoroscopeChart {
  const hour = birthData.unknownTime ? 12 : birthData.hour + birthData.minute / 60
  const jd = toJulianDay(birthData.year, birthData.month, birthData.day, hour)

  const ascendant = calculateAscendant(jd, birthData.latitude, birthData.longitude)
  const midheaven = (ascendant + 270) % 360 // 簡易MC計算

  // 各惑星の位置を計算
  const planetKeys: Planet[] = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto']
  const planets: PlanetPosition[] = planetKeys.map(planet => {
    const longitude = getPlanetLongitude(planet, jd)
    return {
      planet,
      sign: getSignFromLongitude(longitude),
      degree: longitude,
      house: getHouseFromLongitude(longitude, ascendant),
    }
  })

  // ハウスカスプ (Whole Sign House)
  const houseCusps: number[] = []
  for (let i = 0; i < 12; i++) {
    houseCusps.push((ascendant + i * 30) % 360)
  }

  // アスペクト計算
  const aspects = calculateAspects(planets)

  return {
    birthDate: new Date(birthData.year, birthData.month - 1, birthData.day),
    birthTime: birthData.unknownTime ? '不明' : `${birthData.hour}:${String(birthData.minute).padStart(2, '0')}`,
    birthPlace: birthData.birthPlace,
    latitude: birthData.latitude,
    longitude: birthData.longitude,
    planets,
    houseCusps,
    ascendant,
    midheaven,
    aspects,
  }
}

// 星座名取得
export function getZodiacName(sign: ZodiacSign): string {
  return zodiacData.find(z => z.key === sign)?.name || ''
}

// 星座シンボル取得
export function getZodiacSymbol(sign: ZodiacSign): string {
  return zodiacData.find(z => z.key === sign)?.symbol || ''
}

// 惑星名取得
export function getPlanetName(planet: Planet): string {
  return planetData.find(p => p.key === planet)?.name || ''
}

// 惑星シンボル取得
export function getPlanetSymbol(planet: Planet): string {
  return planetData.find(p => p.key === planet)?.symbol || ''
}

// ハウスルーラー取得
export function getHouseRuler(chart: HoroscopeChart, house: House): Planet {
  const houseStartDegree = chart.houseCusps[house - 1]
  const sign = getSignFromLongitude(houseStartDegree)
  const zodiac = zodiacData.find(z => z.key === sign)
  return zodiac?.ruler || 'sun'
}

// 指定ハウスの惑星取得
export function getPlanetsInHouse(chart: HoroscopeChart, house: House): Planet[] {
  return chart.planets
    .filter(p => p.house === house)
    .map(p => p.planet)
}

// アスペクトタイプ名取得
export function getAspectName(type: AspectType): string {
  const names: Record<AspectType, string> = {
    conjunction: 'コンジャンクション',
    sextile: 'セクスタイル',
    square: 'スクエア',
    trine: 'トライン',
    opposition: 'オポジション',
  }
  return names[type]
}

// アスペクトの性質取得
export function getAspectNature(type: AspectType): 'harmonious' | 'challenging' | 'neutral' {
  if (type === 'trine' || type === 'sextile') return 'harmonious'
  if (type === 'square' || type === 'opposition') return 'challenging'
  return 'neutral'
}
