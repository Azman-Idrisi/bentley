export default function Pagination({ current = '01', total = '04' }) {
  return (
    <div className="flex items-center gap-4">
      <span
        className="text-[14px] mr-2"
        style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(182,194,183,0.5)' }}
      >
        {current} / {total}
      </span>
      <button
        aria-label="Previous"
        className="group w-[40px] h-[40px] rounded-full border border-[rgba(30,215,96,0.3)] bg-transparent flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#1ED760]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1ED760" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }} className="group-hover:stroke-[#060D08] transition-colors duration-300">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        aria-label="Next"
        className="group w-[40px] h-[40px] rounded-full border border-[rgba(30,215,96,0.3)] bg-transparent flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#1ED760]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1ED760" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }} className="group-hover:stroke-[#060D08] transition-colors duration-300">
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>
    </div>
  )
}
