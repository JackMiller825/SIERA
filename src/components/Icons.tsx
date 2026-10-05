type IconProps = {
  className?: string
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.7 10.3 22.4 1.5h-2.1l-6.6 7.6L8.3 1.5H1.7l8.1 11.8L1.7 22.5h2.1l7.1-8.2 5.7 8.2h6.6l-8.5-12.2Zm-2.5 2.9-.8-1.2-6.6-9.4h2.8l5.3 7.6.8 1.2 6.9 9.8h-2.8l-5.6-8Z"
      />
    </svg>
  )
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.8 4.3 18.6 20c-.2 1-.8 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.2.3-.5.5-.9.5l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2L6.2 13.1 1.7 11.7c-1-.3-1-.9.2-1.4L20.4 3.1c.8-.3 1.6.2 1.4 1.2Z"
      />
    </svg>
  )
}

export function DownloadIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14"
      />
    </svg>
  )
}

export function ShareIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 5h5v5M19 5l-8 8M10 6H6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4"
      />
    </svg>
  )
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}
