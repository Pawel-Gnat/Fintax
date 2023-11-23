'use client';

import { LuImagePlus } from 'react-icons/lu';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

interface ImageUploadProps {
  onChange: () => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = (result: any) => {
    console.log(result);
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
            onClick={() => open?.()}
            className="flex flex-col items-center rounded-lg border border-dashed p-10 transition-opacity hover:opacity-70"
          >
            <LuImagePlus size={20} />
            <p className="text-sm font-medium">Upload an Image</p>
            {value && (
              <div>
                <Image alt="Profile image" src={value} />
              </div>
            )}
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
