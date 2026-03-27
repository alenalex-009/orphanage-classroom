import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getStoryById } from "@/lib/stories";
import { StoryReader } from "@/components/story-reader";

interface Props { params: Promise<{ id: string }> }

export default async function StoryPage({ params }: Props) {
  const { id } = await params;
  const story = getStoryById(id);
  if (!story) notFound();
  return (
    <div className="page-container">
      <Link href="/stories" className="inline-flex items-center gap-1.5 text-xs text-violet-600 font-bold hover:underline">
        <ArrowLeft className="w-3 h-3" />Back to Stories
      </Link>
      <StoryReader story={story} />
    </div>
  );
}
