import React from "react";
import Link from "next/link";
import { Upload, Crop, Video, Wand2 } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        {icon}
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Cloudinary Showcase
            </span>
          </h1>
          <p className="py-6 text-lg">
            Unleash the power of AI to transform your media content. Upload,
            preview, and enhance your videos and images with cutting-edge
            technology.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <FeatureCard
              icon={<Upload className="w-8 h-8 text-primary" />}
              title="Smart Upload"
              description="AI-powered upload and organization"
            />
            <FeatureCard
              icon={<Video className="w-8 h-8 text-secondary" />}
              title="Video Preview"
              description="Instant AI-generated video previews"
            />
            <FeatureCard
              icon={<Crop className="w-8 h-8 text-accent" />}
              title="Intelligent Cropping"
              description="AI-driven image cropping and resizing"
            />
            <FeatureCard
              icon={<Wand2 className="w-8 h-8 text-info" />}
              title="Magic Enhancement"
              description="One-click AI enhancements for your media"
            />
          </div>
          <Link href="/sign-in" className="btn btn-primary btn-lg">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
