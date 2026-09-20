import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const socialSchema = z.object({
  instagram: z.string().optional().default(''),
  linkedin: z.string().optional().default(''),
  website: z.string().optional().default(''),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    courseId: z.string(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    category: z.string(),
    format: z.enum(['Taller', 'Masterclass']),
    duration: z.string(),
    level: z.string(),
    youtubeId: z.string(),
    youtubeUrl: z.string().url(),
    thumbnail: z.string().url(),
    speakerId: z.string(),
    speakerSlug: z.string(),
    speakerName: z.string(),
    status: z.enum(['published', 'draft']).default('published'),
    featured: z.boolean().default(false),
    example: z.boolean().default(true),
  }),
});

const speakers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/speakers' }),
  schema: z.object({
    speakerId: z.string(),
    name: z.string(),
    title: z.string(),
    bio: z.string(),
    photo: z.string().optional().default(''),
    specialties: z.array(z.string()),
    email: z.string().optional().default(''),
    social: socialSchema.optional().default({}),
    canEditOwnProfile: z.boolean().default(true),
  }),
});

export const collections = { courses, speakers };
