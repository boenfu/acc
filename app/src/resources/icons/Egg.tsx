import * as React from 'react';

function SvgEgg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 48 48"
      width="1em"
      height="1em"
      {...props}
    >
      <defs>
        <linearGradient
          id="egg_svg__a"
          x1={24}
          y1={89.33}
          x2={24}
          y2={-16.41}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#f3c57a" />
          <stop offset={0.49} stopColor="#6458ED" />
          <stop offset={1} stopColor="#533EDD" />
        </linearGradient>
        <linearGradient
          id="egg_svg__b"
          x1={-15.78}
          y1={25.1}
          x2={57.59}
          y2={21.97}
          xlinkHref="#egg_svg__a"
        />
        <linearGradient
          id="egg_svg__c"
          x1={24}
          y1={17}
          x2={24}
          y2={-7}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#fff" />
          <stop offset={0.52} stopColor="#cce2e6" />
          <stop offset={1} stopColor="#8fa1bb" />
        </linearGradient>
      </defs>
      <path
        d="M42 26.58C42 38.18 33.94 45 24 45S6 38.18 6 26.58 14.06 3 24 3s18 12 18 23.58z"
        fill="url(#egg_svg__a)"
      />
      <path
        d="M31.91 5.65A13.78 13.78 0 0024 3C14.06 3 6 15 6 26.58c0 9.13 5 15.28 12 17.49-4.54-3.07-7.5-8.31-7.5-15.32a26.49 26.49 0 01.43-4.7 1.89 1.89 0 012.56-1.4 4.46 4.46 0 002.34.19 4.52 4.52 0 003.57-3.51 4.4 4.4 0 00-.4-2.89 1.76 1.76 0 010-1.61 3.7 3.7 0 00-.1-3.68 1.84 1.84 0 01.37-2.37 14.3 14.3 0 019.23-3.61 12.59 12.59 0 013.41.48z"
        fill="url(#egg_svg__b)"
      />
      <path
        d="M34.61 27.53l-5.3-5.3-5.31 5.3-5.3-5.3-5.3 5.3-5.3-5.3-2 2C6 25 6 25.79 6 26.58s0 1.28.08 1.89l2-2 3.18 3.18 2.12 2.12 2.12-2.12 3.18-3.18 3.18 3.18L24 31.77l2.12-2.12 3.18-3.18 3.18 3.18 2.12 2.12 2.12-2.12 3.18-3.18 2 2c0-.62.08-1.25.08-1.89s0-1.59-.11-2.38l-2-2z"
        fill="url(#egg_svg__c)"
      />
    </svg>
  );
}

export default SvgEgg;
