import ThumbGallery from "@/components/ThumbGallery";

export default function Home() {
  
  return (
    <section className="w-full items-center justify-center">
      <div
        className="mt-24 text-center"
      >
        <h1 className="text-5xl font-bold">Welcome to My Portfolio</h1>
        <p className="mt-4 text-lg text-gray-300">
          Digital Twin Visualization, Software Engineering, &amp; Cybersecurity Applications
        </p>
      </div>
      <ThumbGallery />
    </section>
  );
}
