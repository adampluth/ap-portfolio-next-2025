import { getProjectImages } from "@/lib/server/getProjectImages";
import { projectMetadata } from "@/lib/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";

interface ProjectPageProps {
  params: Promise<{ slug: string }>; // Make params a Promise
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params; // Await params before using slug

  const project = projectMetadata[slug as keyof typeof projectMetadata];
  if (!project) return notFound(); // Show 404 if project is not found

  // Fetch images on the server
  const images = await getProjectImages(slug);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Back Button */}
      <div className="fixed flex w-full">
        <Link href="/ui-ux">
          <button className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition">
            ← Back to Projects
          </button>
        </Link>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-20">
        {/* Project Details (Left Column - Sticky only on md and above) */}
        <div className="md:col-span-1 md:sticky md:top-20 self-start text-center">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <p className="text-lg text-gray-400">{project.company}</p>
          <p className="mt-2 text-gray-300">{project.description}</p>
        </div>

        {/* Image Gallery (Right Column - Scrolls) */}
        <div className="md:col-span-3 overflow-auto max-h-[80vh]">
          <ImageGallery images={images} title={project.title} />
        </div>
      </div>
    </div>
  );
}
