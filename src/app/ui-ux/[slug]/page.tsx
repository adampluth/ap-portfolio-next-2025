import { getProjectImages } from "@/lib/getProjectImages";
import { projectMetadata } from "@/lib/projects";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = projectMetadata[slug as keyof typeof projectMetadata]; // Fetch metadata

  if (!project) return notFound(); // Show 404 if project is not in metadata

  const images = await getProjectImages(slug); // Dynamically fetch images

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

      {/* Main Featured Image */}
      {images.length > 0 && (
        <div className="mb-6 max-h-[800px] overflow-hidden rounded-lg shadow-lg">
          <NextImage 
            src={images[0]} 
            alt={project.title} 
            width={800} 
            height={500} 
            className="w-full"
          />
        </div>
      )}

      {/* Additional Images */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.slice(1).map((img, index) => (
          <NextImage
            key={index}
            src={img}
            alt={`${project.title} screenshot ${index + 1}`}
            width={300}
            height={200}
            className="w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          />
        ))}
      </div>
    </div>
  );
}
