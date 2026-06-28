import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Team from './components/Team'
import Clients from './components/Clients'
import ServiceRequest from './components/ServiceRequest'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './index.css'

export default function App() {
  return (
    <div className="font-arabic">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Team />
        <Clients />
        <ServiceRequest />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
