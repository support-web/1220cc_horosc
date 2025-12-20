import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '【無料】金運ホロスコープ占い | あなたの財運の星を読み解く',
  description: '生年月日から金運タイプ・適職・成功パターンを無料診断。12ヶ月の金運グラフ付きPDF鑑定書をプレゼント。西洋占星術に基づく本格的な金運占いで、あなたの財運を詳しく鑑定します。',
  keywords: '金運,占い,ホロスコープ,無料,財運,適職診断,西洋占星術',
  openGraph: {
    title: 'あなたの金運タイプを無料診断 | 金運ホロスコープ占い',
    description: 'ホロスコープで読み解く、あなただけの金運鑑定。適職・成功パターンもわかる！',
    type: 'website',
    locale: 'ja_JP',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow relative z-10">
          {children}
        </main>
        <Footer />
        <div className="stars" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </body>
    </html>
  )
}
