import { useState } from "react";

interface ProjectImageProps {
  image: string;
  name: string;
}

/** Renders the project screenshot, falling back to a styled placeholder on load failure. */
export function ProjectImage({ image, name }: ProjectImageProps) {
  const [hasErrored, setHasErrored] = useState(false);

  if (hasErrored) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#FFD2A6]">
        <span className="font-serif text-3xl text-[#121826]/20">{name}</span>
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={`${name} preview`}
      loading="lazy"
      decoding="async"
      width={1600}
      height={1000}
      onError={() => setHasErrored(true)}
      className="h-full w-full object-cover"
    />
  );
}
