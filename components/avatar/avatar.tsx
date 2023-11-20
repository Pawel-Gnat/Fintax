import { Avatar as AvatarUI, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AvatarProps {
  image: string | null | undefined;
  name: string;
  surname: string;
}

const Avatar: React.FC<AvatarProps> = ({ image, name, surname }) => {
  const transformUserDetails = (name: string, surname: string) => {
    return `${name.charAt(0).toUpperCase()}${surname.charAt(0).toUpperCase()}`;
  };

  return (
    <AvatarUI>
      {image && <AvatarImage src={image} alt="" aria-hidden="true" />}
      <AvatarFallback>{transformUserDetails(name, surname)}</AvatarFallback>
    </AvatarUI>
  );
};

export default Avatar;
