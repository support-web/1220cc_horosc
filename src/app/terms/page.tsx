export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="section-title mb-8">利用規約</h1>

        <div className="card space-y-6 text-text-dark">
          <section>
            <h2 className="text-xl font-bold mb-3 text-primary-gold">第1条（適用）</h2>
            <p className="text-text-muted leading-relaxed">
              本規約は、当サイト「金運ホロスコープ」（以下、「当サイト」）が提供するすべてのサービス
              （以下、「本サービス」）の利用条件を定めるものです。ユーザーの皆様には、
              本規約に同意いただいた上で、本サービスをご利用いただきます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-primary-gold">第2条（サービスの性質）</h2>
            <p className="text-text-muted leading-relaxed">
              本サービスは、西洋占星術に基づくエンターテインメントサービスです。
              鑑定結果は参考情報として提供されるものであり、以下の点にご留意ください：
            </p>
            <ul className="list-disc list-inside mt-2 text-text-muted space-y-1">
              <li>金融・投資に関する判断を保証するものではありません</li>
              <li>医療・法律などの専門的アドバイスの代替となるものではありません</li>
              <li>鑑定結果に基づく行動はすべて自己責任となります</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-primary-gold">第3条（免責事項）</h2>
            <p className="text-text-muted leading-relaxed">
              当サイトは、本サービスの利用により生じたいかなる損害についても、
              一切の責任を負わないものとします。これには以下が含まれますが、これらに限定されません：
            </p>
            <ul className="list-disc list-inside mt-2 text-text-muted space-y-1">
              <li>鑑定結果に基づく投資・金融判断による損失</li>
              <li>サービスの中断・停止による損害</li>
              <li>データの消失・破損による損害</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-primary-gold">第4条（禁止事項）</h2>
            <p className="text-text-muted leading-relaxed">
              ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません：
            </p>
            <ul className="list-disc list-inside mt-2 text-text-muted space-y-1">
              <li>法令または公序良俗に違反する行為</li>
              <li>当サイトまたは第三者の知的財産権を侵害する行為</li>
              <li>サービスの運営を妨害する行為</li>
              <li>不正アクセスまたはこれを試みる行為</li>
              <li>他のユーザーに成りすます行為</li>
              <li>当サイトのコンテンツを無断で転載・複製する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-primary-gold">第5条（知的財産権）</h2>
            <p className="text-text-muted leading-relaxed">
              本サービスに関連するすべてのコンテンツ（テキスト、画像、デザイン、プログラム等）の
              知的財産権は、当サイトまたは正当な権利者に帰属します。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-primary-gold">第6条（サービスの変更・終了）</h2>
            <p className="text-text-muted leading-relaxed">
              当サイトは、事前の通知なく、本サービスの内容を変更または終了することができるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-primary-gold">第7条（規約の変更）</h2>
            <p className="text-text-muted leading-relaxed">
              当サイトは、必要と判断した場合には、ユーザーへの事前通知なく本規約を変更できるものとします。
              変更後の規約は、当ページに掲載した時点から効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-primary-gold">第8条（準拠法・管轄裁判所）</h2>
            <p className="text-text-muted leading-relaxed">
              本規約の解釈にあたっては、日本法を準拠法とします。
              本サービスに関して紛争が生じた場合には、東京地方裁判所を専属的合意管轄とします。
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
