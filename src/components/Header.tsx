import Navbar from "./Navbar"

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
      <Navbar />
    </header>
  )
}

export default Header
