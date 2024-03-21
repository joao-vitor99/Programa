interface InputErrorProps {
  errorMessage?: string;
}

const InputError = (props: InputErrorProps) => {
  if (props?.errorMessage?.length) {
    return (
      <div className="text-xs text-red3 font-bold pt-2">
        {props.errorMessage}
      </div>
    );
  }

  return null;
};

export default InputError;
