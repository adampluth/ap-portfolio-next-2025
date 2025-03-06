import { getProjectImages } from "@/lib/server/getProjectImages"; // ✅ Server function
import { projectMetadata } from "@/lib/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery"; // ✅ Client Component

interface ProjectPageProps {
  params: { slug: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;

  const project = projectMetadata[slug as keyof typeof projectMetadata];
  if (!project) return notFound(); // Show 404 if project is not found

  // ✅ Fetch images on the server
  const images = await getProjectImages(slug);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Back Button */}
      <Link href="/ui-ux">
        <button className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition">
          ← Back to Projects
        </button>
      </Link>

      {/* Project Details */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="text-lg text-gray-400">{project.company}</p>
        <p className="mt-2 text-gray-300">{project.description}</p>
      </div>

      {/* ✅ Pass Images to Client Component */}
      <ImageGallery images={images} title={project.title} />
    </div>
  );
}
