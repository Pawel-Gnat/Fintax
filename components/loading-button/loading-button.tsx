import { CSSProperties } from 'react';

import ClipLoader from 'react-spinners/ClipLoader';

import { Button } from '../ui/button';

const override: CSSProperties = {
  borderColor: 'var(--background) var(--background) transparent',
};

interface LoadingButtonProps {
  text: string;
  isLoading: boolean;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({ isLoading, text }) => {
  return (
    <Button type="submit" className={isLoading ? 'w-full opacity-60' : 'w-full'}>
      {isLoading ? <ClipLoader size={25} cssOverride={override} /> : text}
    </Button>
  );
};
