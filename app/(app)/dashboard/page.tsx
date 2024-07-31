import React from "react";
import { Download } from "lucide-react";

interface CloudinaryCardProps {
  title: string;
  description: string;
  imageUrl: string;
  originalSize: string;
  compressedSize: string;
}

const CloudinaryCard: React.FC<CloudinaryCardProps> = ({
  title,
  description,
  imageUrl,
  originalSize,
  compressedSize,
}) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="aspect-video">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm text-base-content opacity-70">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-xs">Original: {originalSize}</p>
            <p className="text-xs">Compressed: {compressedSize}</p>
          </div>
          <button className="btn btn-primary btn-sm">
            <Download size={16} className="mr-2" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

const dummyData: CloudinaryCardProps[] = [
  {
    title: "Sunset Beach",
    description: "Beautiful sunset on a tropical beach",
    imageUrl: "https://source.unsplash.com/random/800x600?beach",
    originalSize: "5.2 MB",
    compressedSize: "1.8 MB",
  },
  {
    title: "Mountain Vista",
    description: "Breathtaking view of snow-capped mountains",
    imageUrl: "https://source.unsplash.com/random/800x600?mountain",
    originalSize: "4.8 MB",
    compressedSize: "1.6 MB",
  },
  {
    title: "City Lights",
    description: "Vibrant nighttime cityscape",
    imageUrl: "https://source.unsplash.com/random/800x600?city",
    originalSize: "6.1 MB",
    compressedSize: "2.2 MB",
  },
  {
    title: "Forest Trail",
    description: "Serene path through a lush green forest",
    imageUrl: "https://source.unsplash.com/random/800x600?forest",
    originalSize: "5.5 MB",
    compressedSize: "1.9 MB",
  },
  {
    title: "Desert Dunes",
    description: "Golden sand dunes stretching to the horizon",
    imageUrl: "https://source.unsplash.com/random/800x600?desert",
    originalSize: "4.3 MB",
    compressedSize: "1.5 MB",
  },
  {
    title: "Ocean Waves",
    description: "Powerful waves crashing on rocky shores",
    imageUrl: "https://source.unsplash.com/random/800x600?ocean",
    originalSize: "5.8 MB",
    compressedSize: "2.0 MB",
  },
];

export default function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dummyData.map((item, index) => (
        <CloudinaryCard key={index} {...item} />
      ))}
    </div>
  );
}
