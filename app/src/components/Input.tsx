interface InputProps {
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function Input(props: InputProps) {
  const { type, value, onChange, placeholder } = props;
  return (
    <input
      className="border-2 border-gray-600 rounded-xl px-4 py-2"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
