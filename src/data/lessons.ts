export type LessonAudience = 'visiting' | 'weekly'

export type LessonCategory = 'solo' | 'group' | 'weekly'

export type Lesson = {
  id: string
  audience: LessonAudience
  type: string
  summaryLabel: string
  duration: string
  price: number
  priceLabel: string
  groupSize: string | null
  category: LessonCategory
  description: string
  ctaLabel: string
}

export const lessons: Lesson[] = [
  {
    id: 'beach-lesson',
    audience: 'visiting',
    type: 'Beach Lesson',
    summaryLabel: 'Private beach ukulele lesson',
    duration: '30 minutes',
    price: 35,
    priceLabel: '$35',
    groupSize: '1 person',
    category: 'solo',
    description:
      'Private 30-minute ukulele session by the ocean. A relaxed introduction to music in a peaceful outdoor setting.',
    ctaLabel: 'Book this beach lesson',
  },
  {
    id: 'extended-beach-session',
    audience: 'visiting',
    type: 'Extended Beach Session',
    summaryLabel: 'Extended private beach session',
    duration: '1 hour',
    price: 60,
    priceLabel: '$60',
    groupSize: '1 person',
    category: 'solo',
    description:
      'One full hour with more time to explore techniques, rhythm, and playing a complete song.',
    ctaLabel: 'Book this beach lesson',
  },
  {
    id: 'group-2-3',
    audience: 'visiting',
    type: 'Group Lesson',
    summaryLabel: 'Small group beach lesson',
    duration: '1 hour',
    price: 80,
    priceLabel: '$80',
    groupSize: '2-3 people',
    category: 'group',
    description:
      'A shared beach experience for couples, families, or small groups traveling together. Total group price. Perfect for couples or close friends.',
    ctaLabel: 'Book this beach lesson',
  },
  {
    id: 'group-4-5',
    audience: 'visiting',
    type: 'Group Lesson',
    summaryLabel: 'Family beach lesson',
    duration: '1 hour',
    price: 100,
    priceLabel: '$100',
    groupSize: '4-5 people',
    category: 'group',
    description:
      'A shared beach experience for couples, families, or small groups traveling together. Total group price. Great for families traveling together.',
    ctaLabel: 'Book this beach lesson',
  },
  {
    id: 'group-6-8',
    audience: 'visiting',
    type: 'Group Lesson',
    summaryLabel: 'Large group beach lesson',
    duration: '1 hour',
    price: 120,
    priceLabel: '$120',
    groupSize: '6-8 people',
    category: 'group',
    description:
      'A shared beach experience for couples, families, or small groups traveling together. Total group price for a shared musical experience.',
    ctaLabel: 'Book this beach lesson',
  },
  {
    id: 'weekly-private-30',
    audience: 'weekly',
    type: 'Weekly Private Lessons',
    summaryLabel: 'Weekly private lesson',
    duration: '30 minutes',
    price: 35,
    priceLabel: '$35',
    groupSize: null,
    category: 'weekly',
    description:
      'Ongoing instruction with clear structure, consistent pacing, and long-term growth.',
    ctaLabel: 'Start weekly lessons',
  },
  {
    id: 'weekly-extended-60',
    audience: 'weekly',
    type: 'Extended Weekly Lesson',
    summaryLabel: 'Extended weekly lesson',
    duration: '1 hour',
    price: 60,
    priceLabel: '$60',
    groupSize: null,
    category: 'weekly',
    description:
      'Extra time for deeper focus on technique, musical understanding, and repertoire.',
    ctaLabel: 'Start weekly lessons',
  },
]

export function getLessonsByAudience(audience: LessonAudience) {
  return lessons.filter((lesson) => lesson.audience === audience)
}

export function getLessonById(id: string) {
  return lessons.find((lesson) => lesson.id === id)
}

export function getGroupOptions() {
  return lessons.filter((lesson) => lesson.category === 'group')
}
