'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import {
  applications,
  assets,
  audienceLabels,
  campaigns,
  copyBank,
  coreValues,
  craftsmanship,
  foundationBlocks,
  manifestoLines,
  mindsetCards,
  navLinks,
  overviewCards,
  palette,
  represents,
  typographyWeights,
  visualPrinciples,
} from '../lib/constants'
import {
  fadeUp,
  gridLineAnimation,
  marqueeLoop,
  parallaxImage,
  prefersReducedMotion,
  splitTextReveal,
  staggerCards,
} from '../lib/animations'

function SectionLabel({ kicker, title, copy, dark = false }: { kicker: string; title: string; copy?: string; dark?: boolean }) {
  return (
    <div className="reveal max-w-3xl">
      <p className={`mb-4 font-display text-xs font-bold uppercase tracking-[0.28em] ${dark ? 'text-stone' : 'text-[#8A8A8A]'}`}>
        {kicker}
      </p>
      <h2 className={`font-display text-[clamp(2.35rem,7vw,6.5rem)] font-black uppercase leading-[0.9] ${dark ? 'text-[#F5F5F2]' : 'text-black'}`}>
        {title}
      </h2>
      {copy ? <p className={`mt-6 max-w-2xl text-base leading-8 md:text-lg ${dark ? 'text-white/68' : 'text-black/68'}`}>{copy}</p> : null}
    </div>
  )
}

function ImageFrame({ src, alt, className = '', priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={`image-mask relative overflow-hidden bg-[#111] ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 768px) 100vw, 50vw" className="parallax-img object-cover" />
    </div>
  )
}

function DownloadAssetsButton({ className = '' }: { className?: string }) {
  const [missing, setMissing] = useState(false)

  async function onDownload() {
    try {
      const response = await fetch('/downloads/indikicks-assets.zip', { method: 'HEAD' })
      if (!response.ok) {
        setMissing(true)
        return
      }
      window.location.href = '/downloads/indikicks-assets.zip'
    } catch {
      setMissing(true)
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={onDownload}
        className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#C56A2D] bg-[#C56A2D] px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-[#F5F5F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DCEBFF]"
      >
        <Download size={16} aria-hidden="true" />
        Download Brand Assets
      </button>
      {missing ? <p className="mt-3 text-sm text-[#C56A2D]">Assets file will be added soon.</p> : null}
    </div>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const links = [...navLinks, { label: 'Download Assets', href: '#download' }]

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/55 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 text-[#F5F5F2] sm:px-6 lg:px-10" aria-label="Primary navigation">
        <a href="#hero" className="font-display text-sm font-black uppercase tracking-[0.2em]">
          INDIKICKS<span className="text-[#C56A2D]">TM</span>
        </a>
        <div className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-[0.67rem] font-bold uppercase tracking-[0.18em] text-white/70 transition hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {open ? (
        <div className="border-t border-white/10 bg-black px-4 py-5 text-[#F5F5F2] lg:hidden">
          <div className="grid gap-2">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-white/78">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}

function Preloader({ done }: { done: boolean }) {
  return (
    <div className={`fixed inset-0 z-[70] grid place-items-center bg-black text-[#F5F5F2] transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] ${done ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="w-full max-w-sm px-6 text-center">
        <p className="preload-line font-display text-xs font-bold uppercase tracking-[0.32em] text-white/55">20.5937°N, 78.9629°E - INDIA</p>
        <p className="preload-line mt-8 font-display text-[clamp(2.4rem,12vw,4.8rem)] font-black uppercase leading-none">INDIKICKS</p>
        <div className="preload-rule mx-auto my-6 h-px w-40 origin-center bg-[#C56A2D]" />
        <p className="preload-line font-display text-sm font-bold uppercase tracking-[0.3em]">Own Your Walk.</p>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-black text-[#F5F5F2]">
      <Image src={assets.hero} alt="INDIKICKS sneaker worn in a cinematic streetwear crop" fill priority sizes="100vw" className="hero-img object-cover opacity-65" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.92),rgba(0,0,0,.45),rgba(0,0,0,.2))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(197,106,45,.2),transparent_30%)]" />
      <div className="relative z-10 flex min-h-[100svh] items-end px-4 pb-10 pt-28 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-6xl">
          <p className="hero-copy mb-5 font-display text-xs font-bold uppercase tracking-[0.28em] text-[#DCEBFF]">Premium culture-first sneaker and streetwear label</p>
          <h1 className="font-display text-[clamp(3.2rem,13vw,11.5rem)] font-black uppercase leading-[0.82] tracking-normal">
            {['OWN YOUR WALK.', 'MOVE WITH PURPOSE.', 'FROM INDIAN STREETS', 'TO GLOBAL CULTURE.'].map((line) => (
              <span key={line} className="block overflow-hidden pb-2">
                <span className="hero-line block">{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero-copy mt-7 max-w-2xl text-base leading-8 text-white/74 md:text-xl">
            Premium culture-first sneaker and streetwear label. Born from individuality. Built for a generation that walks in its own direction.
          </p>
          <div className="hero-copy mt-8 flex flex-wrap gap-3">
            <a href="#overview" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F5F5F2] px-6 font-display text-xs font-bold uppercase tracking-[0.18em] text-black">
              Explore Identity
            </a>
            <a href="#download" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
              Download Assets
            </a>
          </div>
        </div>
      </div>
      <p className="hero-coord absolute bottom-5 right-5 z-10 font-display text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/42">20.5937°N, 78.9629°E - INDIA</p>
    </section>
  )
}

function BrandOverview() {
  return (
    <section id="overview" className="bg-[#F5F5F2] px-4 py-24 text-black sm:px-8 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1450px]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionLabel kicker="Section 02" title="Brand Overview" copy="A quick read on the position: premium, Indian, cinematic, and built around identity rather than hype." />
          <ImageFrame src={assets.overview} alt="Brand overview reference from the INDIKICKS identity image pack" className="aspect-[16/9]" />
        </div>
        <div className="snap-x-mandatory mt-12 flex gap-4 overflow-x-auto pb-4 sm:gap-6 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {overviewCards.map((card, index) => (
            <article key={card.title} className="card group min-w-[82vw] snap-start border border-black/12 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(0,0,0,.12)] sm:min-w-[46vw] lg:min-w-0">
              <p className="font-display text-xs font-black uppercase tracking-[0.18em] text-[#C56A2D]">0{index + 1}</p>
              <h3 className="mt-12 font-display text-2xl font-black uppercase leading-none">{card.title}</h3>
              <p className="mt-5 text-sm leading-7 text-black/64">{card.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function BrandFoundation() {
  return (
    <section id="foundation" className="relative overflow-hidden bg-black px-4 py-24 text-[#F5F5F2] sm:px-8 lg:px-16 lg:py-36">
      <ImageFrame src={assets.foundation} alt="Streetwear silhouette used as INDIKICKS foundation visual" className="absolute inset-0 opacity-24" />
      <div className="absolute inset-0 bg-black/72" />
      <div className="relative mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionLabel dark kicker="Section 03" title="Brand Foundation" copy="The philosophy under every visual, product detail, and campaign decision." />
        </div>
        <div className="grid gap-4">
          {foundationBlocks.map((block) => (
            <article key={block.title} className="card border border-white/12 bg-white/[0.055] p-6 backdrop-blur md:p-8">
              <p className="font-display text-xs font-bold uppercase tracking-[0.24em] text-[#C56A2D]">{block.eyebrow}</p>
              <h3 className="mt-5 font-display text-3xl font-black uppercase">{block.title}</h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/68">{block.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function BrandStory() {
  const paragraphs = [
    'For years, sneaker culture in India looked outward for inspiration. The streets were evolving. Fashion was evolving. Youth culture was evolving. But despite this evolution, a disconnect remained.',
    'Most available sneaker brands either focused only on sports performance, copied western aesthetics without identity, looked overly commercial, or lacked emotional and cultural connection.',
    'INDIKICKS was created because Indian youth culture had evolved beyond traditional sportswear and generic fashion. Sneakers were no longer just footwear; they became symbols of identity, confidence, creativity, ambition, and self-expression.',
    'The streets here have their own rhythm, their own energy, their own stories. INDIKICKS exists to bridge that gap, creating sneakers and streetwear that reflect who we are, where we are from, and where we are going.',
  ]
  return (
    <section id="story" className="bg-[#F5F5F2] px-4 py-24 text-black sm:px-8 lg:px-16 lg:py-36">
      <div className="mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <ImageFrame src={assets.story} alt="Indian youth streetwear image for INDIKICKS origin story" className="aspect-[4/5]" />
        </div>
        <div>
          <p className="reveal font-display text-xs font-bold uppercase tracking-[0.28em] text-[#C56A2D]">Section 04 - Brand Story</p>
          <h2 className="story-title mt-5 font-display text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.84]">Born In The Gap.</h2>
          <p className="reveal mt-6 max-w-xl text-xl leading-8 text-black/72">A brand born from the gap between global sneaker culture and authentic Indian youth identity.</p>
          <div className="mt-9 space-y-5">
            {paragraphs.map((copy) => (
              <p key={copy} className="story-copy text-base leading-8 text-black/72 md:text-lg">{copy}</p>
            ))}
          </div>
          <p className="reveal mt-9 font-display text-xl font-black uppercase">From Indian streets to global culture.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {['The Gap - No Emotional Connection', 'The Insight - Sneakers Are Identity', 'The Creation - A Cultural Movement'].map((item) => (
              <div key={item} className="card border border-black/12 p-5">
                <p className="font-display text-sm font-black uppercase leading-tight">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Represents() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 text-[#F5F5F2] sm:px-8 lg:px-16 lg:py-36">
      <ImageFrame src={assets.represents} alt="What INDIKICKS represents reference visual" className="absolute inset-0 opacity-18" />
      <div className="absolute inset-0 bg-black/78" />
      <div className="relative mx-auto max-w-[1450px]">
        <SectionLabel dark kicker="Section 05" title="What INDIKICKS Represents" copy="Belief contrasts. The brand takes the side of identity, culture, and movement." />
        <div className="mt-14 space-y-4">
          {represents.map(([left, right], index) => (
            <p key={left} className={`contrast-line font-display text-[clamp(2rem,7vw,7rem)] font-black uppercase leading-none ${index % 2 ? 'lg:pl-[12vw]' : ''}`}>
              <span>{left}</span> <span className="text-[#C56A2D]">over</span> <span className="text-white/36">{right}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

function CoreValues() {
  return (
    <section id="core-values" className="bg-[#F5F5F2] px-4 py-24 text-black sm:px-8 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1450px]">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <SectionLabel kicker="Section 06" title="Core Values" copy="Seven beliefs, designed as a scrollable system for repeated discovery rather than a static list." />
          <div className="grid grid-cols-3 gap-3">
            {[assets.value, assets.valueTwo, assets.valueThree].map((src, index) => (
              <ImageFrame key={src} src={src} alt={`Core value reference ${index + 1} from the INDIKICKS image pack`} className="aspect-[4/5]" />
            ))}
          </div>
        </div>
        <div className="mt-12 overflow-x-auto scroll-smooth pb-5 [scroll-snap-type:x_mandatory]">
          <div className="value-track flex w-max gap-4 lg:gap-6">
            {coreValues.map(([number, title, copy]) => (
              <article key={title} className="value-card min-h-[360px] w-[82vw] max-w-[420px] shrink-0 snap-center border border-black/12 bg-black p-7 text-[#F5F5F2] sm:w-[52vw] lg:w-[34vw]">
                <p className="font-display text-xs font-bold uppercase tracking-[0.24em] text-[#C56A2D]">{number}</p>
                <h3 className="mt-24 font-display text-4xl font-black uppercase">{title}</h3>
                <p className="mt-5 text-base leading-7 text-white/66">{copy}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-1 h-px w-full bg-black/10"><div className="values-progress h-px w-1/4 bg-[#C56A2D]" /></div>
      </div>
    </section>
  )
}

function LogoSystem() {
  return (
    <section id="logo" className="relative overflow-hidden bg-black px-4 py-24 text-[#F5F5F2] sm:px-8 lg:px-16 lg:py-36">
      <div className="logo-grid absolute inset-0 opacity-25">
        {Array.from({ length: 14 }).map((_, i) => <span key={i} className="grid-line absolute left-0 h-px w-full bg-white/16" style={{ top: `${i * 7.6}%` }} />)}
        {Array.from({ length: 9 }).map((_, i) => <span key={i} className="absolute top-0 h-full w-px bg-white/10" style={{ left: `${i * 12.5}%` }} />)}
      </div>
      <div className="relative mx-auto max-w-[1450px]">
        <SectionLabel dark kicker="Section 07" title="Logo System" copy="A dedicated technical showcase for logo behavior, safe space, and restraint." />
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="card relative min-h-[420px] border border-white/14 bg-white/[0.055] p-6 md:p-10">
            <div className="absolute inset-10 border border-dashed border-[#C56A2D]/55" />
            <div className="absolute left-10 right-10 top-1/2 h-px bg-[#C56A2D]/70" />
            <div className="absolute bottom-10 left-1/2 top-10 w-px bg-[#C56A2D]/70" />
            <div className="relative z-10 grid min-h-[340px] place-items-center">
              <Image src={assets.logo} alt="INDIKICKS primary logo lockup" width={360} height={160} className="h-auto w-[min(72vw,360px)] invert" />
            </div>
            <p className="absolute bottom-5 left-6 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/45">Safe space boundary / measured lockup</p>
          </div>
          <div className="grid gap-5">
            {['Primary Logo - Dark Background', 'Primary Logo - Light Background', 'Forward Motion Mark - Isolated', 'Wordmark Only'].map((label, index) => (
              <div key={label} className={`card flex min-h-32 items-center justify-between border p-5 ${index === 1 ? 'border-black/10 bg-[#F5F5F2] text-black' : 'border-white/14 bg-white/[0.055] text-white'}`}>
                <span className="font-display text-sm font-black uppercase tracking-[0.12em]">{label}</span>
                <Image src={index === 2 ? assets.markWhite : assets.wordmark} alt={`${label} preview`} width={132} height={48} className={index === 1 ? 'h-auto w-28' : 'h-auto w-28 invert'} />
              </div>
            ))}
            <div className="card border border-[#C56A2D]/50 bg-[#C56A2D]/10 p-6">
              <p className="font-display text-sm font-black uppercase">Minimum digital width: 90px</p>
              <p className="mt-2 font-display text-sm font-black uppercase">Minimum print width: 25mm</p>
              <p className="mt-6 text-xl leading-8 text-white/80">"Restraint is luxury. Use the logo less. Make it matter more."</p>
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[assets.logoSystemOne, assets.logoSystemTwo, assets.logoSystemThree, assets.logoSystemFour, assets.logoSystemFive].map((src, index) => (
            <ImageFrame key={src} src={src} alt={`Logo system reference ${index + 1} from the INDIKICKS image pack`} className="aspect-[4/3] border border-white/12" />
          ))}
        </div>
      </div>
    </section>
  )
}

function ColorSystem() {
  return (
    <section id="colors" className="bg-[#F5F5F2] px-4 py-24 text-black sm:px-8 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1450px]">
        <SectionLabel kicker="Section 08" title="Color System" copy="80% core identity, controlled expression through accents, and neutral support for premium restraint." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[assets.colorSystemOne, assets.colorSystemTwo, assets.colorSystemThree].map((src, index) => (
            <ImageFrame key={src} src={src} alt={`Color system reference ${index + 1} from the INDIKICKS image pack`} className="aspect-[16/10]" />
          ))}
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {palette.map(([name, hex, usage, role]) => (
            <button
              key={name}
              type="button"
              onClick={() => navigator.clipboard?.writeText(hex)}
              className="color-card group min-h-56 border border-black/10 p-4 text-left transition hover:-translate-y-1"
              style={{ background: hex, color: hex === '#000000' || hex === '#2E2E2E' || hex === '#8E1F1F' ? '#F5F5F2' : '#000000' }}
            >
              <span className="block font-display text-xs font-bold uppercase tracking-[0.2em] opacity-70">{usage}</span>
              <span className="mt-20 block font-display text-2xl font-black uppercase">{name}</span>
              <span className="mt-2 block text-sm opacity-75">{hex} - {role}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function TypographySystem() {
  return (
    <section className="overflow-hidden bg-black px-4 py-24 text-[#F5F5F2] sm:px-8 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1450px]">
        <SectionLabel dark kicker="Section 09" title="Typography System" copy="Montserrat carries the brand voice. Inter keeps the longer reading experience human and precise." />
        <ImageFrame src={assets.typography} alt="Tagline and typography system reference from the INDIKICKS image pack" className="mt-12 aspect-[16/8] border border-white/12" />
        <div className="mt-12 overflow-x-auto border-y border-white/12 py-8">
          <p className="type-row whitespace-nowrap font-display text-[clamp(4rem,16vw,13rem)] font-black uppercase leading-none">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {typographyWeights.map(([family, weight, use]) => (
            <div key={`${family}-${weight}`} className="card border border-white/12 p-5">
              <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#C56A2D]">{family} {weight}</p>
              <p className={`mt-8 text-4xl leading-none ${family === 'Montserrat' ? 'font-display uppercase' : 'font-body'}`} style={{ fontWeight: Number(weight) }}>
                Own Your Walk
              </p>
              <p className="mt-5 text-sm leading-6 text-white/60">{use}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function VisualLanguage() {
  const gallery = [
    [assets.visualOne, 'Movement-focused streetwear crop'],
    [assets.visualTwo, 'Close-up sneaker storytelling'],
    [assets.visualThree, 'Street application with rich blacks'],
    [assets.visualFour, 'Metro context and cultural movement'],
  ]
  return (
    <section id="visuals" className="bg-black px-4 py-24 text-[#F5F5F2] sm:px-8 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1450px]">
        <SectionLabel dark kicker="Section 10" title="Visual Language" copy="Cinematic streetwear editorial. Raw but premium. Modern Indian without stereotype." />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {gallery.map(([src, alt], index) => (
            <figure key={src} className={`card ${index % 2 ? 'lg:mt-16' : ''}`}>
              <ImageFrame src={src} alt={alt} className="aspect-[3/4]" />
              <figcaption className="mt-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-white/58">{alt}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12 grid gap-3 md:grid-cols-2">
          <div className="card border border-white/12 p-6">
            <h3 className="font-display text-xl font-black uppercase">Use</h3>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/68">{visualPrinciples.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="card border border-white/12 p-6">
            <h3 className="font-display text-xl font-black uppercase">Avoid</h3>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/68">
              {['Glossy commercial sports imagery', 'Generic gym visuals', 'Fake luxury aesthetics', 'Overly saturated palettes'].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Craftsmanship() {
  return (
    <section className="bg-[#CFCAC2] px-4 py-24 text-black sm:px-8 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1450px]">
        <SectionLabel kicker="Section 11" title="Craftsmanship System" copy="Product quality expressed as detail, restraint, material confidence, and tactile storytelling." />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {[assets.craftOne, assets.craftTwo, assets.craftThree, assets.craftFour, assets.craftFive].map((src, index) => (
            <ImageFrame key={src} src={src} alt={`INDIKICKS product craftsmanship detail ${index + 1}`} className="aspect-[4/5]" />
          ))}
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {craftsmanship.map(([title, copy]) => (
            <details key={title} className="card group border border-black/12 bg-[#F5F5F2] p-5" open>
              <summary className="cursor-pointer list-none font-display text-sm font-black uppercase">{title}</summary>
              <p className="mt-4 text-sm leading-6 text-black/65">{copy}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function BrandApplications() {
  return (
    <section className="bg-[#F5F5F2] px-4 py-24 text-black sm:px-8 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1450px]">
        <SectionLabel kicker="Section 12" title="Brand Application System" copy="Four social/application cards only, with Post 5 intentionally excluded." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {applications.map(([title, src]) => (
            <article key={title} className="card group border border-black/12 bg-white">
              <ImageFrame src={src} alt={`${title} INDIKICKS brand application`} className="aspect-[4/5]" />
              <div className="p-5">
                <h3 className="font-display text-xl font-black uppercase">{title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function TargetAudience() {
  return (
    <section className="bg-black px-4 py-24 text-[#F5F5F2] sm:px-8 lg:px-16 lg:py-36">
      <div className="mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <SectionLabel dark kicker="Section 13" title="Target Audience" copy="Audience by mindset, not age. The brand speaks to how people see themselves moving through culture." />
          <div className="mt-8 flex flex-wrap gap-2">
            {audienceLabels.map((label) => <span key={label} className="card rounded-full border border-white/14 px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.14em] text-white/70">{label}</span>)}
          </div>
        </div>
        <div>
          <ImageFrame src={assets.audience} alt="Human-centered INDIKICKS streetwear audience image" className="aspect-[5/4]" />
          <p className="reveal mt-8 font-display text-[clamp(2rem,6vw,5rem)] font-black uppercase leading-none">"I want to wear something that reflects who I am."</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {mindsetCards.map(([title, copy]) => (
              <div key={title} className="card border border-white/12 p-5">
                <h3 className="font-display text-lg font-black uppercase">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function BrandVoice() {
  return (
    <section className="overflow-hidden bg-[#F5F5F2] py-24 text-black lg:py-36">
      <div className="px-4 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-[1450px]">
          <SectionLabel kicker="Section 14" title="Brand Voice" copy="Cinematic, emotionally intelligent, movement-oriented. Never preachy. Never corporate. Never aggressive sports messaging." />
        </div>
      </div>
      <div className="mt-12 overflow-hidden border-y border-black/10 py-5">
        <div className="marquee flex w-max gap-8 font-display text-3xl font-black uppercase whitespace-nowrap text-black">
          {[...copyBank, ...copyBank].map((line, index) => <span key={`${line}-${index}`}>{line}<span className="mx-8 text-[#C56A2D]">/</span></span>)}
        </div>
      </div>
      <div className="mx-auto mt-12 grid max-w-[1450px] gap-3 px-4 sm:px-8 md:grid-cols-3 lg:px-16">
        <ImageFrame src={assets.brandVoice} alt="Brand voice reference from the INDIKICKS image pack" className="card aspect-[4/3] border border-black/12 md:col-span-3" />
        {copyBank.slice(0, 6).map((line) => <div key={line} className="card border border-black/12 p-5 font-display text-xl font-black uppercase leading-tight">{line}</div>)}
      </div>
    </section>
  )
}

function Packaging() {
  const pieces = [
    ['Rigid premium box', assets.packagingBox],
    ['Custom tissue paper', assets.packagingTissue],
    ['Thank you card', assets.packagingCard],
  ]
  return (
    <section id="packaging" className="bg-black px-4 py-24 text-[#F5F5F2] sm:px-8 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1450px]">
        <SectionLabel dark kicker="Section 15" title="Packaging System" copy="A premium unboxing ritual: matte black, Cloud White typography, soft-touch finish, minimal spot UV, story insert, QR experience, stickers." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pieces.map(([title, src]) => (
            <article key={title} className="card border border-white/12 bg-white/[0.045]">
              <ImageFrame src={src} alt={`${title} for INDIKICKS packaging`} className="aspect-[4/3]" />
              <div className="p-5">
                <h3 className="font-display text-xl font-black uppercase">{title}</h3>
              </div>
            </article>
          ))}
        </div>
        <div className="card mt-8 border border-[#C56A2D]/45 p-8 text-center">
          <p className="font-display text-[clamp(1.8rem,5vw,4rem)] font-black uppercase leading-none">You were never meant to blend in. Own Your Walk.</p>
        </div>
      </div>
    </section>
  )
}

function CampaignDirection() {
  return (
    <section className="bg-[#F5F5F2] px-4 py-24 text-black sm:px-8 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1450px]">
        <SectionLabel kicker="Section 16" title="Campaign Direction" copy="Campaigns behave like cultural chapters, not product ads." />
        <div className="mt-12 flex gap-4 overflow-x-auto pb-4 [scroll-snap-type:x_mandatory]">
          {campaigns.map(([title, copy, src]) => (
            <article key={title} className="card min-w-[84vw] snap-center border border-black/12 bg-white sm:min-w-[48vw] lg:min-w-[35vw]">
              <ImageFrame src={src} alt={`${title} campaign image`} className="aspect-[16/10]" />
              <div className="p-6">
                <h3 className="font-display text-3xl font-black uppercase">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-black/65">{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function StreetwearLanguage() {
  const blocks = [
    ['Sneaker Design', 'Premium materials, restrained palette, subtle cultural detailing, clean silhouettes, identity-driven design, limited drops, genuine collaborations.'],
    ['Apparel Language', 'Premium oversized silhouettes, muted tonal colorways, minimal graphic language, typography-driven seasonal design, elevated materials.'],
    ['Social Media', 'Cinematic editorial grid, movement-driven video, community voice, behind-the-scenes process, story-first and product-second.'],
  ]
  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 text-[#F5F5F2] sm:px-8 lg:px-16 lg:py-36">
      <p className="absolute left-0 top-20 whitespace-nowrap font-display text-[18vw] font-black uppercase leading-none text-white/[0.035]">Streetwear Language</p>
      <div className="relative mx-auto max-w-[1450px]">
        <SectionLabel dark kicker="Section 17" title="Streetwear & Apparel" copy="The brand extends beyond sneakers with restraint, texture, and identity-led design." />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {blocks.map(([title, copy], index) => (
            <article key={title} className="card border border-white/12 bg-white/[0.055] p-6">
              {index === 0 ? <ImageFrame src={assets.streetwear} alt="INDIKICKS apparel and cap application" className="mb-6 aspect-square" /> : null}
              <h3 className="font-display text-3xl font-black uppercase">{title}</h3>
              <p className="mt-5 text-base leading-8 text-white/64">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CommunityCulture() {
  const wall = [assets.communityOne, assets.communityTwo, assets.communityThree, assets.communityFour, assets.visualTwo]
  return (
    <section className="overflow-hidden bg-[#F5F5F2] py-24 text-black lg:py-36">
      <div className="px-4 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-[1450px] text-center">
          <SectionLabel kicker="Section 18" title="Build A Movement. Not Just A Brand." copy="Not a loyalty program. A movement shaped by people who feel welcomed, expressive, confident, and in motion." />
        </div>
      </div>
      <div className="mt-12 grid gap-4">
        {[0, 1].map((row) => (
          <div key={row} className={`culture-row flex w-max gap-4 ${row ? '-translate-x-24' : ''}`}>
            {[...wall, ...wall].map((src, index) => (
              <div key={`${src}-${row}-${index}`} className="relative h-56 w-72 shrink-0 overflow-hidden bg-black md:h-72 md:w-96">
                <Image src={src} alt="INDIKICKS community and culture wall image" fill sizes="380px" className="object-cover" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

function FinalManifesto() {
  return (
    <section id="manifesto" className="bg-black px-4 py-24 text-[#F5F5F2] sm:px-8 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <p className="reveal font-display text-xs font-bold uppercase tracking-[0.28em] text-[#C56A2D]">Section 19 - Final Manifesto</p>
        <div className="mt-12 space-y-4">
          {manifestoLines.map((line) => <p key={line} className="manifesto-line font-display text-[clamp(2rem,6.6vw,7rem)] font-black uppercase leading-[0.92] text-white/24">{line}</p>)}
        </div>
        <div className="mt-16 h-px w-40 bg-[#C56A2D]" />
        <p className="reveal mt-8 font-display text-2xl font-black uppercase">- Own Your Walk. Always.</p>
        <p className="reveal mt-8 font-display text-sm font-bold uppercase tracking-[0.25em] text-white/48">INDIKICKS™ / India - Est. 2026</p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="download" className="bg-[#F5F5F2] px-4 py-16 text-black sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-[1450px] gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="font-display text-4xl font-black uppercase">INDIKICKS™</p>
          <p className="mt-3 font-display text-xl font-black uppercase text-[#C56A2D]">Own Your Walk.</p>
          <p className="mt-5 max-w-md text-base leading-7 text-black/62">Premium culture-first sneaker and streetwear label.</p>
        </div>
        <div className="lg:text-right">
          <DownloadAssetsButton />
          <div className="mt-8 flex flex-wrap gap-3 lg:justify-end">
            {navLinks.map((link) => <a key={link.href} href={link.href} className="font-display text-xs font-bold uppercase tracking-[0.18em] text-black/58 hover:text-black">{link.label}</a>)}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function BrandExperience() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setPreloaderDone(true), 1600)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return

    let ctx: { revert: () => void } | undefined

    async function setup() {
      const gsapModule = await import('gsap')
      const scrollTriggerModule = await import('gsap/ScrollTrigger')
      const gsap = gsapModule.gsap
      gsap.registerPlugin(scrollTriggerModule.ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo('.preload-line', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.16, ease: 'power3.out' })
        gsap.fromTo('.preload-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.8, delay: 0.45, ease: 'power3.out' })
        gsap.fromTo('.hero-img', { scale: 1.12 }, { scale: 1, duration: 2.4, ease: 'power3.out' })
        splitTextReveal(gsap, '.hero-line', 0.15)
        fadeUp(gsap, '.hero-copy', 0.85)
        gsap.to('.hero-coord', { yPercent: -90, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } })

        gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
          gsap.fromTo(el, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%' } })
        })
        gsap.utils.toArray<HTMLElement>('.card').forEach((el) => {
          gsap.fromTo(el, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
        })
        gsap.utils.toArray<HTMLElement>('.image-mask').forEach((el) => {
          gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)', scale: 1.04 }, { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
        })
        gsap.fromTo('.story-title', { letterSpacing: '0.08em', autoAlpha: 0 }, { letterSpacing: '0em', autoAlpha: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.story-title', start: 'top 82%' } })
        gsap.utils.toArray<HTMLElement>('.story-copy').forEach((el) => {
          gsap.fromTo(el, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
        })
        gsap.utils.toArray<HTMLElement>('.parallax-img').forEach((el) => parallaxImage(gsap, el, 8))
        gsap.utils.toArray<HTMLElement>('.contrast-line').forEach((el, index) => {
          gsap.fromTo(el, { xPercent: index % 2 ? 12 : -12, autoAlpha: 0.4 }, { xPercent: 0, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom 45%', scrub: true } })
        })
        gsap.utils.toArray<HTMLElement>('.manifesto-line').forEach((el) => {
          gsap.to(el, { color: '#F5F5F2', scrollTrigger: { trigger: el, start: 'top 72%', end: 'bottom 42%', scrub: true } })
        })
        staggerCards(gsap, '.value-card')
        gridLineAnimation(gsap, '.grid-line')
        marqueeLoop(gsap, '.marquee')
        gsap.to('.culture-row', { xPercent: -18, duration: 24, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.4 })
        gsap.to('.values-progress', { width: '100%', ease: 'none', scrollTrigger: { trigger: '#core-values', start: 'top 70%', end: 'bottom 40%', scrub: true } })
      }, rootRef)
    }

    setup()

    return () => ctx?.revert()
  }, [])

  return (
    <div ref={rootRef} className="overflow-x-clip bg-black">
      <Preloader done={preloaderDone} />
      <Nav />
      <main>
        <Hero />
        <BrandOverview />
        <BrandFoundation />
        <BrandStory />
        <Represents />
        <CoreValues />
        <LogoSystem />
        <ColorSystem />
        <TypographySystem />
        <VisualLanguage />
        <Craftsmanship />
        <BrandApplications />
        <TargetAudience />
        <BrandVoice />
        <Packaging />
        <CampaignDirection />
        <StreetwearLanguage />
        <CommunityCulture />
        <FinalManifesto />
      </main>
      <Footer />
    </div>
  )
}
