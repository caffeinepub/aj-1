interface AJ1BrandProps {
  showLogo?: boolean;
  showIcon?: boolean;
  className?: string;
}

export default function AJ1Brand({ showLogo = true, showIcon = false, className = '' }: AJ1BrandProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showIcon && (
        <img
          src="/assets/generated/aj1-icon.dim_512x512.png"
          alt="AJ.1 Icon"
          className="h-10 w-10 rounded-lg"
        />
      )}
      {showLogo && (
        <img
          src="/assets/generated/aj1-logo.dim_1024x256.png"
          alt="AJ.1"
          className="h-8"
        />
      )}
    </div>
  );
}
