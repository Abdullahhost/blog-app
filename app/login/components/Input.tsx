import clsx from "clsx";

interface IInputProps {
  name: string;
  type: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: boolean;
  fullwidth?: boolean;
  disabled?: boolean;
}

const Input: React.FC<IInputProps> = ({
  name,
  type,
  placeholder,
  onChange,
  fullwidth,
  disabled,
  errors,
}) => {
  return (
    <div
      className={clsx(`
        ${fullwidth && "w-full"}
        `)}
    >
      <input
        className="py-[14px] px-[10px] text-[12px] 
                   setTextStyle w-full rounded-[6px]  
                   border-t border-l border-r bg-[0007] 
                   shadow-md bg-slate-50 ring-2 
                   focus:ring-green-200  outline-none 
                   hover:ring-offset-2 ring-slate-50 
                   dark:bg-[#333] dark:border-none 
                   dark:ring-0"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
