'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const features = [
  {
    icon: '&#128176;',
    title: '金運タイプ診断',
    description: '12種類の金運タイプから、あなたの財運傾向を詳しく分析',
  },
  {
    icon: '&#128188;',
    title: '適職診断',
    description: 'あなたに最適な職業と稼ぎ方のパターンを導き出します',
  },
  {
    icon: '&#128200;',
    title: '成功戦略',
    description: '短期・中期・長期の具体的な金運アップ戦略をご提案',
  },
  {
    icon: '&#128197;',
    title: '12ヶ月運勢',
    description: '今後1年間の金運の流れをグラフで可視化',
  },
  {
    icon: '&#128142;',
    title: 'ラッキーアイテム',
    description: 'あなたの金運を高める色・数字・アイテムをご紹介',
  },
  {
    icon: '&#128196;',
    title: 'PDF鑑定書',
    description: '詳細な鑑定結果をPDFでダウンロード可能',
  },
]

const testimonials = [
  {
    text: '適職診断が的中！転職して年収が1.5倍になりました',
    author: '30代男性・IT企業',
  },
  {
    text: '投資のタイミングがわかって、資産運用がうまくいくように',
    author: '40代女性・会社員',
  },
  {
    text: '自分の金運タイプを知ってから、お金の使い方が変わりました',
    author: '20代女性・フリーランス',
  },
]

const zodiacSigns = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Zodiac decoration */}
          <div className="flex justify-center gap-2 mb-6 text-primary-gold/40 text-2xl">
            {zodiacSigns.map((sign, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {sign}
              </motion.span>
            ))}
          </div>

          <motion.h1
            className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-primary-gold-dark via-primary-gold to-primary-gold-light bg-clip-text text-transparent">
              あなたの金運の星を
            </span>
            <br />
            <span className="text-text-dark">読み解く</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            西洋占星術に基づく本格的なホロスコープ鑑定で、
            <br className="hidden md:block" />
            あなたの財運・適職・成功パターンを詳しく分析します
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Link
              href="/reading"
              className="inline-block btn-primary text-lg px-12 py-5 animate-pulse-gold"
            >
              &#9733; 今すぐ無料で鑑定する &#9733;
            </Link>
            <p className="mt-4 text-sm text-text-muted">
              ※ 約3分で完了・登録不要
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-6xl text-primary-gold/10 animate-float">
          &#9733;
        </div>
        <div className="absolute bottom-10 right-10 text-8xl text-primary-gold/10 animate-float" style={{ animationDelay: '1s' }}>
          &#9790;
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-accent-cream/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">この鑑定でわかること</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card-gold hover:shadow-gold-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4" dangerouslySetInnerHTML={{ __html: feature.icon }} />
                <h3 className="text-xl font-bold text-text-dark mb-2">{feature.title}</h3>
                <p className="text-text-muted">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">鑑定の流れ</h2>

          <div className="space-y-8">
            {[
              { step: 1, title: '生年月日を入力', desc: '出生時刻と出生地もわかればより精密な鑑定が可能です' },
              { step: 2, title: 'ホロスコープを計算', desc: '西洋占星術の理論に基づき、あなたの星の配置を計算します' },
              { step: 3, title: '鑑定結果を表示', desc: '金運タイプ・適職・12ヶ月の運勢などを詳しく表示します' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary-gold to-primary-gold-light flex items-center justify-center text-white text-2xl font-bold shadow-gold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-dark mb-2">{item.title}</h3>
                  <p className="text-text-muted">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-b from-accent-cream/30 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">ユーザーの声</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="card relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute -top-3 -left-3 text-4xl text-primary-gold/30">&#x275D;</div>
                <p className="text-text-dark mb-4 pt-4">{testimonial.text}</p>
                <p className="text-sm text-text-muted">— {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-gold/10 to-primary-gold-light/20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark mb-6">
              あなたの金運を
              <br />
              <span className="bg-gradient-to-r from-primary-gold-dark via-primary-gold to-primary-gold-light bg-clip-text text-transparent">
                今すぐ無料で鑑定
              </span>
            </h2>
            <p className="text-text-muted mb-8">
              生年月日を入力するだけで、詳細な金運診断が受けられます
            </p>
            <Link
              href="/reading"
              className="inline-block btn-primary text-lg px-12 py-5"
            >
              &#9733; 無料鑑定をはじめる &#9733;
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
