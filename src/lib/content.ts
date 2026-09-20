import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Course = CollectionEntry<'courses'>;
export type Speaker = CollectionEntry<'speakers'>;

export async function getPublishedCourses(): Promise<Course[]> {
  const courses = await getCollection('courses', ({ data }) => data.status === 'published');
  return courses.sort((a, b) => a.data.courseId.localeCompare(b.data.courseId));
}

export async function getFeaturedCourses(): Promise<Course[]> {
  const courses = await getPublishedCourses();
  return courses.filter((course) => course.data.featured);
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  return getEntry('courses', slug);
}

export async function getSpeakers(): Promise<Speaker[]> {
  const speakers = await getCollection('speakers');
  return speakers.sort((a, b) => a.data.name.localeCompare(b.data.name, 'es'));
}

export async function getSpeakerBySlug(slug: string): Promise<Speaker | undefined> {
  return getEntry('speakers', slug);
}

export async function getCoursesBySpeaker(speakerSlug: string): Promise<Course[]> {
  const courses = await getPublishedCourses();
  return courses.filter((course) => course.data.speakerSlug === speakerSlug);
}

export function youtubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}`;
}

export function youtubeWatchUrl(youtubeId: string): string {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

export function truncate(text: string, max = 140): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}

export function speakerInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter((part) => /[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(part[0] ?? ''))
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('');
}

export const SITE = {
  name: 'Hello Menopausia',
  product: 'Cursos y Talleres',
  title: 'Hello Menopausia — Cursos y Talleres',
  description:
    'Cursos y talleres para acompañar a las mujeres en la menopausia. Masterclasses de especialistas en salud, nutrición y bienestar.',
  url: 'https://www.hellomenopausia.com',
  email: 'partners@hellomenopausia.com',
  locale: 'es-MX',
} as const;
