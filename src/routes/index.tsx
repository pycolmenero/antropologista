import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import categoriesData from './categories.json'


export const Route = createFileRoute('/')({
  component: FieldNotes,
})

type SubItem = {
  label: string
  desc?: string
  tag?: 'problem' | 'solution' | 'info'
}

// ─── Types ───────────────────────────────────────────────────────────────────

type Tag = 'problem' | 'solution' | 'info'

type Item = {
  label: string
  desc?: string
  tag?: Tag
  chemicals?: string[]
  item?: string
}

type Section = {
  title: string
  items: Item[]
  ancient?: string
}

type Category = {
  id: string
  icon: string
  label: string
  tagline: string
  color: string
  summary: string
  sections: Section[]
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease',
        flexShrink: 0,
        color: 'var(--text-muted)',
      }}
    >
      <path
        d="M2 5l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Item Row ─────────────────────────────────────────────────────────────────

function ItemRow({ item }: { item: Item }) {
  return (
    <div className="item-row px-4 py-4">
      <div className="flex items-start gap-3">
        <div style={{ flex: 1 }}>

          {/* Label + tag */}
          <div
            className="flex items-center gap-2 flex-wrap"
            style={{ marginBottom: item.desc || item.chemicals || item.item ? 6 : 0 }}
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

          {/* Description */}
          {item.desc && (
            <p
              style={{
                fontSize: 12,
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                margin: 0,
                marginBottom: item.chemicals || item.item ? 8 : 0,
                fontFamily: 'Space Mono',
              }}
            >
              {item.desc}
            </p>
          )}

          {/* Chemicals */}
          {item.chemicals && item.chemicals.length > 0 && (
            <div
              className="flex flex-wrap gap-1"
              style={{ marginBottom: item.item ? 8 : 0 }}
            >
              {item.chemicals.map((chem) => (
                <span
                  key={chem}
                  style={{
                    fontSize: 10,
                    fontFamily: 'Space Mono',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    border: '1px solid var(--accent)',
                    borderRadius: 2,
                    padding: '2px 6px',
                    opacity: 0.75,
                  }}
                >
                  {chem}
                </span>
              ))}
            </div>
          )}

          {/* Item recommendation */}
          {item.item && (
            <div
              style={{
                fontSize: 11,
                fontFamily: 'Space Mono',
                color: 'var(--text-muted)',
                letterSpacing: '0.05em',
                borderLeft: '2px solid var(--accent)',
                paddingLeft: 8,
                opacity: 0.8,
              }}
            >
              ↳ {item.item}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

function SectionBlock({
  section,
  index,
  open,
  color,
  onToggle,
}: {
  section: Section
  index: number
  open: boolean
  color: string
  onToggle: () => void
}) {
  return (
    <div
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
          background: open ? 'rgba(232,220,200,0.03)' : 'transparent',
          borderBottom: open ? '1px solid var(--border)' : 'none',
          transition: 'background 0.2s ease',
        }}
        onClick={onToggle}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: open ? color : 'var(--text-secondary)',
            fontFamily: 'Space Mono',
            transition: 'color 0.2s ease',
          }}
        >
          {section.title}
        </span>
        <ChevronIcon open={open} />
      </div>

      {/* Section items */}
      <div className={`expanded-panel ${open ? 'open' : ''}`}>
        <div className="expanded-inner">
          <div>
            {section.items.map((item, ii) => (
              <ItemRow key={ii} item={item} />
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
  )
}

// ─── Category Card ────────────────────────────────────────────────────────────

function CategoryCard({ category, index }: { category: Category; index: number }) {
  const [open, setOpen] = useState(false)
  const [openSection, setOpenSection] = useState<number | null>(null)

  return (
    <div
      className={`category-card stagger-in stagger-${index + 1} ${open ? 'open' : ''}`}
      style={{ '--cat-color': category.color } as React.CSSProperties}
    >
      {/* Header */}
      <div
        className="flex items-center gap-5 px-6 py-5 select-none cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <div
          className="icon-ring"
          style={{
            color: category.color,
            borderColor: open ? `${category.color}40` : 'rgba(232,220,200,0.1)',
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
          <div style={{ background: 'var(--bg-expanded)' }} className="px-6 py-6">

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

            {/* Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {category.sections.map((section, si) => (
                <SectionBlock
                  key={si}
                  section={section}
                  index={si}
                  open={openSection === si}
                  color={category.color}
                  onToggle={() => setOpenSection(openSection === si ? null : si)}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

const categories = categoriesData as Category[]

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {categories.map((cat, i) => (
        <CategoryCard key={cat.id} category={cat} index={i} />
      ))}
    </div>
  )
}


// function ChevronIcon({ open }: { open: boolean }) {
//   return (
//     <svg
//       width="14"
//       height="14"
//       viewBox="0 0 14 14"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className={`chevron ${open ? 'rotated' : ''}`}
//       style={{ color: 'var(--text-muted)' }}
//     >
//       <path
//         d="M2 5L7 10L12 5"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   )
// }

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
