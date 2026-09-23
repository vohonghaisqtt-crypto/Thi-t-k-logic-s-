import fs from "fs";
import path from "path";
import { Lesson, HeadingNode } from "@/lib/types";
import { curriculum } from "@/data/curriculum";
import { slugify } from "@/lib/utils";

// Re-export slugify for backward compatibility
export { slugify };

export function extractHeadings(markdown: string): HeadingNode[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: HeadingNode[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);
    headings.push({ id, text, level });
  }

  return headings;
}

const lessonFileMap: Record<string, string> = {
  "he-dem": "01-he-dem.md",
  "dai-so-boole": "02-dai-so-boole.md",
  "karnaugh": "03-karnaugh.md",
  "mach-to-hop": "04-mach-to-hop.md",
  "mach-so-hoc": "05-mach-so-hoc.md",
  "mach-tuan-tu": "06-mach-tuan-tu.md",
  "counter-register": "07-counter-register.md",
  "verilog-co-ban": "08-verilog-co-ban.md",
  "verilog-behavioral": "09-verilog-behavioral.md",
  "fsm": "10-fsm.md",
  "mo-phong-ise": "11-mo-phong-ise.md",
};

export function getLessonRawContent(slug: string): string {
  const fileName = lessonFileMap[slug];
  if (!fileName) return "";
  try {
    const filePath = path.join(process.cwd(), "content", "lessons", fileName);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf-8");
    }
  } catch (error) {
    console.error(`Error reading lesson file for ${slug}:`, error);
  }
  return "";
}

export function getAllLessons(): Lesson[] {
  return curriculum.map((c) => {
    const rawContent = getLessonRawContent(c.slug);
    const headings = extractHeadings(rawContent);

    return {
      slug: c.slug,
      order: c.order,
      title: c.title,
      description: c.description,
      estimatedMinutes: c.estimatedMinutes,
      prerequisiteSlugs: c.prerequisites,
      headings,
      tags: [c.category],
      content: rawContent,
      objectives: c.objectives || [],
    };
  });
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  const all = getAllLessons();
  return all.find((l) => l.slug === slug);
}

export function getAdjacentLessons(slug: string): {
  prev?: Lesson;
  next?: Lesson;
} {
  const all = getAllLessons();
  const index = all.findIndex((l) => l.slug === slug);
  if (index === -1) return {};

  return {
    prev: index > 0 ? all[index - 1] : undefined,
    next: index < all.length - 1 ? all[index + 1] : undefined,
  };
}
