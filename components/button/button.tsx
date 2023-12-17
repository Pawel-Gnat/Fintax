interface ButtonProps {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, icon }) => {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-2">
      {icon}
      {text}
    </button>
  );
};

export default Button;
