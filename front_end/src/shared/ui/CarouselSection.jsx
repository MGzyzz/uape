// src/shared/ui/CarouselSection.jsx
import { useState } from 'react'
import arrowLeftIcon from '../assets/icons/arrow-left.svg'
import arrowRightIcon from '../assets/icons/arrow-right.svg'

function NavArrows({ onPrev, onNext, canPrev, canNext }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <button
        type="button"
        onClick={canPrev ? onPrev : undefined}
        aria-disabled={!canPrev}
        className={`uape-learn-nav-arrow-btn${canPrev ? '' : ' uape-learn-nav-arrow-btn-disabled'}`}
        aria-label="Previous"
      >
        <img src={arrowLeftIcon} alt="" width={11} height={17} />
      </button>
      <button
        type="button"
        onClick={canNext ? onNext : undefined}
        aria-disabled={!canNext}
        className={`uape-learn-nav-arrow-btn${canNext ? '' : ' uape-learn-nav-arrow-btn-disabled'}`}
        aria-label="Next"
      >
        <img src={arrowRightIcon} alt="" width={11} height={17} />
      </button>
    </div>
  )
}

export default function CarouselSection({ title, subtitle, items, renderCard, perPage = 3 }) {
  const [idx, setIdx] = useState(0)
  const safeIdx = Math.min(idx, Math.max(0, items.length - perPage))
  const canPrev = safeIdx > 0
  const canNext = safeIdx + perPage < items.length
  const visible = items.slice(safeIdx, safeIdx + perPage)
  const rowClassName = `uape-learn-cards-row${visible.length === perPage ? ' uape-learn-cards-row-full' : ''}`

  return (
    <div className="uape-learn-section">
      <div className="uape-learn-section-header flex items-start justify-between">
        <div>
          <h2 className="uape-learn-section-title">{title}</h2>
          {subtitle && <p className="uape-learn-section-subtitle">{subtitle}</p>}
        </div>
        <NavArrows
          onPrev={() => setIdx(Math.max(0, safeIdx - 1))}
          onNext={() => setIdx(Math.min(items.length - perPage, safeIdx + 1))}
          canPrev={canPrev}
          canNext={canNext}
        />
      </div>
      <div className={rowClassName}>
        {visible.map((item) => (
          <div key={item.id} className="uape-carousel-card-wrapper">
            {renderCard(item)}
          </div>
        ))}
      </div>
    </div>
  )
}
