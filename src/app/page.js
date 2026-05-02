import Navbar from '@/app/component/Navbar'
import Hero from '@/app/component/Hero'
import StatusBar from '@/app/component/StatusBar'
import Services from '@/app/component/Service'
import Portfolio from '@/app/component/Portfolio'
import Timeline from '@/app/component/Timeline'
import Tools from '@/app/component/Tools'
import Portal from '@/app/component/Portal'
import Footer from '@/app/component/Footer'
import ScrollReveal from '@/app/component/ScrollReveal'

export default function Home() {
  return (
    <main>

      <Navbar />

      {/* HOME */}
      <section id="home">
        <Hero />
      </section>

      <ScrollReveal delay={0.2}>
        <StatusBar />
      </ScrollReveal>

      {/* SERVICES */}
      <section id="services">
        <ScrollReveal>
          <Services />
        </ScrollReveal>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio"> {/* lowercase FIX */}
        <ScrollReveal>
          <Portfolio />
        </ScrollReveal>
      </section>

      <ScrollReveal>
        <Timeline />
      </ScrollReveal>

      <ScrollReveal>
        <Tools />
      </ScrollReveal>

      {/* PORTAL */}
      <section id="portal">
        <ScrollReveal>
          <Portal />
        </ScrollReveal>
      </section>

      <ScrollReveal>
        <Footer />
      </ScrollReveal>

    </main>
  )
}