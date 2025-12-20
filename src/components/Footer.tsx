import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-accent-cream border-t border-primary-gold/20 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl text-primary-gold">&#9733;</span>
              <span className="font-serif font-bold text-lg bg-gradient-to-r from-primary-gold-dark via-primary-gold to-primary-gold-light bg-clip-text text-transparent">
                金運ホロスコープ
              </span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              西洋占星術に基づき、あなたの金運・財運を詳しく鑑定する無料サービスです。
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-text-dark mb-4">サービス</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-text-muted hover:text-primary-gold transition-colors">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/reading" className="text-text-muted hover:text-primary-gold transition-colors">
                  無料鑑定
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-text-dark mb-4">インフォメーション</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-text-muted hover:text-primary-gold transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-muted hover:text-primary-gold transition-colors">
                  利用規約
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-accent-cream/50 rounded-xl p-4 mb-8 border border-primary-gold/10">
          <p className="text-xs text-text-muted leading-relaxed">
            ※本サービスは西洋占星術に基づくエンターテインメントです。
            鑑定結果は参考情報であり、金融・投資判断を保証するものではありません。
            投資や重要な金銭的決定は、専門家にご相談ください。
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-text-muted border-t border-primary-gold/10 pt-8">
          <p>&copy; {new Date().getFullYear()} 金運ホロスコープ All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
