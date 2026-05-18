// /components/home/showcase/ShowcasePhoneFrame.tsx

import ShowcaseDeviceFrame from "@/components/home/showcase/ShowcaseDeviceFrame";

type ShowcasePhoneFrameProps = {
  src: string;
  alt: string;
  label: string;
  className?: string;
};

export default function ShowcasePhoneFrame({
  src,
  alt,
  label,
  className,
}: ShowcasePhoneFrameProps) {
  return (
    <ShowcaseDeviceFrame
      variant="phone"
      src={src}
      alt={alt}
      label={label}
      className={className}
    />
  );
}
