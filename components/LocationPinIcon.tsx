import React from "react";

interface LocationPinIconProps {
  className?: string;
}

export default function LocationPinIcon({ className }: LocationPinIconProps) {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.1834 25.8674C4.69142 15.0063 3.30078 13.8916 3.30078 9.9C3.30078 4.43236 7.73315 0 13.2008 0C18.6684 0 23.1008 4.43236 23.1008 9.9C23.1008 13.8916 21.7101 15.0063 14.2182 25.8674C13.7266 26.5776 12.6749 26.5775 12.1834 25.8674ZM13.2008 14.025C15.479 14.025 17.3258 12.1782 17.3258 9.9C17.3258 7.62181 15.479 5.775 13.2008 5.775C10.9226 5.775 9.07578 7.62181 9.07578 9.9C9.07578 12.1782 10.9226 14.025 13.2008 14.025Z"
        fill="#FFB400"
      />
    </svg>
  );
}

