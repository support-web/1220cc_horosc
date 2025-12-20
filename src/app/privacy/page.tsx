export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="section-title mb-8">プライバシーポリシー</h1>

        <div className="card space-y-6 text-text-dark">
          <section>
            <h2 className="text-xl font-bold mb-3 text-primary-gold">1. 個人情報の取り扱いについて</h2>
            <p className="text-text-muted leading-relaxed">
              当サイト「金運ホロスコープ」（以下、「当サイト」）は、ユーザーの個人情報の保護を重要視し、
              適切に管理・保護することをお約束します。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-primary-gold">2. 収集する情報</h2>
            <p className="text-text-muted leading-relaxed">
              当サイトでは、鑑定サービスを提供するために以下の情報を入力いただく場合があります：
            </p>
            <ul className="list-disc list-inside mt-2 text-text-muted space-y-1">
              <li>生年月日</li>
              <li>出生時刻</li>
              <li>出生地</li>
            </ul>
            <p className="text-text-muted leading-relaxed mt-2">
              これらの情報は、鑑定の計算にのみ使用され、サーバーに保存されることはありません。
              すべての計算はお客様のブラウザ上で行われます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-primary-gold">3. Cookieの使用について</h2>
            <p className="text-text-muted leading-relaxed">
              当サイトでは、ユーザー体験の向上のためにCookieおよびローカルストレージを使用する場合があります。
              これらは鑑定履歴の保存などに使用されます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-primary-gold">4. アクセス解析について</h2>
            <p className="text-text-muted leading-relaxed">
              当サイトでは、サービス向上のためにアクセス解析ツールを使用する場合があります。
              これらのツールは、匿名化されたデータを収集し、個人を特定することはありません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-primary-gold">5. 第三者への提供</h2>
            <p className="text-text-muted leading-relaxed">
              当サイトは、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-primary-gold">6. お問い合わせ</h2>
            <p className="text-text-muted leading-relaxed">
              プライバシーポリシーに関するお問い合わせは、サイト内のお問い合わせフォームよりご連絡ください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-primary-gold">7. ポリシーの変更</h2>
            <p className="text-text-muted leading-relaxed">
              当サイトは、必要に応じてプライバシーポリシーを変更することがあります。
              変更があった場合は、当ページにて公開いたします。
            </p>
          </section>

          <div className="pt-6 border-t border-primary-gold/20 text-sm text-text-muted">
            <p>制定日：2024年1月1日</p>
            <p>最終更新日：2024年1月1日</p>
          </div>
        </div>
      </div>
    </div>
  )
}
