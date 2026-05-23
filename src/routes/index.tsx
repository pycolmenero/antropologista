import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: FieldNotes,
})

type SubItem = {
  label: string
  desc?: string
  tag?: 'problem' | 'solution' | 'info'
}

type SubSection = {
  title: string
  items: SubItem[]
  ancient?: string
}

type Category = {
  id: string
  icon: string
  label: string
  tagline: string
  color: string
  summary: string
  sections: SubSection[]
}

const categories: Category[] = [
  {
    id: 'sleep',
    icon: '◑',
    label: 'SLEEP',
    tagline: 'Circadian disruption in artificial environments',
    color: '#8b7ec8',
    summary:
      'Modern artificial lighting tricks the brain into thinking it is still daytime long after sunset, suppressing melatonin and fragmenting deep sleep. Ancient humans slept in two phases separated by a waking period — a pattern largely erased by electric light.',
    sections: [
      {
        title: 'Blue & Green Light at Night',
        items: [
          {
            label: 'Screens & LEDs',
            desc: 'Phones, tablets, and LED bulbs emit high-energy blue light (450–490nm) and green light that suppress melatonin production by up to 85%, delaying the onset of sleep by 1–3 hours.',
            tag: 'problem',
          },
          {
            label: 'Overhead lighting',
            desc: 'Most indoor lights activate intrinsically photosensitive retinal ganglion cells (ipRGCs) even at low intensities after dusk.',
            tag: 'problem',
          },
          {
            label: 'Red-lens glasses',
            desc: 'Amber or red-tinted glasses (blocking wavelengths below 550nm) worn 1–2 hours before bed measurably improve sleep quality and melatonin levels. Low-cost options are available, though dedicated blue-blockers vary in quality.',
            tag: 'solution',
          },
          {
            label: 'E-ink devices',
            desc: 'E-ink displays (Kindle, reMarkable) emit almost no blue light and require significantly less luminance than LCD screens — a strong replacement for evening reading.',
            tag: 'solution',
          },
          {
            label: 'Warm lighting at night',
            desc: 'Replace bulbs with 1800–2200K "firelight" LEDs or salt lamps in rooms used after sunset. Avoid overhead light; use low, side-positioned lamps.',
            tag: 'solution',
          },
        ],
        ancient:
          'Pre-industrial and hunter-gatherer sleep was biphasic: a "first sleep" from around dusk, a 1–2 hour waking period in the middle of the night, then a "second sleep." Historian Roger Ekirch found hundreds of historical references to this pattern. Electric light compressed sleep into a single block — and likely increased anxiety around "inability to sleep through the night."',
      },
      {
        title: 'Temperature & Environment',
        items: [
          {
            label: 'Warm rooms',
            desc: 'Core body temperature must drop 1–2°C for sleep onset. Heated bedrooms (above 19°C / 66°F) impair this transition.',
            tag: 'problem',
          },
          {
            label: 'Cool sleeping environment',
            desc: 'Aim for 16–19°C (60–67°F) in the bedroom. Opening a window or using a fan can meaningfully improve slow-wave and REM sleep.',
            tag: 'solution',
          },
          {
            label: 'Blackout darkness',
            desc: 'Even small amounts of light during sleep elevate cortisol and disrupt glucose metabolism. Blackout curtains or a sleep mask are low-cost, high-impact.',
            tag: 'solution',
          },
        ],
      },
    ],
  },
  {
    id: 'food',
    icon: '◎',
    label: 'FOOD',
    tagline: 'Ultra-processed ingredients and how to spot them',
    color: '#c4623a',
    summary:
      'The modern food supply is dense with additives, stabilisers, and refined ingredients that bear little resemblance to what humans ate for 99% of their evolutionary history. Learning to read a label is a basic survival skill.',
    sections: [
      {
        title: 'Hidden Sugars',
        items: [
          {
            label: 'Over 60 names for sugar',
            desc: 'Manufacturers list sugar under different names to bury it further down ingredient lists. Watch for: maltodextrin, dextrose, fructose, corn syrup, barley malt, cane juice, rice syrup, agave nectar, and anything ending in "-ose".',
            tag: 'problem',
          },
          {
            label: 'High-fructose corn syrup (HFCS)',
            desc: 'Metabolised differently from glucose — primarily in the liver — and strongly associated with non-alcoholic fatty liver disease and metabolic syndrome even at moderate intake.',
            tag: 'problem',
          },
          {
            label: 'The "no added sugar" trap',
            desc: 'Products labelled "no added sugar" often contain naturally concentrated fruit sugars or artificial sweeteners that still trigger insulin response.',
            tag: 'problem',
          },
          {
            label: 'Rule of thumb',
            desc: 'Ingredients are listed by weight. If any sugar appears in the first 3 ingredients, the product is high-sugar. More than 5g per 100g is high; more than 22.5g per 100g is very high.',
            tag: 'info',
          },
        ],
      },
      {
        title: 'E-Numbers & Additives',
        items: [
          {
            label: 'E-numbers to avoid',
            desc: 'Not all E-numbers are problematic, but several are worth avoiding. E102 (Tartrazine) — linked to hyperactivity. E110, E122, E124 — food dyes associated with behavioural effects. E211 (Sodium benzoate) — forms benzene (carcinogen) when combined with vitamin C. E249–E252 (nitrates/nitrites) — associated with colorectal cancer risk.',
            tag: 'problem',
          },
          {
            label: 'Seed & vegetable oils',
            desc: 'Canola, sunflower, soybean, corn, and cottonseed oils are high in omega-6 linoleic acid and become oxidised during high-heat industrial processing. Excess omega-6 relative to omega-3 drives chronic inflammation. Listed as E471, E472, or under generic "vegetable oil".',
            tag: 'problem',
          },
          {
            label: 'Safe E-numbers',
            desc: 'E300 (vitamin C), E322 (lecithin), E440 (pectin) — these are naturally derived and generally safe.',
            tag: 'info',
          },
          {
            label: 'Open Food Facts',
            desc: 'A free open-source database (openfoodfacts.org and its app) where you can scan any barcode to see the full ingredient list, Nutri-score, and additive flags.',
            tag: 'solution',
          },
        ],
        ancient:
          'For ~2.5 million years, human diet consisted of whole animal foods, tubers, seasonal fruits, leafy plants, and fermented items. No emulsifiers, no preservatives, no seed oils. Epidemiological studies of remaining hunter-gatherer groups (Hadza, Tsimane) show near-zero rates of cardiovascular disease, type 2 diabetes, and metabolic syndrome.',
      },
      {
        title: 'Seed Oils & Fats',
        items: [
          {
            label: 'The industrial oil shift',
            desc: 'Prior to 1900, the main dietary fats were butter, lard, tallow, and olive oil. The introduction of hydrogenated vegetable oils (Crisco, 1911) radically changed the omega-6 to omega-3 ratio in Western diets — from roughly 4:1 to 20:1.',
            tag: 'problem',
          },
          {
            label: 'Better alternatives',
            desc: 'For cooking: butter, ghee, tallow, lard, coconut oil, or cold-pressed olive oil (low heat only). These are stable saturated or monounsaturated fats that do not oxidise at high temperatures.',
            tag: 'solution',
          },
        ],
      },
    ],
  },
  {
    id: 'clothing',
    icon: '◻',
    label: 'CLOTHING',
    tagline: 'Synthetic fabrics and skin absorption',
    color: '#5e8c6a',
    summary:
      'Polyester, nylon, and acrylic cover the majority of bodies in the modern world. These petroleum-derived fibres shed microplastics into the body, trap heat, and may leach endocrine-disrupting chemicals — particularly concerning given that skin is the body\'s largest organ.',
    sections: [
      {
        title: 'Polyester & Synthetics',
        items: [
          {
            label: 'Microplastic shedding',
            desc: 'A single synthetic garment can shed over 700,000 microfibres per wash. These accumulate in gut, lung, and placental tissue. Studies now find polyester fibres in human blood and breast milk.',
            tag: 'problem',
          },
          {
            label: 'Skin absorption',
            desc: 'The skin absorbs a significant fraction of what it contacts. Synthetic fabrics treated with flame retardants, dyes, and "wrinkle-free" finishes (often formaldehyde-based) may transfer chemicals transdermally, especially under heat and sweat.',
            tag: 'problem',
          },
          {
            label: 'Heat entrapment',
            desc: 'Polyester does not breathe — it traps moisture and heat against the skin, raising local temperature and creating conditions linked to bacterial overgrowth and skin irritation.',
            tag: 'problem',
          },
          {
            label: 'PFAS in performance wear',
            desc: '"Waterproof" and "stain-resistant" finishes on sportswear commonly use per- and polyfluoroalkyl substances (PFAS) — persistent chemicals associated with thyroid disruption, cancer, and immune suppression.',
            tag: 'problem',
          },
          {
            label: 'Natural fibre alternatives',
            desc: 'Linen — breathable, antimicrobial, low-environmental impact. Cotton (organic) — soft, breathable, widely available. Wool (merino) — thermoregulating, naturally odour-resistant. Hemp — among the most durable and breathable plant fibres. These materials have been in use for thousands of years without adverse effect.',
            tag: 'solution',
          },
        ],
        ancient:
          'For most of human history, clothing was made from plant fibres (linen, hemp, cotton) or animal materials (wool, leather, silk). These are biodegradable, do not shed synthetic particles, and have undergone long evolutionary co-existence with human skin. Industrial synthetic textiles are roughly 80 years old — a blink in evolutionary terms.',
      },
    ],
  },
  {
    id: 'hygiene',
    icon: '◌',
    label: 'HYGIENE',
    tagline: 'Endocrine disruptors & what ancient humans did instead',
    color: '#7a8fa0',
    summary:
      'The modern hygiene industry is built on products that may undermine the very systems they claim to support. The skin microbiome, hormonal balance, and natural thermoregulation evolved over millions of years without synthetic fragrances, surfactants, or SPF chemicals.',
    sections: [
      {
        title: 'Perfumes & Fragrances',
        items: [
          {
            label: 'Endocrine disruptors in fragrances',
            desc: '"Fragrance" on a label can legally conceal hundreds of chemicals. Common offenders: phthalates (DBP, DEHP) — block testosterone and disrupt fetal development. Musks (galaxolide, tonalide) — accumulate in adipose tissue and blood. Parabens — mimic oestrogen. Benzophenones — absorbed through skin and found in breast tissue.',
            tag: 'problem',
          },
          {
            label: 'Testosterone & hormonal impact',
            desc: 'Phthalates are among the most studied anti-androgens. Multiple studies link urinary phthalate levels to reduced testosterone, lower sperm count, and altered fetal sexual development. They are present in most synthetic fragrances, air fresheners, and scented personal care products.',
            tag: 'problem',
          },
          {
            label: 'Alternatives',
            desc: 'Single-ingredient botanical oils (rose, cedar, sandalwood) carry no hidden fragrance cocktails. Certified organic or "fragrance-free" products list all ingredients. The EWG Skin Deep database rates personal care ingredients for toxicity.',
            tag: 'solution',
          },
        ],
      },
      {
        title: 'Soap, Shampoo & the Skin Microbiome',
        items: [
          {
            label: 'Surfactant overuse',
            desc: 'Daily shampooing with sodium lauryl sulphate (SLS) and similar surfactants strips the scalp of sebum and disrupts the skin microbiome — the community of bacteria that maintain skin immunity and pH. The scalp then compensates by overproducing oil, creating a cycle of dependency.',
            tag: 'problem',
          },
          {
            label: 'Antibacterial soaps',
            desc: 'Triclosan (banned in the US but still found in products globally) and benzalkonium chloride are broad-spectrum antimicrobials that disrupt the skin microbiome and are associated with antibiotic resistance.',
            tag: 'problem',
          },
          {
            label: 'Water-only washing',
            desc: 'Many people who reduce shampoo frequency find that after a 4–8 week adjustment period, scalp oil production normalises. Water with mechanical scrubbing removes sweat, dust, and most odour-causing bacteria adequately.',
            tag: 'solution',
          },
          {
            label: 'Castile soap',
            desc: 'Pure plant-oil-based soap (olive, coconut, hemp) without synthetic additives is a minimal-ingredient alternative with centuries of use.',
            tag: 'solution',
          },
        ],
        ancient:
          'Most traditional cultures used minimal or no soap — water, plant ash (lye), clay, or fermented oils. Roman baths used a metal scraper (strigil) rather than soap. Many hunter-gatherer peoples maintain clean, healthy skin microbiomes without any commercial products.',
      },
      {
        title: 'Toothpaste & Oral Health',
        items: [
          {
            label: 'What modern toothpaste contains',
            desc: 'Commercial toothpastes typically include: sodium fluoride (debated in high doses), sodium lauryl sulphate (causes canker sores in some users), triclosan (endocrine disruptor), artificial sweeteners, and titanium dioxide. Many of these have no counterpart in evolutionary context.',
            tag: 'problem',
          },
          {
            label: 'What ancient humans did',
            desc: 'Tooth decay (caries) was rare in pre-agricultural populations — not because of dental hygiene, but because of diet. Archaeological studies show near-perfect dental health in hunter-gatherers with no dental care, compared to heavy caries once agriculture and refined carbohydrates were introduced.',
            tag: 'info',
          },
          {
            label: 'Minimal alternatives',
            desc: 'Tooth powder (baking soda + salt), oil pulling with coconut oil, and activated charcoal are traditional practices with evidence of effectiveness. Some use a simple wet brush with no paste at all.',
            tag: 'solution',
          },
        ],
      },
      {
        title: 'Skincare & DIY',
        items: [
          {
            label: 'The problem with complex routines',
            desc: 'Multi-step skincare routines with active ingredients (retinoids, AHAs, niacinamide, etc.) are largely a modern commercial invention. Layering products with different pH levels, preservatives, and penetration enhancers increases the transdermal absorption of potentially problematic chemicals.',
            tag: 'problem',
          },
          {
            label: 'Homemade alternatives',
            desc: 'Tallow balm (rendered beef fat) — closely matches the lipid profile of human sebum and has been used as a skin emollient for thousands of years. Shea butter — unrefined, high in triterpenes with anti-inflammatory properties. Raw honey — natural antimicrobial and humectant for masks. Rosehip oil — high in trans-retinoic acid, effective for scarring and skin repair.',
            tag: 'solution',
          },
        ],
      },
      {
        title: 'Sunscreen & Daily Sunbathing',
        items: [
          {
            label: 'Chemical sunscreen concerns',
            desc: 'Oxybenzone, octinoxate, and avobenzone are absorbed into the bloodstream within hours of application at levels that exceed FDA safety thresholds. Oxybenzone is a known endocrine disruptor found in human urine, blood, and breast milk.',
            tag: 'problem',
          },
          {
            label: 'Vitamin D deficiency epidemic',
            desc: 'Over 1 billion people are vitamin D deficient. Chronic sun avoidance, sunscreen use, and indoor living are primary causes. Vitamin D deficiency is associated with depression, immune suppression, cancer risk, and autoimmune disease.',
            tag: 'problem',
          },
          {
            label: 'What ancient humans did',
            desc: 'Pre-industrial humans received daily solar radiation across large areas of skin. Populations near the equator developed darker skin as UV protection; northern populations maintained lighter skin to maximise vitamin D synthesis in low-sunlight environments. The modern advice to avoid all unprotected sun exposure has no evolutionary precedent.',
            tag: 'info',
          },
          {
            label: 'Mineral sunscreen',
            desc: 'Zinc oxide and titanium dioxide (non-nano particle formulations) sit on top of the skin rather than being absorbed. These are the only FDA-approved "generally recognised as safe" sunscreen ingredients as of 2021.',
            tag: 'solution',
          },
          {
            label: 'Homemade sunscreen',
            desc: 'Zinc oxide powder (non-nano) mixed with a carrier oil or shea butter at 15–25% concentration provides meaningful SPF protection. Raspberry seed oil naturally contains broad-spectrum UV-filtering properties, though SPF claims vary widely.',
            tag: 'solution',
          },
          {
            label: 'Solar protocol',
            desc: 'Short daily sun exposure (10–30 min) on large skin areas around solar noon builds vitamin D and sets circadian rhythm. Avoid burning. Gradual melanin buildup (tanning) is the body\'s natural sunscreen.',
            tag: 'solution',
          },
        ],
      },
      {
        title: 'Walking Barefoot',
        items: [
          {
            label: 'Does earthing / grounding work?',
            desc: 'Direct skin contact with the earth (soil, grass, sand) allows transfer of free electrons from the ground to the body. Small studies suggest this reduces systemic inflammation markers, improves sleep onset, and normalises cortisol rhythms — though the research base remains limited.',
            tag: 'info',
          },
          {
            label: 'Foot mechanics',
            desc: 'The modern shoe — particularly cushioned soles with elevated heels — alters foot mechanics, weakens intrinsic foot muscles, and is strongly associated with flat feet, plantar fasciitis, and lower-back pain. Barefoot walking or minimal shoes activate 40+ muscles in the foot and lower leg.',
            tag: 'problem',
          },
          {
            label: 'Minimalist footwear',
            desc: 'Zero-drop, thin-soled sandals or shoes (Xero, Vivobarefoot, or traditional leather sandals) preserve natural foot mechanics while providing protection. These can be attached at the calf with leather thong — a design used across cultures for millennia.',
            tag: 'solution',
          },
          {
            label: 'Transitioning safely',
            desc: 'Transitioning from cushioned to minimal footwear must be done gradually (over months) to avoid stress fractures and tendon injuries as foot musculature rebuilds.',
            tag: 'info',
          },
        ],
        ancient:
          'For virtually all of human prehistory, feet were bare or minimally wrapped. The foot evolved 26 bones, 33 joints, and over 100 muscles and tendons specifically for contact with uneven, varied terrain. Modern arch support effectively outsources muscle function to foam, leading to progressive weakening over decades.',
      },
    ],
  },
]

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`chevron ${open ? 'rotated' : ''}`}
      style={{ color: 'var(--text-muted)' }}
    >
      <path
        d="M2 5L7 10L12 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CategoryCard({
  category,
  index,
}: {
  category: Category
  index: number
}) {
  const [open, setOpen] = useState(false)
  const [openSection, setOpenSection] = useState<number | null>(null)

  return (
    <div
      className={`category-card stagger-in stagger-${index + 1} ${open ? 'open' : ''}`}
      style={{ '--cat-color': category.color } as React.CSSProperties}
    >
      {/* Header row */}
      <div
        className="flex items-center gap-5 px-6 py-5 select-none"
        onClick={() => setOpen((v) => !v)}
      >
        <div
          className="icon-ring"
          style={{
            color: category.color,
            borderColor: open
              ? `${category.color}40`
              : 'rgba(232,220,200,0.1)',
          }}
        >
          <span className="font-display" style={{ fontSize: 22 }}>
            {category.icon}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h2
              className="font-display font-semibold tracking-widest"
              style={{
                fontSize: 'clamp(18px, 3vw, 26px)',
                letterSpacing: '0.18em',
                color: open ? category.color : 'var(--text-primary)',
                transition: 'color 0.3s ease',
              }}
            >
              {category.label}
            </h2>
            <span
              style={{
                fontSize: 11,
                color: 'var(--text-muted)',
                fontFamily: 'Space Mono',
                letterSpacing: '0.06em',
              }}
            >
              {category.tagline}
            </span>
          </div>
        </div>

        <ChevronIcon open={open} />
      </div>

      {/* Expanded content */}
      <div className={`expanded-panel ${open ? 'open' : ''}`}>
        <div className="expanded-inner">
          <div className="divider" />
          <div
            style={{ background: 'var(--bg-expanded)' }}
            className="px-6 py-6"
          >
            {/* Summary */}
            <p
              className="font-display"
              style={{
                fontSize: 'clamp(15px, 2vw, 18px)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                marginBottom: 24,
                fontStyle: 'italic',
                fontWeight: 300,
              }}
            >
              {category.summary}
            </p>

            {/* Sub-sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {category.sections.map((section, si) => (
                <div
                  key={si}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  {/* Section header */}
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer"
                    style={{
                      background:
                        openSection === si
                          ? 'rgba(232,220,200,0.03)'
                          : 'transparent',
                      borderBottom:
                        openSection === si
                          ? '1px solid var(--border)'
                          : 'none',
                      transition: 'background 0.2s ease',
                    }}
                    onClick={() =>
                      setOpenSection(openSection === si ? null : si)
                    }
                  >
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color:
                          openSection === si
                            ? category.color
                            : 'var(--text-secondary)',
                        fontFamily: 'Space Mono',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {section.title}
                    </span>
                    <ChevronIcon open={openSection === si} />
                  </div>

                  {/* Section items */}
                  <div
                    className={`expanded-panel ${openSection === si ? 'open' : ''}`}
                  >
                    <div className="expanded-inner">
                      <div>
                        {section.items.map((item, ii) => (
                          <div key={ii} className="item-row px-4 py-4">
                            <div className="flex items-start gap-3">
                              <div style={{ flex: 1 }}>
                                <div
                                  className="flex items-center gap-2 flex-wrap"
                                  style={{ marginBottom: item.desc ? 6 : 0 }}
                                >
                                  <span
                                    style={{
                                      fontSize: 13,
                                      fontFamily: 'Space Mono',
                                      color: 'var(--text-primary)',
                                      letterSpacing: '0.03em',
                                    }}
                                  >
                                    {item.label}
                                  </span>
                                  {item.tag && (
                                    <span className={`tag tag-${item.tag}`}>
                                      {item.tag === 'problem'
                                        ? 'problem'
                                        : item.tag === 'solution'
                                          ? 'alternative'
                                          : 'context'}
                                    </span>
                                  )}
                                </div>
                                {item.desc && (
                                  <p
                                    style={{
                                      fontSize: 12,
                                      color: 'var(--text-secondary)',
                                      lineHeight: 1.7,
                                      margin: 0,
                                      fontFamily: 'Space Mono',
                                    }}
                                  >
                                    {item.desc}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        {section.ancient && (
                          <div className="px-4 pb-4">
                            <div className="callout">
                              <div
                                style={{
                                  fontSize: 10,
                                  letterSpacing: '0.18em',
                                  textTransform: 'uppercase',
                                  color: 'var(--accent)',
                                  fontFamily: 'Space Mono',
                                  marginBottom: 8,
                                }}
                              >
                                ancestral context
                              </div>
                              <p
                                className="font-display"
                                style={{
                                  fontSize: 14,
                                  color: 'var(--text-secondary)',
                                  lineHeight: 1.7,
                                  margin: 0,
                                  fontStyle: 'italic',
                                  fontWeight: 300,
                                }}
                              >
                                {section.ancient}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FieldNotes() {
  return (
    <div className="grain" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header
        style={{
          padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 60px) 32px',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            fontFamily: 'Space Mono',
            marginBottom: 16,
            opacity: 0.8,
          }}
          className="stagger-in stagger-1"
        >
          Field Notes — Issue 001
        </div>

        <h1
          className="font-display stagger-in stagger-2"
          style={{
            fontSize: 'clamp(36px, 7vw, 72px)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            margin: '0 0 20px',
            color: 'var(--text-primary)',
          }}
        >
          Human Health
          <br />
          <em
            style={{
              color: 'var(--text-secondary)',
              fontStyle: 'italic',
              fontWeight: 300,
            }}
          >
            & Daily Life
          </em>
        </h1>

        <hr className="header-rule stagger-in stagger-2" style={{ marginBottom: 20, maxWidth: 120 }} />

        <p
          className="stagger-in stagger-3"
          style={{
            fontSize: 'clamp(12px, 1.6vw, 14px)',
            color: 'var(--text-muted)',
            fontFamily: 'Space Mono',
            lineHeight: 1.8,
            maxWidth: 540,
            margin: '0 0 8px',
          }}
        >
          A reference index of common modern health problems — organised by the
          domains where mismatch between evolved biology and contemporary
          environment is most consequential. Click any category to expand.
        </p>

        <div
          className="stagger-in stagger-3 flex items-center gap-6 flex-wrap"
          style={{ marginTop: 24 }}
        >
          {(['problem', 'alternative', 'context'] as const).map((t) => (
            <div key={t} className="flex items-center gap-2">
              <span
                className={`tag ${t === 'problem' ? 'tag-problem' : t === 'alternative' ? 'tag-solution' : 'tag-info'}`}
              >
                {t}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: 'var(--text-muted)',
                  fontFamily: 'Space Mono',
                }}
              >
                {t === 'problem'
                  ? 'harmful item'
                  : t === 'alternative'
                    ? 'better option'
                    : 'ancestral info'}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* Main content */}
      <main
        style={{
          padding: '0 clamp(20px, 5vw, 60px) clamp(60px, 10vw, 120px)',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>

        {/* Footer */}
        <footer
          style={{
            marginTop: 80,
            paddingTop: 32,
            borderTop: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <p
                className="font-display"
                style={{
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  fontStyle: 'italic',
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                Information presented for educational purposes.
                <br />
                Consult a qualified practitioner before making health decisions.
              </p>
            </div>
            <div
              style={{
                fontSize: 10,
                color: 'var(--text-muted)',
                fontFamily: 'Space Mono',
                letterSpacing: '0.1em',
                textAlign: 'right',
              }}
            >
              ANTHROPOLOGY NOTES
              <br />
              <span style={{ opacity: 0.5 }}>prototype v0.1</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
