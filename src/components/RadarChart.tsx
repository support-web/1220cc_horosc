'use client'

import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { RadarScores } from '@/types/horoscope'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

interface RadarChartProps {
  scores: RadarScores
}

export default function RadarChart({ scores }: RadarChartProps) {
  const labels = ['収入力', '貯蓄力', '投資運', '臨時収入運', '人脈財運', '継承運']
  const dataValues = [
    scores.income,
    scores.savings,
    scores.investment,
    scores.windfall,
    scores.network,
    scores.inheritance,
  ]

  const data = {
    labels,
    datasets: [
      {
        label: '金運スコア',
        data: dataValues,
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        borderColor: 'rgba(212, 175, 55, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(212, 175, 55, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(212, 175, 55, 1)',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(212, 175, 55, 0.3)',
        },
        grid: {
          color: 'rgba(212, 175, 55, 0.2)',
        },
        pointLabels: {
          color: '#2D2D2D',
          font: {
            size: 12,
            family: 'Noto Sans JP',
          },
        },
        ticks: {
          display: false,
          stepSize: 20,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.raw}点`
          }
        }
      }
    },
  }

  return (
    <div className="w-full max-w-md">
      <Radar data={data} options={options} />
    </div>
  )
}
