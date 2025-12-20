'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { prefectures, getCitiesByPrefecture, City } from '@/lib/cities'
import { useHoroscopeStore } from '@/lib/store'
import { calculateHoroscope } from '@/lib/horoscope'
import { analyzeFortune } from '@/lib/fortune'
import { BirthData } from '@/types/horoscope'

export default function ReadingPage() {
  const router = useRouter()
  const { setBirthData, setChart, setResult, setLoading } = useHoroscopeStore()

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)

  const [formData, setFormData] = useState({
    year: 1990,
    month: 1,
    day: 1,
    hour: 12,
    minute: 0,
    prefecture: '東京都',
    city: '東京23区',
    unknownTime: false,
  })

  const [days, setDays] = useState<number[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 月に応じて日数を更新
  useEffect(() => {
    const daysInMonth = new Date(formData.year, formData.month, 0).getDate()
    setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1))
    if (formData.day > daysInMonth) {
      setFormData(prev => ({ ...prev, day: daysInMonth }))
    }
  }, [formData.year, formData.month])

  // 都道府県に応じて市区町村を更新
  useEffect(() => {
    const citiesInPrefecture = getCitiesByPrefecture(formData.prefecture)
    setCities(citiesInPrefecture)
    if (citiesInPrefecture.length > 0) {
      setFormData(prev => ({ ...prev, city: citiesInPrefecture[0].name }))
    }
  }, [formData.prefecture])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setLoading(true)

    // 選択された都市の情報を取得
    const selectedCity = cities.find(c => c.name === formData.city)
    if (!selectedCity) {
      alert('都市を選択してください')
      setIsSubmitting(false)
      setLoading(false)
      return
    }

    const birthData: BirthData = {
      year: formData.year,
      month: formData.month,
      day: formData.day,
      hour: formData.hour,
      minute: formData.minute,
      birthPlace: `${formData.prefecture} ${formData.city}`,
      latitude: selectedCity.latitude,
      longitude: selectedCity.longitude,
      unknownTime: formData.unknownTime,
    }

    // ストアにデータを保存
    setBirthData(birthData)

    // 計算処理（少し遅延を入れてローディング演出）
    await new Promise(resolve => setTimeout(resolve, 1500))

    // ホロスコープ計算
    const chart = calculateHoroscope(birthData)
    setChart(chart)

    // 金運診断
    const result = analyzeFortune(chart)
    setResult(result)

    setLoading(false)

    // 結果ページへ遷移
    router.push('/reading/result')
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="section-title mb-4">金運鑑定</h1>
          <p className="text-text-muted">
            あなたの生年月日・出生時刻・出生地を入力してください
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-gold"
        >
          {/* 生年月日 */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-text-dark mb-4">
              <span className="text-primary-gold mr-2">&#9733;</span>
              生年月日
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-text-muted mb-1">年</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                  className="input-field"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}年</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-1">月</label>
                <select
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: Number(e.target.value) })}
                  className="input-field"
                >
                  {months.map(month => (
                    <option key={month} value={month}>{month}月</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-1">日</label>
                <select
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: Number(e.target.value) })}
                  className="input-field"
                >
                  {days.map(day => (
                    <option key={day} value={day}>{day}日</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 出生時刻 */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-text-dark mb-4">
              <span className="text-primary-gold mr-2">&#9733;</span>
              出生時刻
              <span className="text-sm font-normal text-text-muted ml-2">（わかる範囲で）</span>
            </label>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="unknownTime"
                checked={formData.unknownTime}
                onChange={(e) => setFormData({ ...formData, unknownTime: e.target.checked })}
                className="w-5 h-5 text-primary-gold border-primary-gold/30 rounded focus:ring-primary-gold"
              />
              <label htmlFor="unknownTime" className="ml-2 text-text-muted">
                出生時刻がわからない
              </label>
            </div>

            {!formData.unknownTime && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-muted mb-1">時</label>
                  <select
                    value={formData.hour}
                    onChange={(e) => setFormData({ ...formData, hour: Number(e.target.value) })}
                    className="input-field"
                  >
                    {hours.map(hour => (
                      <option key={hour} value={hour}>{hour}時</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-text-muted mb-1">分</label>
                  <select
                    value={formData.minute}
                    onChange={(e) => setFormData({ ...formData, minute: Number(e.target.value) })}
                    className="input-field"
                  >
                    {minutes.map(minute => (
                      <option key={minute} value={minute}>{String(minute).padStart(2, '0')}分</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {formData.unknownTime && (
              <p className="text-sm text-text-muted bg-accent-cream rounded-lg p-3">
                ※ 出生時刻不明の場合、正午（12:00）で計算します。
                ハウスの計算精度が下がりますが、基本的な金運傾向は診断できます。
              </p>
            )}
          </div>

          {/* 出生地 */}
          <div className="mb-10">
            <label className="block text-lg font-bold text-text-dark mb-4">
              <span className="text-primary-gold mr-2">&#9733;</span>
              出生地
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-muted mb-1">都道府県</label>
                <select
                  value={formData.prefecture}
                  onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
                  className="input-field"
                >
                  {prefectures.map(pref => (
                    <option key={pref} value={pref}>{pref}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-1">市区町村</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="input-field"
                >
                  {cities.map(city => (
                    <option key={city.name} value={city.name}>{city.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 送信ボタン */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full btn-primary text-lg py-5 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <span className="loading-spinner w-6 h-6 mr-3"></span>
                鑑定中...
              </span>
            ) : (
              '&#9733; 鑑定を開始する &#9733;'
            )}
          </button>

          <p className="text-center text-sm text-text-muted mt-4">
            入力いただいた情報は鑑定のみに使用され、保存されません。
          </p>
        </motion.form>

        {/* 注意事項 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-4 bg-accent-cream/50 rounded-xl text-sm text-text-muted"
        >
          <p className="font-bold mb-2">&#9998; より正確な鑑定のために</p>
          <ul className="list-disc list-inside space-y-1">
            <li>出生時刻がわかると、より詳細な鑑定が可能です</li>
            <li>母子手帳に記載されていることが多いです</li>
            <li>わからない場合でも、基本的な金運傾向は診断できます</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
