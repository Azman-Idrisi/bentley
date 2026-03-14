export default function CTAButton({ children = 'EXPLORE MODEL', className = '', ...props }) {
  return (
    <button
      className={`text-[14px] font-bold uppercase text-[#0B1C13] bg-[#2AF47C] border-none rounded-[10px] cursor-pointer max-sm:w-full ${className}`}
      style={{
        letterSpacing: '0.08em',
        fontFamily: 'Montserrat, sans-serif',
        padding: '14px 36px',
        boxShadow: '0 0 40px rgba(42, 244, 124, 0.25)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)'
        e.currentTarget.style.boxShadow = '0 0 60px rgba(42, 244, 124, 0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 0 40px rgba(42, 244, 124, 0.25)'
      }}
      {...props}
    >
      {children}
    </button>
  )
}
