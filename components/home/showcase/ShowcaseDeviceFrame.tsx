// components/home/showcase/ShowcaseDeviceFrame.tsx

import Image from "next/image";

type ShowcaseDeviceFrameProps = {
  src: string;
  alt: string;
  label?: string;
  variant: "laptop" | "tablet" | "phone";
  className?: string;
  priority?: boolean;
};

export default function ShowcaseDeviceFrame({
  src,
  alt,
  label,
  variant,
  className = "",
  priority = false,
}: ShowcaseDeviceFrameProps) {
  return (
    <figure
      className={`showcase-device showcase-device--${variant} ${className}`}
    >
      <div className="showcase-device__bezel">
        {label ? (
          <figcaption className="showcase-device__label">{label}</figcaption>
        ) : null}

        <div className="showcase-device__screen">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={
              variant === "laptop"
                ? "(min-width: 1024px) 52vw, 92vw"
                : "(min-width: 1024px) 24vw, 74vw"
            }
            className="showcase-device__image"
          />
        </div>
      </div>
    </figure>
  );
}
