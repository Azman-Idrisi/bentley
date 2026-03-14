import Icon from './Icon'

export default function PlayButton({ className = '' }) {
  return (
    <button
      className={`group w-[48px] h-[48px] rounded-full border-[1.5px] border-[#2AF47C] bg-transparent flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#2AF47C] ${className}`}
    >
      <span className="text-[#2AF47C] group-hover:text-[#0B1C13] transition-colors duration-300">
        <Icon name="play" size={16} />
      </span>
    </button>
  )
}
