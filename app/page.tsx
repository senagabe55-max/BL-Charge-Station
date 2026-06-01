import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { Benefits } from "@/components/benefits"
import { RegistrationForm } from "@/components/registration-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <HowItWorks />
      <Benefits />
      <RegistrationForm />
      <Footer />
    </main>
  )
}
