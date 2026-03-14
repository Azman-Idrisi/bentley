import { forwardRef, memo, useMemo } from 'react'

const BASE_STYLE = {
  position: 'relative',
  borderRadius: '32px',
  border: '1px solid rgba(30, 215, 96, 0.08)',
  backgroundColor: 'rgba(14, 28, 20, 0.65)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  overflow: 'hidden',
}

const SHADOW_GLOW = '0 0 80px rgba(30, 215, 96, 0.06), 0 4px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)'
const SHADOW_DEFAULT = '0 4px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)'

const GlassPanel = memo(forwardRef(function GlassPanel(
  { children, className = '', style, glow = false, noPadding = false, ...props },
  ref
) {
  const mergedStyle = useMemo(() => ({
    ...BASE_STYLE,
    boxShadow: glow ? SHADOW_GLOW : SHADOW_DEFAULT,
    ...(!noPadding && { padding: '48px' }),
    ...style,
  }), [glow, noPadding, style])

  return (
    <div ref={ref} className={className} style={mergedStyle} {...props}>
      {children}
    </div>
  )
}))

export default GlassPanel
