'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-primary-gold/20 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl">&#9733;</span>
            <span className="font-serif font-bold text-xl bg-gradient-to-r from-primary-gold-dark via-primary-gold to-primary-gold-light bg-clip-text text-transparent">
              金運ホロスコープ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-text-dark hover:text-primary-gold transition-colors font-medium"
            >
              ホーム
            </Link>
            <Link
              href="/reading"
              className="btn-primary text-sm py-2 px-6"
            >
              無料で鑑定する
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-primary-gold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニュー"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary-gold/20">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-text-dark hover:text-primary-gold transition-colors font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                ホーム
              </Link>
              <Link
                href="/reading"
                className="btn-primary text-center text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                無料で鑑定する
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
