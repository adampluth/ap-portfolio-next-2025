import fs from "fs";
import path from "path";

// Map slugs to actual folder names
const projectFolderMap: Record<string, string> = {
  "solvent-extraction-digital-twin": "inl-bctc-dt",
  "magnet-autonomous-heat-pipe": "inl-magnet-dt",
  "nuclear-reactor-digital-twin": "inl-nnsa-dt",
  "sans-corporate-website": "sans-website",
  "sans-cybertalent": "sans-cybertalent",
  "rah-website": "rah-web",
  "rah-touchscreen-kiosks": "rah-ts",
  "aux-sable": "auxsable",
};

export async function getProjectImages(slug: string): Promise<string[]> {
  const folderName = projectFolderMap[slug];
  if (!folderName) {
    console.warn(`Warning: No folder mapping found for slug: ${slug}`);
    return [];
  }

  const projectPath = path.join(process.cwd(), "public/img", folderName);

  // Check if directory exists before reading it
  if (!fs.existsSync(projectPath)) {
    console.warn(`Warning: Image directory does not exist for ${slug} (${folderName})`);
    return []; // Return empty array if folder is missing
  }

  try {
    const files = fs.readdirSync(projectPath);

    // Filter out thumbnail files
    const filteredFiles = files.filter(file => 
      !file.match(/(_t\.png|_t\.jpg|-t\.png|-t\.jpg)$/i)
    );

    return filteredFiles.map((file) => `/img/${folderName}/${file}`);
  } catch (error) {
    console.error("Error reading images:", error);
    return [];
  }
}
