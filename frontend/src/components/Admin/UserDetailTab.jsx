
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'


export const UserDetailTab = ({ user, onBack }) => {
  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-[85%] mx-auto"
      >
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
        </button>
        <h1 className="text-3xl font-bold text-primary mb-6">User Details</h1>
        <p className="text-center text-muted-foreground">User not found.</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-[85%] mx-auto"
    >
      <button onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
      </button>
      <h1 className="text-3xl font-bold text-primary mb-6">User Details</h1>
      <div className="bg-card text-card-foreground p-6 rounded-lg shadow">
        <p className="text-xl font-semibold mb-2">{user.name}</p>
        <p className="mb-1"><span className="font-semibold">Email:</span> {user.email}</p>
        <p className="mb-1"><span className="font-semibold">Cart Total:</span> ${user.cartTotal.toFixed(2)}</p>
        <p className="mb-1"><span className="font-semibold">Address:</span> {user.address}</p>
        <p className="mb-1"><span className="font-semibold">Phone:</span> {user.phone}</p>
      </div>
    </motion.div>
  )
}

