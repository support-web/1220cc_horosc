import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { BirthData, HoroscopeChart, FortuneResult } from '@/types/horoscope'

interface HoroscopeStore {
  birthData: BirthData | null
  chart: HoroscopeChart | null
  result: FortuneResult | null
  isLoading: boolean
  setBirthData: (data: BirthData) => void
  setChart: (chart: HoroscopeChart) => void
  setResult: (result: FortuneResult) => void
  setLoading: (loading: boolean) => void
  reset: () => void
}

export const useHoroscopeStore = create<HoroscopeStore>()(
  persist(
    (set) => ({
      birthData: null,
      chart: null,
      result: null,
      isLoading: false,
      setBirthData: (data) => set({ birthData: data }),
      setChart: (chart) => set({ chart }),
      setResult: (result) => set({ result }),
      setLoading: (loading) => set({ isLoading: loading }),
      reset: () => set({ birthData: null, chart: null, result: null, isLoading: false }),
    }),
    {
      name: 'horoscope-storage',
    }
  )
)
