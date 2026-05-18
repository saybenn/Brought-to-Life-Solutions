// /components/home/showcase/ShowcaseLaptopFrame.tsx

import ShowcaseDeviceFrame from "@/components/home/showcase/ShowcaseDeviceFrame";

type ShowcaseLaptopFrameProps = {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
};

export default function ShowcaseLaptopFrame({
  src,
  alt,
  label,
  priority = false,
}: ShowcaseLaptopFrameProps) {
  return (
    <ShowcaseDeviceFrame
      variant="laptop"
      src={src}
      alt={alt}
      label={label}
      priority={priority}
    />
  );
}
