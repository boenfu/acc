import * as React from 'react';

function SvgCharge(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="charge_svg__icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M938.667 426.667v-85.334c0-46.933-38.4-85.333-85.334-85.333H128c-46.933 0-85.333 38.4-85.333 85.333v341.334C42.667 729.6 81.067 768 128 768h725.333c46.934 0 85.334-38.4 85.334-85.333v-85.334c23.466 0 42.666-19.2 42.666-42.666v-85.334c0-23.466-19.2-42.666-42.666-42.666zM896 469.333v213.334c0 23.466-19.2 42.666-42.667 42.666H128c-23.467 0-42.667-19.2-42.667-42.666V341.333c0-23.466 19.2-42.666 42.667-42.666h725.333c23.467 0 42.667 19.2 42.667 42.666v128zM512 384L213.333 512h213.334l42.666 128L768 512H554.667L512 384z"
        fill="#4F4F4F"
      />
    </svg>
  );
}

export default SvgCharge;
