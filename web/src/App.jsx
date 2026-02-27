import './App.css'
import { SignedIn, SignedOut, SignInButton, UserButton} from '@clerk/clerk-react'

function App() {

  return (
    <>
      <h1>Welcome to Pulse</h1>
      {/* token with the req */}
      <SignedOut>
        <SignInButton mode="modal"/>
      </SignedOut>
      {/* Show the user button when the user is signed in */}
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  )
}

export default App
