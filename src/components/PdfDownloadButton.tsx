'use client'

import { useState } from 'react'
import { useHoroscopeStore } from '@/lib/store'
import { moneyTypeInfo, successTypeInfo } from '@/lib/fortune'
import { getZodiacName } from '@/lib/horoscope'

export default function PdfDownloadButton() {
  const [isGenerating, setIsGenerating] = useState(false)
  const { birthData, chart, result } = useHoroscopeStore()

  const generatePDF = async () => {
    if (!birthData || !chart || !result) return

    setIsGenerating(true)

    try {
      // 動的インポート
      const { jsPDF } = await import('jspdf')

      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 20
      const contentWidth = pageWidth - margin * 2

      // 日本語フォント対応（シンプルなASCIIベースで）
      pdf.setFont('helvetica')

      // ===== 表紙 =====
      // 背景グラデーション風の装飾
      pdf.setFillColor(255, 248, 231)
      pdf.rect(0, 0, pageWidth, pageHeight, 'F')

      // 上部装飾線
      pdf.setDrawColor(212, 175, 55)
      pdf.setLineWidth(2)
      pdf.line(margin, 30, pageWidth - margin, 30)

      // タイトル
      pdf.setFontSize(28)
      pdf.setTextColor(212, 175, 55)
      pdf.text('HOROSCOPE', pageWidth / 2, 50, { align: 'center' })

      pdf.setFontSize(18)
      pdf.text('Fortune Reading', pageWidth / 2, 62, { align: 'center' })

      // 星マーク
      pdf.setFontSize(40)
      pdf.text('*', pageWidth / 2, 90, { align: 'center' })

      // 生年月日情報
      pdf.setFontSize(14)
      pdf.setTextColor(45, 45, 45)
      pdf.text(`Birth Date: ${birthData.year}/${birthData.month}/${birthData.day}`, pageWidth / 2, 120, { align: 'center' })
      pdf.text(`Birth Place: ${birthData.birthPlace}`, pageWidth / 2, 132, { align: 'center' })

      const sunSign = chart.planets.find(p => p.planet === 'sun')
      if (sunSign) {
        pdf.text(`Sun Sign: ${getZodiacName(sunSign.sign)}`, pageWidth / 2, 144, { align: 'center' })
      }

      // 金運タイプ
      const moneyTypeData = moneyTypeInfo[result.moneyType]
      pdf.setFontSize(16)
      pdf.setTextColor(212, 175, 55)
      pdf.text('Your Money Type:', pageWidth / 2, 170, { align: 'center' })

      pdf.setFontSize(24)
      pdf.text(moneyTypeData.name, pageWidth / 2, 185, { align: 'center' })

      // 下部装飾
      pdf.setDrawColor(212, 175, 55)
      pdf.line(margin, pageHeight - 40, pageWidth - margin, pageHeight - 40)

      pdf.setFontSize(10)
      pdf.setTextColor(107, 107, 107)
      const today = new Date()
      pdf.text(`Generated: ${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`, pageWidth / 2, pageHeight - 30, { align: 'center' })

      // ===== 2ページ目: 金運スコア =====
      pdf.addPage()
      pdf.setFillColor(255, 248, 231)
      pdf.rect(0, 0, pageWidth, pageHeight, 'F')

      pdf.setFontSize(18)
      pdf.setTextColor(212, 175, 55)
      pdf.text('Money Fortune Scores', pageWidth / 2, 30, { align: 'center' })

      // スコア表示
      const scores = [
        { label: 'Income Power', value: result.radarScores.income },
        { label: 'Savings Power', value: result.radarScores.savings },
        { label: 'Investment Luck', value: result.radarScores.investment },
        { label: 'Windfall Luck', value: result.radarScores.windfall },
        { label: 'Network Fortune', value: result.radarScores.network },
        { label: 'Inheritance Luck', value: result.radarScores.inheritance },
      ]

      let yPos = 55
      scores.forEach((score, index) => {
        pdf.setFontSize(12)
        pdf.setTextColor(45, 45, 45)
        pdf.text(score.label, margin, yPos)

        // プログレスバー
        pdf.setFillColor(230, 230, 230)
        pdf.rect(margin + 50, yPos - 5, 80, 8, 'F')

        pdf.setFillColor(212, 175, 55)
        pdf.rect(margin + 50, yPos - 5, 80 * (score.value / 100), 8, 'F')

        pdf.setTextColor(212, 175, 55)
        pdf.text(`${score.value}`, margin + 135, yPos)

        yPos += 20
      })

      // 強み
      yPos += 10
      pdf.setFontSize(16)
      pdf.setTextColor(212, 175, 55)
      pdf.text('Your Strengths', margin, yPos)

      yPos += 15
      result.strengths.forEach((strength, index) => {
        pdf.setFontSize(11)
        pdf.setTextColor(45, 45, 45)
        pdf.text(`${index + 1}. ${strength.title}`, margin, yPos)
        yPos += 8
        pdf.setFontSize(9)
        pdf.setTextColor(107, 107, 107)
        const lines = pdf.splitTextToSize(strength.description, contentWidth - 10)
        pdf.text(lines, margin + 5, yPos)
        yPos += lines.length * 5 + 10
      })

      // ===== 3ページ目: 適職 & アドバイス =====
      pdf.addPage()
      pdf.setFillColor(255, 248, 231)
      pdf.rect(0, 0, pageWidth, pageHeight, 'F')

      pdf.setFontSize(18)
      pdf.setTextColor(212, 175, 55)
      pdf.text('Career Recommendations', pageWidth / 2, 30, { align: 'center' })

      yPos = 50
      result.careers.slice(0, 5).forEach((career, index) => {
        pdf.setFontSize(12)
        pdf.setTextColor(45, 45, 45)
        pdf.text(`${index + 1}. ${career.name} - ${career.compatibility}%`, margin, yPos)
        yPos += 12
      })

      // ラッキーアイテム
      yPos += 15
      pdf.setFontSize(16)
      pdf.setTextColor(212, 175, 55)
      pdf.text('Lucky Items', margin, yPos)

      yPos += 12
      pdf.setFontSize(11)
      pdf.setTextColor(45, 45, 45)
      pdf.text(`Colors: ${result.luckyItems.colors.join(', ')}`, margin, yPos)
      yPos += 8
      pdf.text(`Numbers: ${result.luckyItems.numbers.join(', ')}`, margin, yPos)
      yPos += 8
      pdf.text(`Lucky Day: ${result.luckyItems.day}`, margin, yPos)
      yPos += 8
      pdf.text(`Gemstone: ${result.luckyItems.gemstone}`, margin, yPos)

      // 開運アクション
      yPos += 20
      pdf.setFontSize(16)
      pdf.setTextColor(212, 175, 55)
      pdf.text('Lucky Actions', margin, yPos)

      yPos += 12
      result.advice.luckyActions.forEach((action, index) => {
        pdf.setFontSize(10)
        pdf.setTextColor(45, 45, 45)
        const lines = pdf.splitTextToSize(`${index + 1}. ${action}`, contentWidth)
        pdf.text(lines, margin, yPos)
        yPos += lines.length * 5 + 5
      })

      // フッター
      pdf.setFontSize(8)
      pdf.setTextColor(107, 107, 107)
      pdf.text('This reading is for entertainment purposes only.', pageWidth / 2, pageHeight - 15, { align: 'center' })

      // ダウンロード
      pdf.save('horoscope-fortune-reading.pdf')

    } catch (error) {
      console.error('PDF generation error:', error)
      alert('PDFの生成に失敗しました。もう一度お試しください。')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className={`btn-primary w-full md:w-auto px-8 py-4 ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isGenerating ? (
        <span className="flex items-center justify-center">
          <span className="loading-spinner w-5 h-5 mr-2"></span>
          PDF作成中...
        </span>
      ) : (
        '&#128196; 鑑定書PDFをダウンロード'
      )}
    </button>
  )
}
