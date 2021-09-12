import * as React from 'react';

function SvgAttack(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="attack_svg__icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M448 192h64v64h64v64h64v63.616l66.816-66.88a63.936 63.936 0 000-90.496L525.824 45.248a63.936 63.936 0 00-90.496 0L384 96.576V128h64v64zM256 512h-64v-64h-64v-64H96.576l-51.328 51.328a63.936 63.936 0 000 90.496L226.24 706.816a63.936 63.936 0 0090.496 0L383.616 640H320v-64h-64v-64zm640 320v-64h-64v-64h-64v-64h-64v-64h-64v-64h-64v-64h-.384l64-64H576v-64h-64v-64h-64v-64h-64v-64h-31.424L128 352.576V384h64v64h64v64h64v64h64v63.616l64-64V576h64v64h64v64h64v64h64v64h64v64h64v64h128V832z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgAttack;
