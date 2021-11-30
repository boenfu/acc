import * as React from 'react';

function SvgPenguin(props: React.SVGProps<SVGSVGElement>) {
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
          id="penguin_svg__a"
          x1={24}
          y1={87.25}
          x2={24}
          y2={-21.54}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#27e9de" />
          <stop offset={0.52} stopColor="#6458ED" />
          <stop offset={1} stopColor="#533EDD" />
        </linearGradient>
        <linearGradient
          id="penguin_svg__e"
          x1={24}
          y1={57.04}
          x2={24}
          y2={1.86}
          xlinkHref="#penguin_svg__a"
        />
        <linearGradient
          id="penguin_svg__b"
          x1={24}
          y1={2}
          x2={24}
          y2={80.26}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#fff" />
          <stop offset={0.52} stopColor="#cce2e6" />
          <stop offset={1} stopColor="#8fa1bb" />
        </linearGradient>
        <linearGradient
          id="penguin_svg__d"
          x1={24}
          y1={37.43}
          x2={24}
          y2={23.58}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#f3c57a" />
          <stop offset={0.49} stopColor="#f39369" />
          <stop offset={1} stopColor="#e94867" />
        </linearGradient>
        <linearGradient
          id="penguin_svg__f"
          x1={13.16}
          y1={50.71}
          x2={13.16}
          y2={-24.25}
          xlinkHref="#penguin_svg__b"
        />
        <linearGradient
          id="penguin_svg__g"
          x1={34.84}
          y1={50.71}
          x2={34.84}
          y2={-24.25}
          xlinkHref="#penguin_svg__b"
        />
        <linearGradient
          id="penguin_svg__c"
          x1={14.81}
          y1={36.25}
          x2={14.81}
          y2={27.56}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#273a9b" />
          <stop offset={0.56} stopColor="#202f65" />
          <stop offset={1} stopColor="#021e2f" />
        </linearGradient>
        <linearGradient
          id="penguin_svg__h"
          x1={14.06}
          y1={23.71}
          x2={14.06}
          y2={20.96}
          xlinkHref="#penguin_svg__c"
        />
        <linearGradient
          id="penguin_svg__i"
          x1={32.81}
          y1={36.25}
          x2={32.81}
          y2={27.56}
          xlinkHref="#penguin_svg__c"
        />
        <linearGradient
          id="penguin_svg__j"
          x1={32.06}
          y1={23.71}
          x2={32.06}
          y2={20.96}
          xlinkHref="#penguin_svg__c"
        />
        <linearGradient
          id="penguin_svg__k"
          x1={13.69}
          y1={21.69}
          x2={13.69}
          y2={36.47}
          xlinkHref="#penguin_svg__b"
        />
        <linearGradient
          id="penguin_svg__l"
          x1={34.31}
          y1={21.69}
          x2={34.31}
          y2={36.47}
          xlinkHref="#penguin_svg__b"
        />
        <linearGradient
          id="penguin_svg__m"
          x1={24}
          y1={32.5}
          x2={24}
          y2={20.41}
          xlinkHref="#penguin_svg__d"
        />
        <linearGradient
          id="penguin_svg__n"
          x1={24}
          y1={23.14}
          x2={24}
          y2={33.9}
          xlinkHref="#penguin_svg__d"
        />
      </defs>
      <path
        d="M45 28.54C45 40.13 35.6 45 24 45S3 40.13 3 28.54 12.4 3 24 3s21 13.94 21 25.54z"
        fill="url(#penguin_svg__a)"
      />
      <path
        d="M45 28.54C45 40.13 35.6 45 24 45S3 40.13 3 28.54s9.4-22 21-22 21 10.4 21 22z"
        fill="url(#penguin_svg__e)"
      />
      <path
        d="M34.75 15c-3.52 0-6.49 5.29-7.43 12.53a13.45 13.45 0 00-6.63 0C19.74 20.29 16.77 15 13.25 15 9 15 5.5 22.81 5.5 32.44a38 38 0 00.21 4 4.63 4.63 0 001.22 2.71C10.74 43.19 17 45 24 45s13.26-1.81 17.07-5.82a4.63 4.63 0 001.22-2.71 38 38 0 00.21-4C42.5 22.81 39 15 34.75 15z"
        fill="url(#penguin_svg__b)"
      />
      <path
        d="M24 30.77c1.87 0 3.38-1.63 3.38-2.68 0-.69-.65-.86-1.63-.89a1.14 1.14 0 01-.79-.36 3.3 3.3 0 00-.64-.52.61.61 0 00-.64 0 3.3 3.3 0 00-.64.52 1.14 1.14 0 01-.79.36c-1 0-1.63.2-1.63.89 0 1.05 1.51 2.68 3.38 2.68z"
        fill="url(#penguin_svg__d)"
      />
      <path
        d="M20.81 28.68C20 20.86 17 15 13.25 15 9 15 5.5 22.81 5.5 32.44v1c.36-8.88 3.68-15.83 7.71-15.83 3.31 0 6.12 4.67 7.24 11.23z"
        fill="url(#penguin_svg__f)"
      />
      <path
        d="M34.75 15C31 15 28 20.86 27.19 28.68l.33.14c1.11-6.56 3.93-11.23 7.24-11.23 4 0 7.35 7 7.71 15.83v-1C42.5 22.81 39 15 34.75 15z"
        fill="url(#penguin_svg__g)"
      />
      <circle cx={14.81} cy={22.5} r={1.5} fill="url(#penguin_svg__c)" />
      <path
        d="M14.81 21a1.5 1.5 0 00-1.5 1.5h1.5z"
        fill="url(#penguin_svg__h)"
      />
      <circle cx={32.81} cy={22.5} r={1.5} fill="url(#penguin_svg__i)" />
      <path
        d="M32.81 21a1.5 1.5 0 00-1.5 1.5h1.5z"
        fill="url(#penguin_svg__j)"
      />
      <ellipse
        cx={13.69}
        cy={24.79}
        rx={1.79}
        ry={0.92}
        fill="url(#penguin_svg__k)"
      />
      <ellipse
        cx={34.31}
        cy={24.79}
        rx={1.79}
        ry={0.92}
        fill="url(#penguin_svg__l)"
      />
      <path
        d="M24 23.61c-2.87 0-5.19 2.29-5.19 3.77 0 1 1 1.21 2.5 1.25a1.83 1.83 0 011.21.51 5 5 0 001 .74 1 1 0 001 0 5 5 0 001-.74 1.83 1.83 0 011.21-.51c1.5 0 2.5-.28 2.5-1.25-.04-1.48-2.36-3.77-5.23-3.77z"
        fill="url(#penguin_svg__m)"
      />
      <path
        d="M24 24.56a5.64 5.64 0 015.06 3.12 1 1 0 00.13-.5c0-1.48-2.33-3.77-5.19-3.77s-5.19 2.29-5.19 3.77a1 1 0 00.13.5A5.64 5.64 0 0124 24.56z"
        fill="url(#penguin_svg__n)"
      />
    </svg>
  );
}

export default SvgPenguin;
