// /components/home/showcase/ShowcaseTabletFrame.tsx

import ShowcaseDeviceFrame from "@/components/home/showcase/ShowcaseDeviceFrame";

type ShowcaseTabletFrameProps = {
  src: string;
  alt: string;
  label: string;
  className?: string;
};

export default function ShowcaseTabletFrame({
  src,
  alt,
  label,
  className,
}: ShowcaseTabletFrameProps) {
  return (
    <ShowcaseDeviceFrame
      variant="tablet"
      src={src}
      alt={alt}
      label={label}
      className={className}
    />
  );
}
