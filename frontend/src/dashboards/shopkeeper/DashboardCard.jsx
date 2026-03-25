import { motion } from "framer-motion";

export default function DashboardCard({
  title,
  value,
  subtitle,
  color = "emerald",
  onClick,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className={`cursor-pointer bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition`}
    >
      <h3 className="text-sm text-gray-500">{title}</h3>
      <div className={`mt-2 text-3xl font-semibold text-${color}-600`}>
        {value}
      </div>
      {subtitle && (
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      )}
    </motion.div>
  );
}
