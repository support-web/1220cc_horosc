import {
  MoneyType,
  SuccessType,
  HoroscopeChart,
  FortuneResult,
  Strength,
  Weakness,
  Career,
  MonthlyFortune,
  RadarScores,
  LuckyItems,
  Advice,
  ZodiacSign,
  Planet,
} from '@/types/horoscope'
import {
  getHouseRuler,
  getPlanetsInHouse,
  getZodiacName,
  getPlanetName,
  zodiacData,
} from './horoscope'

// 金運タイプ情報
export const moneyTypeInfo: Record<MoneyType, { name: string; description: string }> = {
  steady: {
    name: '堅実蓄財型',
    description: 'コツコツと着実に財を築いていくタイプ。長期的な視点で資産形成を行い、無駄遣いを避ける堅実さがあります。焦らず地道に積み重ねることで、確実に豊かさを手に入れることができます。',
  },
  intuitive: {
    name: '直感投資型',
    description: '直感やインスピレーションでお金を動かすタイプ。大きな波はありますが、ひらめきを信じることで思わぬ幸運を掴むことができます。感性を磨くことが財運アップの鍵です。',
  },
  network: {
    name: '人脈活用型',
    description: '人との繋がりからお金が生まれるタイプ。あなたの周りに集まる人々が、財運をもたらしてくれます。人間関係を大切にし、Win-Winの関係を築くことで豊かさが広がります。',
  },
  creative: {
    name: 'クリエイティブ型',
    description: '創造性や芸術的センスで収入を得るタイプ。独自のアイデアや表現力が評価され、それがお金に繋がります。自分らしさを追求することが、財運アップの近道です。',
  },
  intellectual: {
    name: '知的労働型',
    description: '知識や情報、専門性で稼ぐタイプ。頭脳を活かした仕事で成功を収めます。学び続ける姿勢と、知識をアウトプットする力が財運を高めます。',
  },
  entrepreneur: {
    name: '起業家型',
    description: '自ら事業を起こし、リーダーとして財を築くタイプ。リスクを取る勇気と行動力があり、独立して成功を収める可能性が高いです。自分のビジョンを信じて進むことが大切です。',
  },
  inheritance: {
    name: '継承発展型',
    description: '他者から受け継いだものを発展させるタイプ。遺産や事業継承、パートナーの財などを通じて豊かさを得ます。受け取ったものを大切に育てる力があります。',
  },
  stable: {
    name: '安定収入型',
    description: '組織の中で安定した収入を得るタイプ。コツコツと働き、確実に昇進・昇給していく力があります。安心感のある環境で力を発揮し、着実に資産を増やしていきます。',
  },
  expansion: {
    name: '拡大成長型',
    description: 'どんどん収入を増やし、スケールアップしていくタイプ。海外や大きなプロジェクトとの縁があり、器の大きな財運を持っています。挑戦を恐れず、大きく考えることで成功します。',
  },
  transform: {
    name: '変革型',
    description: '人生の転換期に大きく財運が変わるタイプ。変化を恐れず、新しい道に飛び込むことで思わぬ幸運を掴みます。古いものを手放す勇気が、新しい豊かさを呼び込みます。',
  },
  spiritual: {
    name: 'スピリチュアル型',
    description: '精神的な豊かさと物質的な豊かさが連動するタイプ。直感力や霊感を活かした仕事、癒しや精神世界に関連した収入源と縁があります。内面を磨くことで外側も豊かになります。',
  },
  balanced: {
    name: 'バランス型',
    description: '複数の収入源をバランス良く持つタイプ。一つに依存せず、多角的に財を築きます。様々な可能性を持ち、状況に応じて柔軟に対応できる強さがあります。',
  },
}

// 成功タイプ情報
export const successTypeInfo: Record<SuccessType, { name: string; description: string }> = {
  early: {
    name: '早熟型',
    description: '若いうちから才能を発揮し、早い段階で成功を収めるタイプ。思い立ったらすぐ行動することで、チャンスを掴むことができます。',
  },
  late_bloomer: {
    name: '大器晩成型',
    description: '40代以降に本当の実力を発揮するタイプ。若い頃の経験や努力が、後になって大きな実を結びます。焦らず着実に力を蓄えましょう。',
  },
  turning_point: {
    name: '転機活用型',
    description: '人生の転換期が成功のチャンスとなるタイプ。大きな変化を恐れず、むしろチャンスとして活用することで飛躍できます。',
  },
  steady_progress: {
    name: 'コツコツ型',
    description: '日々の積み重ねで成功を掴むタイプ。派手さはなくても、確実に前進し続けることで、気づけば大きな成果を上げています。',
  },
  big_break: {
    name: '一発逆転型',
    description: '突然の幸運や意外な展開で成功するタイプ。予想外のチャンスが訪れやすく、それを逃さない嗅覚を持っています。',
  },
  networking: {
    name: '人脈型',
    description: '人との出会いが成功の鍵となるタイプ。良い人間関係を築くことで、自然とチャンスが舞い込んできます。',
  },
  specialist: {
    name: '専門家型',
    description: '専門性を極めることで成功するタイプ。一つの分野を深く掘り下げ、第一人者となることで大きな成果を得られます。',
  },
  challenger: {
    name: 'チャレンジ型',
    description: '挑戦し続けることで成功を掴むタイプ。失敗を恐れず、常に新しいことにトライする姿勢が、やがて大きな成功に繋がります。',
  },
}

// 職業マッピング
const careerMapping: Record<string, string[]> = {
  aries: ['起業家', '営業職', 'スポーツ関連', 'エンジニア', '軍・警察'],
  taurus: ['金融業', '不動産業', '美容関連', '飲食業', '芸術家'],
  gemini: ['メディア関連', '通信業', '教育者', '作家', '営業'],
  cancer: ['介護職', '飲食業', '不動産業', '保育士', 'カウンセラー'],
  leo: ['エンタメ業界', '経営者', '芸術家', 'ブランド業', '政治家'],
  virgo: ['医療関連', '会計士', 'IT技術者', '品質管理', '研究者'],
  libra: ['法律関連', 'デザイナー', '接客業', '仲介業', '外交官'],
  scorpio: ['金融業', '調査業', '医療関連', '保険業', '心理職'],
  sagittarius: ['教育者', '出版業', '旅行業', '貿易業', '通訳'],
  capricorn: ['経営者', '政治家', '建設業', '製造業', '公務員'],
  aquarius: ['IT業界', '先端技術', 'NPO活動', '発明家', 'コンサルタント'],
  pisces: ['芸術家', '医療関連', '福祉業', 'スピリチュアル', '映像関連'],
}

// ラッキーアイテムデータ
const luckyItemData: Record<Planet, {
  colors: string[]
  numbers: number[]
  day: string
  gemstones: string[]
  items: string[]
}> = {
  sun: {
    colors: ['ゴールド', 'オレンジ', '黄色'],
    numbers: [1, 4, 10],
    day: '日曜日',
    gemstones: ['ダイヤモンド', 'ルビー', 'アンバー'],
    items: ['金製品', '高級時計', 'ブランド品'],
  },
  moon: {
    colors: ['シルバー', '白', 'パールホワイト'],
    numbers: [2, 7, 11],
    day: '月曜日',
    gemstones: ['パール', 'ムーンストーン', 'オパール'],
    items: ['銀製品', '水晶', '貝殻'],
  },
  mercury: {
    colors: ['黄緑', 'マルチカラー', 'グレー'],
    numbers: [5, 14, 23],
    day: '水曜日',
    gemstones: ['エメラルド', 'アゲート', 'トルマリン'],
    items: ['書籍', 'スマートフォン', '手帳'],
  },
  venus: {
    colors: ['ピンク', 'パステルグリーン', '水色'],
    numbers: [6, 15, 24],
    day: '金曜日',
    gemstones: ['エメラルド', 'ローズクォーツ', 'サファイア'],
    items: ['化粧品', 'アクセサリー', '花'],
  },
  mars: {
    colors: ['赤', 'オレンジレッド', 'マルーン'],
    numbers: [9, 18, 27],
    day: '火曜日',
    gemstones: ['ルビー', 'ガーネット', 'カーネリアン'],
    items: ['スポーツ用品', '刃物', '赤いもの'],
  },
  jupiter: {
    colors: ['紫', '藍色', 'ロイヤルブルー'],
    numbers: [3, 12, 21],
    day: '木曜日',
    gemstones: ['アメジスト', 'ラピスラズリ', 'トパーズ'],
    items: ['海外のもの', '書籍', '馬関連'],
  },
  saturn: {
    colors: ['黒', 'ダークブラウン', 'ネイビー'],
    numbers: [8, 17, 26],
    day: '土曜日',
    gemstones: ['ブルーサファイア', 'オニキス', 'ガーネット'],
    items: ['革製品', 'アンティーク', '時計'],
  },
  uranus: {
    colors: ['電気ブルー', 'シアン', 'ネオンカラー'],
    numbers: [4, 13, 22],
    day: '水曜日',
    gemstones: ['アクアマリン', 'ジルコン', 'アメジスト'],
    items: ['電子機器', 'ユニークなもの', '最新技術'],
  },
  neptune: {
    colors: ['シーグリーン', 'ラベンダー', '水色'],
    numbers: [7, 16, 25],
    day: '金曜日',
    gemstones: ['アクアマリン', 'オパール', 'パール'],
    items: ['香水', '芸術品', '海関連のもの'],
  },
  pluto: {
    colors: ['ダークレッド', '黒', 'バーガンディ'],
    numbers: [0, 11, 22],
    day: '火曜日',
    gemstones: ['ガーネット', 'オブシディアン', 'ルビー'],
    items: ['パワーストーン', '変容を象徴するもの', '再生のシンボル'],
  },
}

// 金運タイプ判定
function determineMoneyType(chart: HoroscopeChart): { type: MoneyType; score: number } {
  const scores: Record<MoneyType, number> = {
    steady: 0,
    intuitive: 0,
    network: 0,
    creative: 0,
    intellectual: 0,
    entrepreneur: 0,
    inheritance: 0,
    stable: 0,
    expansion: 0,
    transform: 0,
    spiritual: 0,
    balanced: 0,
  }

  // 2ハウス分析
  const house2Planets = getPlanetsInHouse(chart, 2)
  const house2Ruler = getHouseRuler(chart, 2)

  if (house2Planets.includes('saturn')) scores.steady += 20
  if (house2Planets.includes('jupiter')) scores.expansion += 20
  if (house2Planets.includes('uranus')) scores.transform += 20
  if (house2Planets.includes('neptune')) scores.intuitive += 15
  if (house2Planets.includes('venus')) scores.creative += 15
  if (house2Planets.includes('mercury')) scores.intellectual += 15
  if (house2Planets.includes('mars')) scores.entrepreneur += 15

  // 8ハウス分析
  const house8Planets = getPlanetsInHouse(chart, 8)
  if (house8Planets.length > 0) scores.inheritance += 15
  if (house8Planets.includes('pluto')) scores.inheritance += 10

  // 10ハウス分析
  const house10Planets = getPlanetsInHouse(chart, 10)
  if (house10Planets.includes('saturn')) scores.stable += 15
  if (house10Planets.includes('sun')) scores.entrepreneur += 10

  // 11ハウス分析
  const house11Planets = getPlanetsInHouse(chart, 11)
  if (house11Planets.length > 0) scores.network += 15

  // 5ハウス分析
  const house5Planets = getPlanetsInHouse(chart, 5)
  if (house5Planets.includes('neptune') || house5Planets.includes('venus')) {
    scores.creative += 10
  }

  // 12ハウス分析
  const house12Planets = getPlanetsInHouse(chart, 12)
  if (house12Planets.length > 0) scores.spiritual += 10

  // アスペクト分析
  for (const aspect of chart.aspects) {
    if ((aspect.planet1 === 'venus' && aspect.planet2 === 'jupiter') ||
      (aspect.planet1 === 'jupiter' && aspect.planet2 === 'venus')) {
      if (aspect.type === 'trine' || aspect.type === 'sextile') {
        scores.expansion += 15
      }
    }
    if ((aspect.planet1 === 'jupiter' && aspect.planet2 === 'saturn') ||
      (aspect.planet1 === 'saturn' && aspect.planet2 === 'jupiter')) {
      if (aspect.type === 'trine') {
        scores.balanced += 15
      }
    }
  }

  // 最高スコアのタイプを取得
  let maxType: MoneyType = 'balanced'
  let maxScore = 0
  for (const [type, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score
      maxType = type as MoneyType
    }
  }

  // スコアが低い場合はバランス型
  if (maxScore < 15) {
    maxType = 'balanced'
    maxScore = 50
  }

  return { type: maxType, score: Math.min(100, maxScore + 50) }
}

// 成功タイプ判定
function determineSuccessType(chart: HoroscopeChart): SuccessType {
  const scores: Record<SuccessType, number> = {
    early: 0,
    late_bloomer: 0,
    turning_point: 0,
    steady_progress: 0,
    big_break: 0,
    networking: 0,
    specialist: 0,
    challenger: 0,
  }

  // 惑星分析
  const house1Planets = getPlanetsInHouse(chart, 1)
  if (house1Planets.includes('jupiter')) scores.early += 15
  if (house1Planets.includes('mars')) scores.challenger += 15

  // 土星の位置
  const saturnPos = chart.planets.find(p => p.planet === 'saturn')
  if (saturnPos) {
    if (saturnPos.sign === 'capricorn' || saturnPos.sign === 'virgo') {
      scores.late_bloomer += 15
    }
    if (saturnPos.house === 10) scores.steady_progress += 10
  }

  // 天王星・冥王星の影響
  const uranusPos = chart.planets.find(p => p.planet === 'uranus')
  const plutoPos = chart.planets.find(p => p.planet === 'pluto')

  if (uranusPos?.house === 2 || uranusPos?.house === 10) {
    scores.big_break += 15
  }
  if (plutoPos) {
    const plutoAspects = chart.aspects.filter(
      a => a.planet1 === 'pluto' || a.planet2 === 'pluto'
    )
    if (plutoAspects.length > 2) scores.turning_point += 15
  }

  // 7ハウス・11ハウス
  const house7Planets = getPlanetsInHouse(chart, 7)
  const house11Planets = getPlanetsInHouse(chart, 11)
  if (house7Planets.length + house11Planets.length > 1) {
    scores.networking += 15
  }

  // 9ハウス
  const house9Planets = getPlanetsInHouse(chart, 9)
  if (house9Planets.includes('saturn') || house9Planets.includes('mercury')) {
    scores.specialist += 15
  }

  // 乙女座・6ハウス
  const virgoCount = chart.planets.filter(p => p.sign === 'virgo').length
  const house6Planets = getPlanetsInHouse(chart, 6)
  if (virgoCount > 1 || house6Planets.length > 1) {
    scores.steady_progress += 10
  }

  // 最高スコアを返す
  let maxType: SuccessType = 'steady_progress'
  let maxScore = 0
  for (const [type, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score
      maxType = type as SuccessType
    }
  }

  return maxType
}

// 強み分析
function analyzeStrengths(chart: HoroscopeChart): Strength[] {
  const strengths: Strength[] = []

  // 木星の分析
  const jupiterPos = chart.planets.find(p => p.planet === 'jupiter')
  if (jupiterPos) {
    if (jupiterPos.house === 2) {
      strengths.push({
        title: '収入が自然と増える体質',
        description: '木星が2ハウスにあり、自然と収入が増えていく強運の持ち主です。豊かさを引き寄せる力があります。',
        score: 90,
      })
    }
    if (jupiterPos.house === 10) {
      strengths.push({
        title: '社会的成功からの収入',
        description: 'キャリアにおいて幸運があり、社会的地位の向上とともに収入も増えていきます。',
        score: 85,
      })
    }
  }

  // 金星の分析
  const venusPos = chart.planets.find(p => p.planet === 'venus')
  if (venusPos) {
    if (venusPos.house === 2 || venusPos.house === 8) {
      strengths.push({
        title: '優れた金銭感覚',
        description: '金星の影響で、お金との相性が良く、自然と豊かさを引き寄せる魅力を持っています。',
        score: 80,
      })
    }
  }

  // アスペクト分析
  const venusJupiterAspect = chart.aspects.find(
    a => (a.planet1 === 'venus' && a.planet2 === 'jupiter') ||
      (a.planet1 === 'jupiter' && a.planet2 === 'venus')
  )
  if (venusJupiterAspect && (venusJupiterAspect.type === 'trine' || venusJupiterAspect.type === 'sextile')) {
    strengths.push({
      title: '幸運な金回り',
      description: '金星と木星の調和的なアスペクトにより、お金に困らない運を持っています。',
      score: 85,
    })
  }

  // 土星の分析
  const saturnPos = chart.planets.find(p => p.planet === 'saturn')
  if (saturnPos) {
    const saturn2hAspect = chart.aspects.find(
      a => (a.planet1 === 'saturn' || a.planet2 === 'saturn') &&
        (a.type === 'trine' || a.type === 'sextile')
    )
    if (saturn2hAspect) {
      strengths.push({
        title: '堅実な蓄財能力',
        description: '土星の影響で、計画的にお金を貯める力があります。長期的な視点で資産を築けます。',
        score: 75,
      })
    }
  }

  // 最低3つの強みを確保
  if (strengths.length < 3) {
    const sunPos = chart.planets.find(p => p.planet === 'sun')
    if (sunPos && strengths.length < 3) {
      const sunSign = zodiacData.find(z => z.key === sunPos.sign)
      strengths.push({
        title: `${sunSign?.name}の金運力`,
        description: `太陽星座の${sunSign?.name}が持つ特性を活かした稼ぎ方ができます。`,
        score: 70,
      })
    }

    const marsPos = chart.planets.find(p => p.planet === 'mars')
    if (marsPos && strengths.length < 3) {
      strengths.push({
        title: '行動力で稼ぐ力',
        description: '火星のエネルギーにより、積極的にお金を稼ぐ行動力があります。',
        score: 65,
      })
    }

    if (strengths.length < 3) {
      strengths.push({
        title: 'バランスの取れた金運',
        description: '極端な偏りがなく、様々な方法で収入を得られる可能性を持っています。',
        score: 60,
      })
    }
  }

  return strengths.slice(0, 3).sort((a, b) => b.score - a.score)
}

// 弱み分析
function analyzeWeaknesses(chart: HoroscopeChart): Weakness[] {
  const weaknesses: Weakness[] = []

  // 海王星の影響
  const neptunePos = chart.planets.find(p => p.planet === 'neptune')
  if (neptunePos?.house === 2) {
    weaknesses.push({
      title: '金銭管理が甘くなりがち',
      description: '海王星の影響で、お金の流れが曖昧になりやすい傾向があります。',
      advice: '自動貯金や家計簿アプリを活用して、お金の流れを可視化しましょう。',
    })
  }

  // ハードアスペクト分析
  const hardAspects = chart.aspects.filter(a => a.type === 'square' || a.type === 'opposition')

  for (const aspect of hardAspects) {
    if ((aspect.planet1 === 'saturn' || aspect.planet2 === 'saturn') &&
      (aspect.planet1 === 'mars' || aspect.planet2 === 'mars')) {
      weaknesses.push({
        title: '焦りから失敗しやすい',
        description: '火星と土星のハードアスペクトにより、急ぎすぎて損をすることがあります。',
        advice: '大きな金銭的決断は、一晩置いてから行うようにしましょう。',
      })
    }

    if ((aspect.planet1 === 'uranus' || aspect.planet2 === 'uranus') &&
      (aspect.planet1 === 'venus' || aspect.planet2 === 'venus')) {
      weaknesses.push({
        title: '収入の波が激しい',
        description: '天王星の影響で、収入に変動が生じやすい傾向があります。',
        advice: '安定収入源を確保しつつ、変動に備えた貯蓄を心がけましょう。',
      })
    }
  }

  // 最低2つの注意点を確保
  if (weaknesses.length < 2) {
    weaknesses.push({
      title: '慎重さが足りないことも',
      description: '時として、十分な検討なしに金銭的決断をしてしまうことがあります。',
      advice: '大きな出費の前には、本当に必要かどうか一度立ち止まって考えましょう。',
    })
  }

  if (weaknesses.length < 2) {
    weaknesses.push({
      title: '自分の価値を低く見積もりがち',
      description: '自分のスキルや時間の価値を適正に評価できないことがあります。',
      advice: '自分のサービスや労働の市場価値を調査し、適正な対価を受け取りましょう。',
    })
  }

  return weaknesses.slice(0, 3)
}

// 適職分析
function analyzeCaree(chart: HoroscopeChart): Career[] {
  const careers: Career[] = []
  const careerScores: Record<string, number> = {}

  // 2ハウスのサインから
  const house2Start = chart.houseCusps[1]
  const house2Sign = zodiacData[Math.floor(house2Start / 30)].key
  const h2Careers = careerMapping[house2Sign] || []
  h2Careers.forEach((career, i) => {
    careerScores[career] = (careerScores[career] || 0) + (5 - i) * 10
  })

  // 10ハウスの惑星から
  const house10Planets = getPlanetsInHouse(chart, 10)
  for (const planet of house10Planets) {
    if (planet === 'sun') {
      careerScores['経営者'] = (careerScores['経営者'] || 0) + 30
      careerScores['リーダー職'] = (careerScores['リーダー職'] || 0) + 25
    }
    if (planet === 'venus') {
      careerScores['美容関連'] = (careerScores['美容関連'] || 0) + 30
      careerScores['デザイナー'] = (careerScores['デザイナー'] || 0) + 25
    }
    if (planet === 'mercury') {
      careerScores['メディア関連'] = (careerScores['メディア関連'] || 0) + 30
      careerScores['コンサルタント'] = (careerScores['コンサルタント'] || 0) + 25
    }
    if (planet === 'jupiter') {
      careerScores['教育者'] = (careerScores['教育者'] || 0) + 30
      careerScores['法律関連'] = (careerScores['法律関連'] || 0) + 25
    }
  }

  // MCのサインから
  const mcSign = zodiacData[Math.floor(chart.midheaven / 30)].key
  const mcCareers = careerMapping[mcSign] || []
  mcCareers.forEach((career, i) => {
    careerScores[career] = (careerScores[career] || 0) + (5 - i) * 8
  })

  // スコア順にソート
  const sortedCareers = Object.entries(careerScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  for (const [career, score] of sortedCareers) {
    careers.push({
      name: career,
      compatibility: Math.min(100, score + 40),
      description: `あなたの星の配置から、${career}との相性が良いことがわかります。`,
    })
  }

  // 最低5つを確保
  while (careers.length < 5) {
    const defaultCareers = ['フリーランス', '自営業', 'コンサルタント', '投資家', 'クリエイター']
    careers.push({
      name: defaultCareers[careers.length],
      compatibility: 60,
      description: `柔軟な働き方として${defaultCareers[careers.length]}も適性があります。`,
    })
  }

  return careers
}

// 月別運勢計算
function calculateMonthlyFortune(chart: HoroscopeChart): MonthlyFortune[] {
  const monthlyFortune: MonthlyFortune[] = []
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1

  const descriptions = [
    '新しいチャンスが訪れる時期です。積極的に行動しましょう。',
    '安定期。着実に貯蓄を増やすのに良い時期です。',
    '変化の兆し。柔軟に対応することで運気アップ。',
    '人との繋がりから良い情報が入りそうです。',
    '慎重な判断が求められる時期。大きな出費は控えめに。',
    '創造性が高まる時期。新しいアイデアを形にしましょう。',
    '良い流れが継続。この調子で進めていきましょう。',
    '学びの時期。スキルアップへの投資が吉。',
    '拡大のチャンス。思い切った行動が実を結びます。',
    '調整期。計画の見直しに適しています。',
    '実りの時期。これまでの努力が報われます。',
    '準備の時期。来年に向けて基盤を固めましょう。',
  ]

  for (let i = 0; i < 12; i++) {
    const month = ((currentMonth - 1 + i) % 12) + 1

    // 疑似ランダムだが再現性のあるスコア生成
    const seed = chart.planets[0].degree + month * 7
    const baseScore = 50 + Math.sin(seed) * 20
    const incomeVariation = Math.cos(seed * 1.3) * 15
    const investmentVariation = Math.sin(seed * 0.7) * 15

    monthlyFortune.push({
      month: month,
      overall: Math.round(Math.max(30, Math.min(90, baseScore))),
      income: Math.round(Math.max(30, Math.min(90, baseScore + incomeVariation))),
      investment: Math.round(Math.max(30, Math.min(90, baseScore + investmentVariation))),
      description: descriptions[(month - 1) % 12],
    })
  }

  return monthlyFortune
}

// レーダースコア計算
function calculateRadarScores(chart: HoroscopeChart): RadarScores {
  let income = 50
  let savings = 50
  let investment = 50
  let windfall = 50
  let network = 50
  let inheritance = 50

  // 2ハウス分析 (収入力)
  const house2Planets = getPlanetsInHouse(chart, 2)
  income += house2Planets.length * 10
  if (house2Planets.includes('jupiter')) income += 15
  if (house2Planets.includes('venus')) income += 10

  // 土星の影響 (貯蓄力)
  const saturnPos = chart.planets.find(p => p.planet === 'saturn')
  if (saturnPos) {
    if (saturnPos.sign === 'capricorn' || saturnPos.sign === 'taurus') savings += 20
    if (saturnPos.house === 2) savings += 15
  }

  // 5ハウス・8ハウス分析 (投資運)
  const house5Planets = getPlanetsInHouse(chart, 5)
  const house8Planets = getPlanetsInHouse(chart, 8)
  investment += house5Planets.length * 8
  investment += house8Planets.length * 8
  if (house5Planets.includes('jupiter')) investment += 15

  // 天王星の影響 (臨時収入運)
  const uranusPos = chart.planets.find(p => p.planet === 'uranus')
  if (uranusPos) {
    if (uranusPos.house === 2 || uranusPos.house === 8) windfall += 20
  }
  if (house8Planets.includes('uranus')) windfall += 15

  // 11ハウス分析 (人脈財運)
  const house11Planets = getPlanetsInHouse(chart, 11)
  network += house11Planets.length * 12
  if (house11Planets.includes('jupiter')) network += 15

  // 8ハウス分析 (継承運)
  inheritance += house8Planets.length * 10
  if (house8Planets.includes('pluto')) inheritance += 20

  return {
    income: Math.min(100, Math.max(20, income)),
    savings: Math.min(100, Math.max(20, savings)),
    investment: Math.min(100, Math.max(20, investment)),
    windfall: Math.min(100, Math.max(20, windfall)),
    network: Math.min(100, Math.max(20, network)),
    inheritance: Math.min(100, Math.max(20, inheritance)),
  }
}

// ラッキーアイテム算出
function calculateLuckyItems(chart: HoroscopeChart): LuckyItems {
  const house2Ruler = getHouseRuler(chart, 2)
  const venusPos = chart.planets.find(p => p.planet === 'venus')
  const jupiterPos = chart.planets.find(p => p.planet === 'jupiter')

  const rulerData = luckyItemData[house2Ruler]
  const venusData = luckyItemData.venus
  const jupiterData = luckyItemData.jupiter

  return {
    colors: [rulerData.colors[0], venusData.colors[0]],
    numbers: [...rulerData.numbers.slice(0, 2), jupiterData.numbers[0]],
    day: jupiterData.day, // 金運は木曜日が基本
    gemstone: venusData.gemstones[0],
    items: [...rulerData.items.slice(0, 2), ...jupiterData.items.slice(0, 1)],
  }
}

// アドバイス生成
function generateAdvice(chart: HoroscopeChart, moneyType: MoneyType, successType: SuccessType): Advice {
  const advice: Advice = {
    shortTerm: [],
    midTerm: [],
    longTerm: [],
    warnings: [],
    luckyActions: [],
  }

  // 成功タイプ別アドバイス
  switch (successType) {
    case 'early':
      advice.shortTerm.push('思い立ったらすぐ行動に移しましょう')
      advice.warnings.push('成功しても慢心せず、次のステップを考えましょう')
      break
    case 'late_bloomer':
      advice.shortTerm.push('今は基礎固めの時期と心得て、焦らずに')
      advice.midTerm.push('専門性を磨く投資を惜しまないこと')
      advice.longTerm.push('40代以降の大成功に向けて、今から種を蒔きましょう')
      break
    case 'turning_point':
      advice.shortTerm.push('変化のサインを見逃さないよう、アンテナを張りましょう')
      advice.warnings.push('現状維持に固執しすぎないこと')
      break
    case 'steady_progress':
      advice.shortTerm.push('毎日の小さな積み重ねを大切に')
      advice.midTerm.push('習慣化できる貯蓄・投資の仕組みを作りましょう')
      break
    case 'big_break':
      advice.shortTerm.push('チャンスが来たら迷わず掴む準備をしておきましょう')
      advice.warnings.push('ギャンブル的な賭けは避け、計算されたリスクを取ること')
      break
    case 'networking':
      advice.shortTerm.push('人との出会いを大切にしましょう')
      advice.midTerm.push('信頼関係を築ける仲間を増やしていきましょう')
      break
    case 'specialist':
      advice.shortTerm.push('一つの分野を深掘りする時間を確保しましょう')
      advice.longTerm.push('その道の第一人者を目指して研鑽を積みましょう')
      break
    case 'challenger':
      advice.shortTerm.push('新しいことに挑戦する機会を作りましょう')
      advice.warnings.push('失敗を恐れすぎないこと。失敗から学ぶ姿勢が大切です')
      break
  }

  // 金運タイプ別ラッキーアクション
  switch (moneyType) {
    case 'steady':
      advice.luckyActions.push('自動積立貯金を設定する')
      advice.luckyActions.push('長期投資を始める')
      break
    case 'intuitive':
      advice.luckyActions.push('直感で「良い」と感じたものに少額投資')
      advice.luckyActions.push('瞑想やリラックスで直感力を磨く')
      break
    case 'network':
      advice.luckyActions.push('異業種交流会に参加する')
      advice.luckyActions.push('お世話になった人に感謝を伝える')
      break
    case 'creative':
      advice.luckyActions.push('創作活動の時間を確保する')
      advice.luckyActions.push('作品を発表・販売する場を探す')
      break
    case 'intellectual':
      advice.luckyActions.push('専門書やオンライン講座で学ぶ')
      advice.luckyActions.push('知識をブログやSNSで発信する')
      break
    case 'entrepreneur':
      advice.luckyActions.push('スモールビジネスのアイデアを考える')
      advice.luckyActions.push('起業家の体験談を学ぶ')
      break
    case 'inheritance':
      advice.luckyActions.push('家族との関係を大切にする')
      advice.luckyActions.push('先人の知恵を学ぶ')
      break
    case 'stable':
      advice.luckyActions.push('本業でのスキルアップに励む')
      advice.luckyActions.push('社内での評価を上げる行動を取る')
      break
    case 'expansion':
      advice.luckyActions.push('海外に関連した投資や活動を検討')
      advice.luckyActions.push('スケールの大きなプロジェクトに参加する')
      break
    case 'transform':
      advice.luckyActions.push('不要なものを手放す断捨離を行う')
      advice.luckyActions.push('新しい分野にチャレンジする')
      break
    case 'spiritual':
      advice.luckyActions.push('内面を磨く活動（瞑想・ヨガなど）を行う')
      advice.luckyActions.push('感謝の気持ちを日記に書く')
      break
    case 'balanced':
      advice.luckyActions.push('複数の収入源を検討する')
      advice.luckyActions.push('バランスの取れた資産配分を心がける')
      break
  }

  // 惑星アスペクトからの追加アドバイス
  const jupiterSaturnAspect = chart.aspects.find(
    a => (a.planet1 === 'jupiter' && a.planet2 === 'saturn') ||
      (a.planet1 === 'saturn' && a.planet2 === 'jupiter')
  )
  if (jupiterSaturnAspect?.type === 'trine') {
    advice.luckyActions.push('計画的な投資が特に吉')
  }

  return advice
}

// メインの金運診断関数
export function analyzeFortune(chart: HoroscopeChart): FortuneResult {
  const { type: moneyType, score: moneyTypeScore } = determineMoneyType(chart)
  const successType = determineSuccessType(chart)
  const strengths = analyzeStrengths(chart)
  const weaknesses = analyzeWeaknesses(chart)
  const careers = analyzeCaree(chart)
  const monthlyFortune = calculateMonthlyFortune(chart)
  const radarScores = calculateRadarScores(chart)
  const luckyItems = calculateLuckyItems(chart)
  const advice = generateAdvice(chart, moneyType, successType)

  return {
    moneyType,
    moneyTypeScore,
    successType,
    strengths,
    weaknesses,
    careers,
    monthlyFortune,
    radarScores,
    luckyItems,
    advice,
  }
}
