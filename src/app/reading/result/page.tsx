'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useHoroscopeStore } from '@/lib/store'
import { moneyTypeInfo, successTypeInfo } from '@/lib/fortune'
import { getZodiacName, getZodiacSymbol, getPlanetName, getPlanetSymbol } from '@/lib/horoscope'
import RadarChart from '@/components/RadarChart'
import MonthlyChart from '@/components/MonthlyChart'
import PdfDownloadButton from '@/components/PdfDownloadButton'

export default function ResultPage() {
  const router = useRouter()
  const { birthData, chart, result, isLoading } = useHoroscopeStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoading && !result) {
      router.push('/reading')
    }
  }, [mounted, isLoading, result, router])

  if (!mounted || isLoading || !result || !chart || !birthData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-text-muted">鑑定結果を読み込み中...</p>
        </div>
      </div>
    )
  }

  const moneyTypeData = moneyTypeInfo[result.moneyType]
  const successTypeData = successTypeInfo[result.successType]
  const sunSign = chart.planets.find(p => p.planet === 'sun')

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-primary-gold mb-2">&#9733; 鑑定完了 &#9733;</p>
          <h1 className="section-title mb-4">あなたの金運鑑定結果</h1>
          <p className="text-text-muted">
            {birthData.year}年{birthData.month}月{birthData.day}日生まれ
            {sunSign && ` ・ ${getZodiacName(sunSign.sign)}${getZodiacSymbol(sunSign.sign)}`}
          </p>
        </motion.div>

        {/* 金運タイプ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-gold mb-8"
        >
          <h2 className="text-xl font-bold text-center text-text-dark mb-4">
            あなたの金運タイプ
          </h2>
          <div className="text-center py-6 px-4 bg-gradient-to-r from-primary-gold/10 via-primary-gold/20 to-primary-gold/10 rounded-xl mb-6">
            <p className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary-gold-dark via-primary-gold to-primary-gold-light bg-clip-text text-transparent">
              {moneyTypeData.name}
            </p>
            <div className="flex items-center justify-center mt-4 gap-2">
              <span className="text-text-muted">適合度</span>
              <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-gold to-primary-gold-light"
                  style={{ width: `${result.moneyTypeScore}%` }}
                ></div>
              </div>
              <span className="font-bold text-primary-gold">{result.moneyTypeScore}%</span>
            </div>
          </div>
          <p className="text-text-dark leading-relaxed">
            {moneyTypeData.description}
          </p>
        </motion.section>

        {/* 金運レーダーチャート */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-gold mb-8"
        >
          <h2 className="text-xl font-bold text-center text-text-dark mb-6">
            金運レーダーチャート
          </h2>
          <div className="flex justify-center">
            <RadarChart scores={result.radarScores} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {Object.entries(result.radarScores).map(([key, value]) => {
              const labels: Record<string, string> = {
                income: '収入力',
                savings: '貯蓄力',
                investment: '投資運',
                windfall: '臨時収入運',
                network: '人脈財運',
                inheritance: '継承運',
              }
              return (
                <div key={key} className="text-center p-3 bg-accent-cream/50 rounded-lg">
                  <p className="text-sm text-text-muted">{labels[key]}</p>
                  <p className="text-2xl font-bold text-primary-gold">{value}</p>
                </div>
              )
            })}
          </div>
        </motion.section>

        {/* 強み */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-gold mb-8"
        >
          <h2 className="text-xl font-bold text-text-dark mb-6">
            <span className="text-primary-gold mr-2">&#9733;</span>
            あなたの金運の強み
          </h2>
          <div className="space-y-4">
            {result.strengths.map((strength, index) => (
              <div
                key={index}
                className="result-highlight p-4 rounded-r-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-text-dark">{strength.title}</h3>
                  <span className="text-sm text-primary-gold font-bold">
                    {strength.score}点
                  </span>
                </div>
                <p className="text-text-muted text-sm">{strength.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 注意点 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-gold mb-8"
        >
          <h2 className="text-xl font-bold text-text-dark mb-6">
            <span className="text-primary-gold mr-2">&#9888;</span>
            注意点と改善策
          </h2>
          <div className="space-y-4">
            {result.weaknesses.map((weakness, index) => (
              <div
                key={index}
                className="p-4 bg-accent-cream/50 rounded-lg border-l-4 border-yellow-500"
              >
                <h3 className="font-bold text-text-dark mb-2">{weakness.title}</h3>
                <p className="text-text-muted text-sm mb-2">{weakness.description}</p>
                <p className="text-sm text-primary-gold-dark">
                  <span className="font-bold">改善策：</span>{weakness.advice}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 適職ランキング */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-gold mb-8"
        >
          <h2 className="text-xl font-bold text-text-dark mb-6">
            <span className="text-primary-gold mr-2">&#128188;</span>
            適職ランキング TOP5
          </h2>
          <div className="space-y-3">
            {result.careers.map((career, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-white rounded-lg border border-primary-gold/20"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                      index === 2 ? 'bg-gradient-to-br from-orange-300 to-orange-500' :
                        'bg-gray-400'
                  }`}>
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-text-dark">{career.name}</h3>
                  <p className="text-sm text-text-muted">{career.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary-gold">{career.compatibility}%</p>
                  <p className="text-xs text-text-muted">相性</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 成功パターン */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-gold mb-8"
        >
          <h2 className="text-xl font-bold text-text-dark mb-6">
            <span className="text-primary-gold mr-2">&#128200;</span>
            成功パターン
          </h2>
          <div className="text-center py-4 px-4 bg-gradient-to-r from-primary-gold/10 via-primary-gold/20 to-primary-gold/10 rounded-xl mb-6">
            <p className="text-2xl font-serif font-bold text-primary-gold">
              {successTypeData.name}
            </p>
          </div>
          <p className="text-text-dark leading-relaxed mb-6">
            {successTypeData.description}
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-700 mb-2">短期（今すぐ）</h3>
              <ul className="text-sm text-green-800 space-y-1">
                {result.advice.shortTerm.map((advice, i) => (
                  <li key={i}>・{advice}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-700 mb-2">中期（1〜3年）</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                {result.advice.midTerm.length > 0 ? (
                  result.advice.midTerm.map((advice, i) => (
                    <li key={i}>・{advice}</li>
                  ))
                ) : (
                  <li>・計画的に進めましょう</li>
                )}
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-bold text-purple-700 mb-2">長期（5年以上）</h3>
              <ul className="text-sm text-purple-800 space-y-1">
                {result.advice.longTerm.length > 0 ? (
                  result.advice.longTerm.map((advice, i) => (
                    <li key={i}>・{advice}</li>
                  ))
                ) : (
                  <li>・大きな目標を持ちましょう</li>
                )}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* 12ヶ月の金運グラフ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card-gold mb-8"
        >
          <h2 className="text-xl font-bold text-text-dark mb-6">
            <span className="text-primary-gold mr-2">&#128197;</span>
            12ヶ月の金運推移
          </h2>
          <MonthlyChart monthlyFortune={result.monthlyFortune} />
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {result.monthlyFortune.slice(0, 4).map((fortune, index) => (
              <div key={index} className="p-3 bg-accent-cream/30 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-text-dark">{fortune.month}月</span>
                  <span className={`text-sm font-bold ${fortune.overall >= 70 ? 'text-green-600' :
                      fortune.overall >= 50 ? 'text-blue-600' : 'text-orange-600'
                    }`}>
                    {fortune.overall >= 70 ? '好調' : fortune.overall >= 50 ? '普通' : '注意'}
                  </span>
                </div>
                <p className="text-sm text-text-muted">{fortune.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ラッキーアイテム */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card-gold mb-8"
        >
          <h2 className="text-xl font-bold text-text-dark mb-6">
            <span className="text-primary-gold mr-2">&#128142;</span>
            ラッキーアイテム
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-accent-cream/50 rounded-lg">
              <p className="text-sm text-text-muted mb-1">ラッキーカラー</p>
              <p className="font-bold text-text-dark">{result.luckyItems.colors.join('・')}</p>
            </div>
            <div className="text-center p-4 bg-accent-cream/50 rounded-lg">
              <p className="text-sm text-text-muted mb-1">ラッキーナンバー</p>
              <p className="font-bold text-text-dark">{result.luckyItems.numbers.join('・')}</p>
            </div>
            <div className="text-center p-4 bg-accent-cream/50 rounded-lg">
              <p className="text-sm text-text-muted mb-1">ラッキーデー</p>
              <p className="font-bold text-text-dark">{result.luckyItems.day}</p>
            </div>
            <div className="text-center p-4 bg-accent-cream/50 rounded-lg">
              <p className="text-sm text-text-muted mb-1">パワーストーン</p>
              <p className="font-bold text-text-dark">{result.luckyItems.gemstone}</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white rounded-lg border border-primary-gold/20">
            <p className="text-sm text-text-muted mb-2">開運アイテム</p>
            <p className="text-text-dark">{result.luckyItems.items.join('、')}</p>
          </div>
        </motion.section>

        {/* 開運アクション */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="card-gold mb-8"
        >
          <h2 className="text-xl font-bold text-text-dark mb-6">
            <span className="text-primary-gold mr-2">&#9889;</span>
            開運アクション
          </h2>
          <div className="space-y-3">
            {result.advice.luckyActions.map((action, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary-gold/10 to-transparent rounded-lg"
              >
                <span className="w-8 h-8 rounded-full bg-primary-gold text-white flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <p className="text-text-dark">{action}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* PDF & シェア */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="card-gold text-center"
        >
          <h2 className="text-xl font-bold text-text-dark mb-6">
            鑑定結果を保存・シェア
          </h2>
          <div className="space-y-4">
            <PdfDownloadButton />
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  const text = `金運ホロスコープ占いで鑑定してもらいました！\n私の金運タイプは「${moneyTypeData.name}」でした✨`
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin)}`, '_blank')
                }}
                className="btn-secondary py-3 px-6"
              >
                Xでシェア
              </button>
            </div>
          </div>
        </motion.section>

        {/* 再鑑定ボタン */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center mt-8"
        >
          <button
            onClick={() => router.push('/reading')}
            className="text-primary-gold hover:text-primary-gold-dark underline"
          >
            別の日付で鑑定する
          </button>
        </motion.div>
      </div>
    </div>
  )
}
