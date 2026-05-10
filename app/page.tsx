import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import BrandStorySection from '../components/BrandStorySection'
import TypographySection from '../components/TypographySection'
import CoreValuesSection from '../components/CoreValuesSection'
import ColorSystemSection from '../components/ColorSystemSection'
import VisualLanguageSection from '../components/VisualLanguageSection'
import PackagingSection from '../components/PackagingSection'
import ApplicationsSection from '../components/ApplicationsSection'
import CultureSocialSection from '../components/CultureSocialSection'
import FooterSection from '../components/FooterSection'
import LenisProvider from '../components/LenisProvider'

export default function Home() {
  return (
    <LenisProvider>
      <Header />
      <main>
        <HeroSection />
        <BrandStorySection />
        <TypographySection />
        <CoreValuesSection />
        <ColorSystemSection />
        <VisualLanguageSection />
        <PackagingSection />
        <ApplicationsSection />
        <CultureSocialSection />
      </main>
      <FooterSection />
    </LenisProvider>
  )
}
