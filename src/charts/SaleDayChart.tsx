import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type SaleDayData = {
  dia: string;
  ventas: number;
  pedidos: number;
};

type Props = {
  data: SaleDayData[];
  title?: string;
  metric?: "ventas" | "pedidos";
};

export default function SaleDayChart({
  data,
  title = "Distribución de Ventas por Día",
  metric = "ventas",
}: Props) {
  
  const backgroundColors = [
    "#3b82f6", "#10b981", "#f59e0b", "#ef4444",
    "#8b5cf6", "#ec4899", "#eab308"
  ];

  const borderColors = [
    "#1e40af", "#166534", "#b45309", "#b91c1c",
    "#6b21a8", "#9f1239", "#a16207"
  ];

  const values = data.map((item) =>
    metric === "ventas" ? item.ventas : item.pedidos
  );

  const total = values.reduce((sum, value) => sum + value, 0);

  const chartData = {
    labels: data.map((item) => item.dia),
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 3,
        hoverOffset: 22,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 16,
          padding: 18,
          font: { 
            size: 13 
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.96)",
        padding: 14,
        titleFont: { 
          size: 14 
        },
        bodyFont: { 
          size: 16, 
          weight: "bold" as const   // ← Corregido
        },
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : "0";
            
            return metric === "ventas"
              ? ` $${value.toLocaleString()} (${percentage}%)`
              : ` ${value} pedidos (${percentage}%)`;
          },
        },
      },
      title: {
        display: true,
        text: title,
        font: { 
          size: 17, 
          weight: "bold" as const     // ← Esta era la causa del error
        },
        padding: { 
          bottom: 25 
        },
      },
    },
  };

  if (total === 0) {
    return <p className="text-center text-gray-500 py-10">No hay datos disponibles</p>;
  }

  return (
    <div className="w-full h-[460px] p-4">
      <Pie data={chartData} options={options} />
    </div>
  );
}