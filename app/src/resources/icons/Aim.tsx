import * as React from 'react';

function SvgAim(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="aim_svg__icon"
      viewBox="0 0 1035 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M512.191.063C229.864.063.191 229.735.191 512s229.673 511.937 511.937 511.937c282.328 0 512-229.672 512-511.937S794.456.063 512.191.063zm68.921 890.779V638.576H454.536v254.038a385.677 385.677 0 01-322.073-317.326h258.785V448.712H132.463a385.677 385.677 0 01322.073-317.326v254.038h126.576V133.158A385.867 385.867 0 01891.92 448.712H644.4v126.576h247.52a385.867 385.867 0 01-310.808 315.554z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgAim;
