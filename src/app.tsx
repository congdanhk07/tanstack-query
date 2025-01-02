import { useProfile } from './hooks/use-profile'

const App: React.FC = () => {
  const { data: userProfile, isLoading, isError, error } = useProfile()

  if (isLoading) return <div>Loading profile...</div>
  if (isError) return <div>Error: {error.message}</div>
  return (
    <div>
      <h1>User Profile</h1>
      {userProfile && (
        <div>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
          {/* Render other user profile data as needed */}
        </div>
      )}
    </div>
  )
}

export default App
