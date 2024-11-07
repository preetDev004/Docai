"use client"
import { motion } from 'framer-motion'

const Badge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
        <p className="text-sm font-semibold text-gray-700">
          Docai <span className="text-green-600">V1</span> is
          <span className="text-green-600"> now</span> public!
        </p>
      </div>
    </motion.div>
  )
}

export default Badge