import { twMerge } from "tailwind-merge";

interface ButtonProps {
  type: keyof typeof variant;
  children: React.ReactNode;
  onClick: () => void;
}

const variant = {
  default: "bg-slate-500 hover:ring-slate-500  hover:text-slate-500",
  destructive: "bg-red-500 hover:ring-red-500  hover:text-red-500",
};

export default function Button(props: ButtonProps) {
  const { type, children, onClick } = props;
  {
    return (
      <button
        className={twMerge(
          variant[type],
          "text-white px-4 py-3 rounded-xl font-medium text-lg hover:ring-2 hover:bg-white flex items-center gap-2"
        )}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}
