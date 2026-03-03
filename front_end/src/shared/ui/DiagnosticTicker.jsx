import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  CompassIcon,
  MapIcon,
  UsersIcon,
  RoadIcon,
  GraphIcon,
  SparklesIcon,
  ClockIcon,
} from './DiagnosticTickerIcons.jsx'

const BASE_PILL_STYLE = {
  backgroundColor: '#0E1011',
  borderColor: '#FFFFFF1F',
  textColor: '#9BA2A9',
}

const ACTIVE_PILL_STYLES = [
  { backgroundColor: '#30A14E', borderColor: '#3EC35F', textColor: '#E8FFF0' },
  { backgroundColor: '#4183C4', borderColor: '#5A99D5', textColor: '#EAF5FF' },
  { backgroundColor: '#EB4823', borderColor: '#FF5A37', textColor: '#FFF0EB' },
  { backgroundColor: '#FEBE02', borderColor: '#FFD34D', textColor: '#342300' },
  { backgroundColor: '#30A14E3D', borderColor: '#30A14E', textColor: '#79E59C' },
  { backgroundColor: '#4183C43D', borderColor: '#4183C4', textColor: '#87C2F6' },
  { backgroundColor: '#E66A183D', borderColor: '#E66A18', textColor: '#FF8C6F' },
  { backgroundColor: '#FEBE023D', borderColor: '#FEBE02', textColor: '#FFD65C' },
]

const ORBIT_TEXT = 'DIAGNOSTICS \u2726 DETAILED \u2726 QUICK \u2726'
const PILL_WIDTH = 256
const CENTER_BLOCK_WIDTH = 220

const topRowItems = [
  { label: 'Random\nlearning paths', icon: CompassIcon },
  { label: 'No clear\nstarting point', icon: MapIcon },
  { label: 'Time-efficient\nlearning', icon: ClockIcon },
  { label: 'Personalized\nlearning path', icon: RoadIcon },
]

const bottomRowItems = [
  { label: 'Too much\nunnecessary content', icon: null },
  { label: 'One-size-fits-all\ncourses', icon: UsersIcon },
  { label: 'Clear progress\ntracking', icon: GraphIcon },
  { label: 'Adaptive\nrecommendations', icon: SparklesIcon },
]

function pickRandomPillStyle() {
  const randomIndex = Math.floor(Math.random() * ACTIVE_PILL_STYLES.length)
  return { ...ACTIVE_PILL_STYLES[randomIndex] }
}

function MovingPill({ item, index, total, rowOffset, rowTop, speed, frameWidth }) {
  const slot = 284
  const entryOffset = 220
  const startProgress = (index * slot + rowOffset) % (slot * total)
  const x = useMotionValue(startProgress - entryOffset)
  const progressRef = useRef(startProgress)
  const pillPhaseRef = useRef('before') // 'before' | 'inside' | 'after'
  const [pillStyle, setPillStyle] = useState(BASE_PILL_STYLE)

  useEffect(() => {
    if (!frameWidth) {
      return
    }

    const centerBlockLeftX = frameWidth / 2 - CENTER_BLOCK_WIDTH / 2
    const centerBlockRightX = frameWidth / 2 + CENTER_BLOCK_WIDTH / 2
    const currentX = x.get()
    const rightEdgePassedCenterRight = (currentX + PILL_WIDTH) >= centerBlockRightX
    const rightEdgeEnteredCenter = (currentX + PILL_WIDTH) > centerBlockLeftX

    if (rightEdgePassedCenterRight) {
      pillPhaseRef.current = 'after'
      setPillStyle(pickRandomPillStyle())
    } else if (rightEdgeEnteredCenter) {
      pillPhaseRef.current = 'inside'
      setPillStyle(BASE_PILL_STYLE)
    } else {
      pillPhaseRef.current = 'before'
      setPillStyle(BASE_PILL_STYLE)
    }
  }, [frameWidth])

  useAnimationFrame((_, delta) => {
    if (!frameWidth) {
      return
    }

    const loopLength = slot * total
    const frameShift = (speed * delta) / 1000
    let nextProgress = progressRef.current + frameShift

    while (nextProgress >= loopLength) {
      nextProgress -= loopLength
    }

    const wrapped = nextProgress < progressRef.current
    const nextX = nextProgress - entryOffset
    const centerBlockLeftX = frameWidth / 2 - CENTER_BLOCK_WIDTH / 2
    const centerBlockRightX = frameWidth / 2 + CENTER_BLOCK_WIDTH / 2
    const rightEdgeEnteredCenter = (nextX + PILL_WIDTH) > centerBlockLeftX
    const rightEdgePassedCenterRight = (nextX + PILL_WIDTH) >= centerBlockRightX

    if (wrapped) {
      pillPhaseRef.current = 'before'
      setPillStyle(BASE_PILL_STYLE)
    }

    if (!wrapped) {
      if (pillPhaseRef.current === 'before' && rightEdgeEnteredCenter) {
        pillPhaseRef.current = 'inside'
      }
      if (pillPhaseRef.current === 'inside' && rightEdgePassedCenterRight) {
        pillPhaseRef.current = 'after'
        setPillStyle(pickRandomPillStyle())
      }
    }

    progressRef.current = nextProgress
    x.set(nextX)
  })

  const [firstLine, secondLine] = item.label.split('\n')
  const Icon = item.icon

  return (
    <motion.div
      className="absolute left-0 flex h-17 w-64 items-center gap-2.5 overflow-hidden rounded-xl border px-4 text-left text-[20px] font-bold leading-7"
      style={{
        top: rowTop,
        x,
        backgroundColor: pillStyle.backgroundColor,
        borderColor: pillStyle.borderColor,
        color: pillStyle.textColor,
      }}
    >
      {Icon ? <Icon className="size-[18px] shrink-0" /> : null}
      <span className="block">
        {firstLine}
        <span className="block">{secondLine}</span>
      </span>
    </motion.div>
  )
}

function MovingRow({ items, rowTop, speed, rowOffset, frameWidth }) {
  const repeatedItems = useMemo(() => [...items, ...items], [items])

  return repeatedItems.map((item, index) => (
    <MovingPill
      key={`${rowTop}-${index}-${item.label}`}
      item={item}
      index={index}
      total={repeatedItems.length}
      rowOffset={rowOffset}
      rowTop={rowTop}
      speed={speed}
      frameWidth={frameWidth}
    />
  ))
}

function CenterDiagnosticBlock() {
  return (
    <div className="absolute left-1/2 top-1/2 z-20 isolate -translate-x-1/2 -translate-y-1/2">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ boxShadow: '0px 0px 250px 0px #EAF27C1F' }}
      />
      <div className="relative rounded-[56px] border border-[#FFFFFF1F] bg-[#0E1011] p-3">
        <div className="h-[220px] w-[220px] rounded-[32px] bg-[#0E1011] p-3">
          <div className="flex h-full w-full items-center justify-center rounded-[30px] bg-[radial-gradient(circle_at_28%_22%,#D3902B_0%,#B26E31_32%,#8F4E4A_62%,#6A617C_100%)]">
          <svg viewBox="0 0 200 200" className="uape-orbit-spin h-[176px] w-[176px]" aria-hidden="true">
            <defs>
              <path id="diagnostic-orbit-path" d="M100,100 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0" />
            </defs>
            <text fill="#FFFFFF" fontSize="14.5" letterSpacing="0.55" fontWeight="500">
              <textPath href="#diagnostic-orbit-path" startOffset="0%">
                {ORBIT_TEXT}
                {ORBIT_TEXT}
              </textPath>
            </text>
          </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

function DiagnosticTicker() {
  const frameRef = useRef(null)
  const [frameWidth, setFrameWidth] = useState(0)

  useEffect(() => {
    if (!frameRef.current) {
      return
    }

    const updateWidth = () => {
      if (!frameRef.current) {
        return
      }
      setFrameWidth(frameRef.current.clientWidth)
    }

    updateWidth()

    const observer = new ResizeObserver(updateWidth)
    observer.observe(frameRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="mt-12 w-full overflow-hidden rounded-[26px] bg-[#0E1011] px-2 py-4 sm:px-4">
      <div
        ref={frameRef}
        className="relative h-65 overflow-hidden rounded-[20px]"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}
      >
        <MovingRow items={topRowItems} rowTop={38} speed={46} rowOffset={24} frameWidth={frameWidth} />
        <MovingRow items={bottomRowItems} rowTop={122} speed={46} rowOffset={120} frameWidth={frameWidth} />
        <CenterDiagnosticBlock />
      </div>
    </div>
  )
}

export default DiagnosticTicker
