interface PhoenixIconProps {
  className?: string
}

export default function PhoenixIcon({ className }: PhoenixIconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.578 8.578C5.528 11.628 3.451 15.514 2.609 19.745C1.767 23.975 2.199 28.361 3.85 32.346C5.501 36.331 8.296 39.737 11.883 42.134C15.469 44.53 19.686 45.809 24 45.809C28.313 45.809 32.53 44.53 36.116 42.134C39.703 39.737 42.498 36.331 44.149 32.346C45.8 28.361 46.232 23.975 45.39 19.745C44.549 15.514 42.471 11.628 39.421 8.578L24 24L8.578 8.578Z"></path>
    </svg>
  )
}
