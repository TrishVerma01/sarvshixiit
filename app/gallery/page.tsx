import fs from "fs";
import path from "path";
import GalleryClient from "./GalleryClient";

export default function GalleryPage() {
    const galleryPath = path.join(process.cwd(), "public", "gallery");
    type Photo = { id: string; src: string; category: string; folder: string };
    let mappedPhotos: Photo[] = [];

    const names: Record<string, string> = {
       "jk": "Jammu & Kashmir",
       "uk": "Uttarakhand",
       "kerala": "Kerala",
       "arunachal": "Arunachal Pradesh"
    };

    if (fs.existsSync(galleryPath)) {
        const folders = fs.readdirSync(galleryPath);
        folders.forEach((folder) => {
            const folderPath = path.join(galleryPath, folder);
            if (fs.statSync(folderPath).isDirectory()) {
                const files = fs.readdirSync(folderPath);
                files.forEach((file) => {
                    if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                        mappedPhotos.push({
                            id: `${folder}-${file}`,
                            src: `/gallery/${folder}/${file}`,
                            category: names[folder] || folder,
                            folder: folder
                        });
                    }
                });
            }
        });
    }

    if (mappedPhotos.length === 0) {
        mappedPhotos = [
            { id: "pl-1", src: "/aaghaz.jpeg", category: "Jammu & Kashmir", folder: "jk" },
            { id: "pl-2", src: "/arunachal.jpg", category: "Arunachal Pradesh", folder: "arunachal" },
            { id: "pl-3", src: "/kerala.jpg", category: "Kerala", folder: "kerala" },
            { id: "pl-4", src: "/uttrakhand atl.jpeg", category: "Uttarakhand", folder: "uk" }
        ];
    }

    return (
        <GalleryClient initialData={mappedPhotos} />
    );
}
