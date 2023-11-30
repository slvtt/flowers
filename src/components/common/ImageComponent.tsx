import React, { FC, useEffect, useState } from "react";
import { Image } from "src/ui/Image/Image";
import { StaticImageData } from "next/image";

export type ImageComponentProps = {
  width?: number;
  height?: number;
  imgSrc: string;
  quality?: number;
  alt?: string;
  isRounded?: boolean;
};

const ImageComponent: FC<ImageComponentProps> = ({
  width = 180,
  imgSrc,
  height = 180,
  quality = 30,
  alt = "Фото товара",
  isRounded,
}) => {
  const [src, setSrc] = useState<StaticImageData | string>(imgSrc);

  // временное решение, в отзывах при сортировке не меняется аватарка из-за кеширования
  useEffect(() => {
    setSrc(imgSrc);
  }, [imgSrc]);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      quality={quality}
      height={height}
      loading="lazy"
      style={{ objectFit: "cover"}}
      onError={() => setSrc("")}
    />
  );
};

export default ImageComponent;
