import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const seed = JSON.parse(
  readFileSync(join(root, 'src/data/seed-content.json'), 'utf8'),
);

function slugify(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const speakerByName = new Map();

for (const speaker of seed.speakers) {
  const name = speaker.name.trim();
  const slug = slugify(name);
  if (!speakerByName.has(name)) {
    speakerByName.set(name, {
      ...speaker,
      name,
      slug,
      specialties: [...speaker.specialties],
    });
  } else {
    const existing = speakerByName.get(name);
    for (const specialty of speaker.specialties) {
      if (!existing.specialties.includes(specialty)) existing.specialties.push(specialty);
    }
  }
}

mkdirSync(join(root, 'src/content/courses'), { recursive: true });
mkdirSync(join(root, 'src/content/speakers'), { recursive: true });

function yamlList(items) {
  return items.map((item) => `  - ${JSON.stringify(item)}`).join('\n');
}

for (const speaker of speakerByName.values()) {
  const body = `---
speakerId: ${JSON.stringify(speaker.id)}
name: ${JSON.stringify(speaker.name)}
title: ${JSON.stringify(speaker.title)}
bio: ${JSON.stringify(speaker.bio)}
photo: ${JSON.stringify(speaker.photo ?? '')}
specialties:
${yamlList(speaker.specialties)}
email: ${JSON.stringify(speaker.email ?? '')}
social:
  instagram: ${JSON.stringify(speaker.social?.instagram ?? '')}
  linkedin: ${JSON.stringify(speaker.social?.linkedin ?? '')}
  website: ${JSON.stringify(speaker.social?.website ?? '')}
canEditOwnProfile: ${speaker.canEditOwnProfile !== false}
---

${speaker.bio}
`;
  writeFileSync(join(root, 'src/content/speakers', `${speaker.slug}.md`), body);
}

for (const course of seed.courses) {
  const speakerName = course.speakerName.trim();
  const speaker = speakerByName.get(speakerName);
  if (!speaker) throw new Error(`Missing speaker for ${course.slug}: ${speakerName}`);
  const body = `---
courseId: ${JSON.stringify(course.id)}
title: ${JSON.stringify(course.title)}
subtitle: ${JSON.stringify(course.subtitle)}
description: ${JSON.stringify(course.description)}
category: ${JSON.stringify(course.category)}
format: ${JSON.stringify(course.format)}
duration: ${JSON.stringify(course.duration)}
level: ${JSON.stringify(course.level)}
youtubeId: ${JSON.stringify(course.youtubeId)}
youtubeUrl: ${JSON.stringify(course.youtubeUrl)}
thumbnail: ${JSON.stringify(course.thumbnail)}
speakerId: ${JSON.stringify(course.speakerId)}
speakerSlug: ${JSON.stringify(speaker.slug)}
speakerName: ${JSON.stringify(speaker.name)}
status: ${JSON.stringify(course.status)}
featured: ${course.featured}
example: true
---

${course.description}
`;
  writeFileSync(join(root, 'src/content/courses', `${course.slug}.md`), body);
}

console.log(`Wrote ${seed.courses.length} courses and ${speakerByName.size} speakers`);
