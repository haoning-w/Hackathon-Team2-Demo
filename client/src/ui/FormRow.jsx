function FormRow({ label, error, children }) {
  return (
    <div className="flex py-5 gap-10 mt-4 items-center h-16">
      {label && (
        <label className="font-large w-[64px]" htmlFor={children.props.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="w-1/4 text-lg text-[#b91c1c]">{error}</span>}
    </div>
  );
}

export default FormRow;
