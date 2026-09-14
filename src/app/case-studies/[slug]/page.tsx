import { stories } from "@/lib/catalog";
import { StoryPage } from "@/components/studio/Studio";
import { notFound } from "next/navigation";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);
  return {
    title: story
      ? `${story.name} — Flowcraft Concepts`
      : "Concept not found — Flowcraft",
    description: story?.solution,
  };
}
export function generateStaticParams() {
  return stories.map(({ slug }) => ({ slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) notFound();
  return <StoryPage story={story} />;
}
