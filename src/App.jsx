import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Team from './components/Team'
import Clients from './components/Clients'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './index.css'

// Code-split: keeps the phone-validation library out of the initial bundle.
const ServiceRequest = lazy(() => import('./components/ServiceRequest'))

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
        <Suspense fallback={<div className="min-h-[400px]" />}>
          <ServiceRequest />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
