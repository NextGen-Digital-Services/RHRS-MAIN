import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Helpline from './components/Helpline'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import IdCard from './components/IdCard'
import Donate from './components/Donate'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    ScrollTrigger.refresh()
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Helpline />
        <About />
        <Services />
        <Gallery />
        <IdCard />
        <Donate />
      </main>
      <Footer />
    </>
  )
}
