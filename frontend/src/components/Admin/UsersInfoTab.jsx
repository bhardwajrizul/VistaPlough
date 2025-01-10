
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { UserDetailTab } from './UserDetailTab'

// Mock function to simulate backend request
const fetchUsers = async (email) => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const allUsers = [
    { id: 1, email: 'user1@example.com', cartTotal: 150.50, name: 'John Doe', address: '123 Main St', phone: '555-1234' },
    { id: 2, email: 'user2@example.com', cartTotal: 75.25, name: 'Jane Smith', address: '456 Elm St', phone: '555-5678' },
    { id: 3, email: 'user3@example.com', cartTotal: 200.00, name: 'Bob Johnson', address: '789 Oak St', phone: '555-9012' },
  ]
  
  return allUsers.filter(user => 
    user.email.toLowerCase().includes(email.toLowerCase())
  )
}

export const UsersInfoTab = () => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const fetchedUsers = await fetchUsers(search)
      setUsers(fetchedUsers)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (selectedUserId !== null) {
    const selectedUser = users.find(user => user.id === selectedUserId)
    return <UserDetailTab user={selectedUser} onBack={() => setSelectedUserId(null)} />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-[85%] mx-auto"
    >
      <h1 className="text-3xl text-center font-bold text-primary mt-8 mb-6">
        Users Info
      </h1>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />
        <button type="submit" disabled={isLoading}>
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </button>
      </form>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="space-y-4">
          {users.map(user => (
            <motion.div
              key={user.id}
              className="bg-card text-card-foreground p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedUserId(user.id)}
            >
              <p className="font-semibold">{user.email}</p>
              <p className="text-sm text-muted-foreground">Cart Total: ${user.cartTotal.toFixed(2)}</p>
            </motion.div>
          ))}
        </div>
      )}
      {!isLoading && users.length === 0 && (
        <p className="text-center text-muted-foreground">No users found. Try a different search.</p>
      )}
    </motion.div>
  )
}

export default UsersInfoTab

