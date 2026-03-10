import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface UserTypeCardProps {
  type: { id: string; label: string; icon: LucideIcon; color: string; desc: string }
  index: number
  onSelect: (id: string) => void
}

export function UserTypeCard({ type, index, onSelect }: UserTypeCardProps) {
  const Icon = type.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className="p-8 cursor-pointer border-gray-200 bg-white/80 backdrop-blur-xl hover:border-[#3FB8FF]/40 transition-all relative overflow-hidden group h-full shadow-sm hover:shadow-xl"
        onClick={() => onSelect(type.id)}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        />

        <div
          className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${type.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500`}
        />

        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <div
            className={`p-5 rounded-2xl bg-gradient-to-br ${type.color} shadow-lg shadow-black/10 group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="h-10 w-10 text-white" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {type.label}
            </h3>

            <p className="text-sm text-gray-500">
              {type.desc}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}