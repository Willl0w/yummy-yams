import { SVGProps } from "react";
export default function DiceOneFace(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        height: 512,
        width: 512,
      }}
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M0 0h512v512H0z" />
      <path
        fill="#fff"
        d="M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zM256 206a50 50 0 0 1 0 100 50 50 0 0 1 0-100z"
      />
    </svg>
  );
}
