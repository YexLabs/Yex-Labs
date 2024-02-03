export const Button = ({ isLoading, children, isDisabled, ...props }: any) => {
  return (
    <div className={isLoading ? 'pointer-events-none' : ''}>
      <button {...props}>
        {isLoading && <span className="loading loading-spinner"></span>}
        {children}
      </button>
    </div>
  )
}
