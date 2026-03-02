import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

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
  { backgroundColor: '#EB48233D', borderColor: '#EB4823', textColor: '#FF8C6F' },
  { backgroundColor: '#FEBE023D', borderColor: '#FEBE02', textColor: '#FFD65C' },
]

const ORBIT_TEXT = 'DIAGNOSTICS \u2726 DETAILED \u2726 QUICK \u2726'

function CompassIcon(props) {
  return (
    <svg viewBox="-14 0 30 36" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 33C-7.28428 33 -14 26.2842 -14 18C-14 9.71572 -7.28428 3 1 3C9.2842 3 16 9.71572 16 18C16 26.2842 9.2842 33 1 33ZM6.25 12.75L-1.25 15.75L-4.25 23.25L3.25 20.25L6.25 12.75Z"
        fill="currentColor"
      />
    </svg>
  )
}

function MapIcon(props) {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" {...props}>
      <path
        d="M25.4245 17.9246C28.102 15.2472 29.0313 11.4834 28.2122 8.05194L31.9545 6.44805C32.3354 6.28488 32.7762 6.46124 32.9394 6.84197C32.9793 6.93533 33 7.03584 33 7.13741V28.5L22.5 33L13.5 28.5L4.04544 32.552C3.66471 32.7152 3.22382 32.5388 3.06065 32.1581C3.02063 32.0648 3 31.9641 3 31.8626V10.5L7.69338 8.48856C7.05034 11.7995 8.01101 15.3603 10.5754 17.9246L18 25.3493L25.4245 17.9246ZM23.3032 15.8033L18 21.1067L12.6967 15.8033C9.76776 12.8744 9.76776 8.12564 12.6967 5.19671C15.6257 2.26776 20.3743 2.26776 23.3032 5.19671C26.2323 8.12564 26.2323 12.8744 23.3032 15.8033Z"
        fill="currentColor"
      />
    </svg>
  )
}

function UsersIcon(props) {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 33C3 26.3725 8.37258 21 15 21C21.6275 21 27 26.3725 27 33H3ZM15 19.5C10.0275 19.5 6 15.4725 6 10.5C6 5.5275 10.0275 1.5 15 1.5C19.9725 1.5 24 5.5275 24 10.5C24 15.4725 19.9725 19.5 15 19.5ZM26.0442 22.8498C30.6723 24.0326 34.1519 28.0853 34.4754 33H30C30 29.0853 28.5003 25.5208 26.0442 22.8498ZM23.0102 19.4353C25.4592 17.2383 27 14.0491 27 10.5C27 8.37399 26.4471 6.37711 25.4773 4.6453C28.9129 5.33096 31.5 8.36198 31.5 12C31.5 16.1438 28.1437 19.5 24 19.5C23.6644 19.5 23.334 19.4779 23.0102 19.4353Z"
        fill="currentColor"
      />
    </svg>
  )
}

function RoadIcon(props) {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 22.5V12.75C6 9.02208 9.02208 6 12.75 6C16.478 6 19.5 9.02208 19.5 12.75V23.25C19.5 25.3211 21.1789 27 23.25 27C25.3211 27 27 25.3211 27 23.25V13.2439C25.2522 12.6262 24 10.9593 24 9C24 6.51472 26.0147 4.5 28.5 4.5C30.9853 4.5 33 6.51472 33 9C33 10.9593 31.7478 12.6262 30 13.2439V23.25C30 26.978 26.978 30 23.25 30C19.522 30 16.5 26.978 16.5 23.25V12.75C16.5 10.6789 14.8211 9 12.75 9C10.6789 9 9 10.6789 9 12.75V22.5H13.5L7.5 30L1.5 22.5H6Z"
        fill="currentColor"
      />
    </svg>
  )
}

function GraphIcon(props) {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.5 4.5V28.5H31.5V31.5H4.5V4.5H7.5ZM30.4394 9.43933L32.5606 11.5607L24 20.1213L19.5 15.6225L13.0607 22.0606L10.9393 19.9394L19.5 11.3787L24 15.8775L30.4394 9.43933Z"
        fill="currentColor"
      />
    </svg>
  )
}

function SparklesIcon(props) {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" {...props}>
      <path
        d="M15.9216 26.6934L17.238 23.6781C18.4096 20.9949 20.5184 18.8589 23.1488 17.6913L26.7723 16.0829C27.9243 15.5715 27.9243 13.8955 26.7723 13.3842L23.2619 11.8259C20.5638 10.6283 18.4173 8.41322 17.2657 5.63841L15.9323 2.4251C15.4374 1.23265 13.7898 1.23265 13.295 2.4251L11.9614 5.63838C10.8099 8.41322 8.66329 10.6283 5.96527 11.8259L2.45487 13.3842C1.3028 13.8955 1.3028 15.5715 2.45487 16.0829L6.07845 17.6913C8.70883 18.8589 10.8176 20.9949 11.9891 23.6781L13.3056 26.6934C13.8116 27.8523 15.4155 27.8523 15.9216 26.6934ZM29.1021 34.0349L29.4723 33.1863C30.1323 31.6734 31.3211 30.4688 32.8043 29.8098L33.9449 29.3029C34.5618 29.0289 34.5618 28.1324 33.9449 27.8583L32.8682 27.3798C31.3467 26.7039 30.1367 25.4547 29.4879 23.8904L29.1078 22.9734C28.8428 22.3344 27.9593 22.3344 27.6942 22.9734L27.3141 23.8904C26.6655 25.4547 25.4555 26.7039 23.934 27.3798L22.8572 27.8583C22.2404 28.1324 22.2404 29.0289 22.8572 29.3029L23.9977 29.8098C25.4811 30.4688 26.6697 31.6734 27.3297 33.1863L27.7001 34.0349C27.971 34.656 28.8311 34.656 29.1021 34.0349Z"
        fill="currentColor"
      />
    </svg>
  )
}

const topRowItems = [
  { label: 'Random\nlearning paths', icon: CompassIcon },
  { label: 'No clear\nstarting point', icon: MapIcon },
  { label: 'Time-efficient\nlearning', icon: null },
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
  const slot = 198
  const entryOffset = 220
  const startProgress = (index * slot + rowOffset) % (slot * total)
  const x = useMotionValue(startProgress - entryOffset)
  const progressRef = useRef(startProgress)
  const passedCenterRef = useRef(false)
  const [pillStyle, setPillStyle] = useState(BASE_PILL_STYLE)

  useEffect(() => {
    if (!frameWidth) {
      return
    }

    const gateX = frameWidth / 2 + 112
    const currentX = x.get()

    if (currentX >= gateX) {
      passedCenterRef.current = true
      setPillStyle(pickRandomPillStyle())
      return
    }

    passedCenterRef.current = false
    setPillStyle(BASE_PILL_STYLE)
  }, [frameWidth, x])

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
    const gateX = frameWidth / 2 + 112

    if (wrapped) {
      passedCenterRef.current = false
      setPillStyle(BASE_PILL_STYLE)
    }

    if (!passedCenterRef.current && nextX >= gateX) {
      passedCenterRef.current = true
      setPillStyle(pickRandomPillStyle())
    }

    progressRef.current = nextProgress
    x.set(nextX)
  })

  const [firstLine, secondLine] = item.label.split('\n')
  const Icon = item.icon

  return (
    <motion.div
      className="absolute left-0 flex h-[42px] w-[184px] items-center gap-2.5 rounded-xl border px-4 text-left text-[14px] leading-tight"
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
    <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
      <div className="relative h-[220px] w-[220px] rounded-[32px] border border-[#2B3A4466] bg-[#0E1011C2] p-3">
        <div className="flex h-full w-full items-center justify-center rounded-[30px] bg-[radial-gradient(circle_at_28%_22%,#D3902B_0%,#B26E31_32%,#8F4E4A_62%,#6A617C_100%)]">
          <svg viewBox="0 0 200 200" className="uape-orbit-spin h-[176px] w-[176px]" aria-hidden="true">
            <defs>
              <path id="diagnostic-orbit-path" d="M100,100 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0" />
            </defs>
            <text fill="#FFFFFF" fontSize="14.5" letterSpacing="0.55" fontWeight="500">
              <textPath href="#diagnostic-orbit-path" startOffset="0%">
  {ORBIT_TEXT}{ORBIT_TEXT}
</textPath>
            </text>
          </svg>
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
      <div ref={frameRef} className="relative h-[228px] overflow-hidden rounded-[20px]"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
      }}>
        <MovingRow items={topRowItems} rowTop={56} speed={46} rowOffset={24} frameWidth={frameWidth} />
        <MovingRow items={bottomRowItems} rowTop={118} speed={46} rowOffset={120} frameWidth={frameWidth} />
        <CenterDiagnosticBlock />
      </div>
    </div>
  )
}

export default DiagnosticTicker
