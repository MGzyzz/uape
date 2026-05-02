const FIELD_TO_TAGS = {
  'Server-Side Development': ['python', 'java', 'javascript', 'c#', 'c++', 'back_end'],
  'Building Websites': ['javascript', 'front_end', 'python'],
  'Data Analysis': ['python'],
  'Artificial Intelligence': ['python'],
  'Creating Mobile Apps': ['java', 'javascript', 'c#'],
  'Task Automation': ['python'],
  'Game Creation': ['c#', 'c++'],
  'Cloud & Infrastructure': ['python'],
  'Cybersecurity': ['python'],
  'UI Development': ['javascript', 'front_end'],
  'General Programming': ['python', 'java', 'javascript', 'c#', 'c++'],
}

const TAG_DISPLAY = {
  python: 'Python',
  javascript: 'JavaScript',
  java: 'Java',
  'c++': 'C++',
  cpp: 'C++',
  'c#': 'C#',
  csharp: 'C#',
  front_end: 'frontend',
  back_end: 'backend',
  algorithms: 'algorithms',
}

function unique(items) {
  return [...new Set(items.filter(Boolean))]
}

export function normalizeTagName(tag) {
  const value = String(tag ?? '').trim().replace(/^#/, '').toLowerCase()
  if (value === 'cpp') return 'c++'
  if (value === 'csharp') return 'c#'
  return value
}

export function tagDisplayName(tag) {
  const normalized = normalizeTagName(tag)
  return TAG_DISPLAY[normalized] ?? normalized
}

function tagsFromText(text) {
  const value = String(text ?? '').toLowerCase()
  const tags = []

  if (/\bpython\b/.test(value)) tags.push('python')
  if (/\bjava\s*script\b|\bjavascript\b|\bjs\b|\breact\b|\bnode\b/.test(value)) tags.push('javascript')
  if (/\bjava\b/.test(value) && !/\bjava\s*script\b|\bjavascript\b/.test(value)) tags.push('java')
  if (/c\+\+|\bcpp\b/.test(value)) tags.push('c++')
  if (/c#|\bcsharp\b/.test(value)) tags.push('c#')
  if (/\bfront[-_\s]?end\b|\bfrontend\b|\bhtml\b|\bcss\b|\bui\b|\bweb\b/.test(value)) tags.push('front_end')
  if (/\bback[-_\s]?end\b|\bbackend\b|\bserver\b|\bapi\b/.test(value)) tags.push('back_end')
  if (/\balgorithm|\bdata structure/.test(value)) tags.push('algorithms')

  return tags
}

export function getOnboardingRecommendationTags(onboarding) {
  const skills = Array.isArray(onboarding?.skills) ? onboarding.skills : []
  const skillTags = skills.flatMap(tagsFromText)
  const fieldTags = FIELD_TO_TAGS[onboarding?.field] ?? tagsFromText(onboarding?.field)
  const occupationTags = tagsFromText(onboarding?.occupation)

  return unique([...skillTags, ...fieldTags, ...occupationTags])
}

export function pickPrimaryTagFromChannels(channels, preferredTags) {
  const preferred = preferredTags.map(normalizeTagName)

  for (const preferredTag of preferred) {
    const hasMatchingChannel = channels.some((channel) =>
      channel.tags?.some((tag) => normalizeTagName(tag.name) === preferredTag)
    )
    if (hasMatchingChannel) return preferredTag
  }

  return normalizeTagName(channels[0]?.tags?.[0]?.name ?? preferred[0])
}
