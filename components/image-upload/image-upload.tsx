'use client';

import { CSSProperties } from 'react';
import Image from 'next/image';
import { LuImagePlus } from 'react-icons/lu';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
  onChange?: (value: string) => void;
  imageSrc?: string;
}

const override: CSSProperties = {
  borderColor: 'var(--background) var(--background) transparent',
};

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, imageSrc }) => {
  const handleUpload = (result: any) => {
    if (onChange) onChange(result.info.secure_url);
  };

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="w1eikryb"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <button
            onClick={(e) => {
              e.preventDefault();
              open?.();
            }}
            className="relative flex aspect-square min-w-[15rem] flex-col items-center justify-center rounded-lg border border-dashed transition-opacity hover:opacity-70"
          >
            <LuImagePlus size={20} />
            <p className="text-sm font-medium">Upload an Image</p>
            {imageSrc && (
              <div className="absolute inset-0 h-full w-full">
                <Image
                  alt="Profile image"
                  src={imageSrc}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
