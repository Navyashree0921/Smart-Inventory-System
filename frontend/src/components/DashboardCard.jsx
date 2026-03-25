export default function DashboardCard({
  title,
  value,
  subtitle,
  tone = "neutral",
  footer,
}) {
  const tones = {
    neutral: {
      border: "border-gray-200",
      bg: "bg-white",
      value: "text-gray-900",
    },
    success: {
      border: "border-emerald-300",
      bg: "bg-emerald-50/40",
      value: "text-emerald-700",
    },
    warning: {
      border: "border-amber-300",
      bg: "bg-amber-50/40",
      value: "text-amber-700",
    },
    danger: {
      border: "border-red-300",
      bg: "bg-red-50/40",
      value: "text-red-700",
    },
  };

  const t = tones[tone];

  return (
    <div
      className={`
        ${t.bg}
        ${t.border}
        border rounded-2xl p-6 shadow-sm
        hover:shadow-md transition
      `}
    >
      <p className="text-sm text-gray-500">{title}</p>

      <p className={`mt-3 text-3xl font-semibold ${t.value}`}>{value}</p>

      {subtitle && (
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">{subtitle}</p>
      )}

      {footer && (
        <div className="mt-4 pt-3 border-t border-gray-200 text-sm text-gray-500">
          {footer}
        </div>
      )}
    </div>
  );
}
