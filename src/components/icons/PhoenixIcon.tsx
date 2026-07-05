import convertedImage from '../../assets/converted-image.svg'

interface PhoenixIconProps {
  className?: string
}

export default function PhoenixIcon({ className }: PhoenixIconProps) {
  return (
    <img src={convertedImage} className={className} alt="Phoenix Icon" width="50" height="48" />
  )
}
