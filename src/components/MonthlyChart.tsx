'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { MonthlyFortune } from '@/types/horoscope'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface MonthlyChartProps {
  monthlyFortune: MonthlyFortune[]
}

export default function MonthlyChart({ monthlyFortune }: MonthlyChartProps) {
  const labels = monthlyFortune.map(f => `${f.month}月`)

  const data = {
    labels,
    datasets: [
      {
        label: '総合金運',
        data: monthlyFortune.map(f => f.overall),
        borderColor: 'rgba(212, 175, 55, 1)',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: 'rgba(212, 175, 55, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: '収入運',
        data: monthlyFortune.map(f => f.income),
        borderColor: 'rgba(76, 175, 80, 1)',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: 'rgba(76, 175, 80, 1)',
      },
      {
        label: '投資運',
        data: monthlyFortune.map(f => f.investment),
        borderColor: 'rgba(33, 150, 243, 1)',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: 'rgba(33, 150, 243, 1)',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: '#6B6B6B',
          font: {
            family: 'Noto Sans JP',
          },
        },
        grid: {
          color: 'rgba(212, 175, 55, 0.1)',
        },
      },
      x: {
        ticks: {
          color: '#6B6B6B',
          font: {
            family: 'Noto Sans JP',
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: '#2D2D2D',
          font: {
            family: 'Noto Sans JP',
            size: 12,
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#2D2D2D',
        bodyColor: '#2D2D2D',
        borderColor: 'rgba(212, 175, 55, 0.5)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw}点`
          }
        }
      },
    },
  }

  return (
    <div className="w-full">
      <Line data={data} options={options} />
    </div>
  )
}
