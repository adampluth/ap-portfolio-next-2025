import { getProjectImages } from "@/lib/server/getProjectImages";
import { projectMetadata } from "@/lib/projects";
import { notFound } from "next/navigation";
import ProjectUI from "@/components/ProjectUI";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectMetadata[slug as keyof typeof projectMetadata];
  if (!project) return notFound();

  const images = await getProjectImages(slug);

  return <ProjectUI project={project} images={images} />;
}
