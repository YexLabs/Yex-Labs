export const Button = ({ isLoading, children, isDisabled, ...props } : any) => {
  return (
    <button  {...props}>
      {isLoading && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  )
}
