import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroFilmExperience } from "@/components/sections/HeroFilmExperience";
import { Approach } from "@/components/sections/Approach";
import { Portfolio } from "@/components/sections/Portfolio";
import { Performance } from "@/components/sections/Performance";
import { Participate } from "@/components/sections/Participate";
import { AppPreview } from "@/components/sections/AppPreview";
import { Connect } from "@/components/sections/Connect";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section aria-labelledby="hero-heading">
          <HeroFilmExperience />
        </section>
        <Approach />
        <Portfolio />
        <Performance />
        <AppPreview />
        <Participate />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
