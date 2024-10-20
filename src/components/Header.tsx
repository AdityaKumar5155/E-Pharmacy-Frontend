import Navbar from "./Navbar"
import { useAuth } from "../contexts/AuthContext"

const ProfileSection = () => {
  const {isAuthenticated, username} = useAuth();
  return (
    <>
      <div className="flex items-center space-x-2">
        <p className="font-medium text-cyan-400 cursor-pointer">{isAuthenticated?username:'Login'}</p>
        <img src="logo.svg" alt="" className="w-10 rounded-full border p-1" />
      </div>
    </>
  )
}

const LogoSection = () => {
  return (
    <>
      <div className="flex ">
        <img src="logo.svg" alt="Logo" className="w-8" />
        <div className="ml-3 text-xl font-bold"><span className="text-cyan-400">E-</span><span className="text-pink-400">Pharmacy</span></div>
      </div>
    </>
  )
}

const Header = () => {
  return (
    <header className="sticky top-0 right-0 left-0 h-16 bg-white flex items-center px-5 shadow-md justify-between">
      <LogoSection/>
      <section className="flex justify-between items-center space-x-10">
        <Navbar />
        <ProfileSection />
      </section>
    </header>
  )
}

export default Header
