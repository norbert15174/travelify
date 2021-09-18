import styled from "styled-components";

const Container = styled.div`
  width: 94px;
  height: 94px;
`;

const LogOut = () => (
  <Container>
    <svg
      width="102"
      height="102"
      viewBox="0 0 102 102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <circle cx="51" cy="47" r="47" fill="#12BFCE" />
        <path
          d="M58.505 17V19.6461H68.8533V72.441H65.0275V23.4718H58.505V77L33.1466 72.441V64.9809V21.5685L58.505 17ZM53.84 49.0563C54.6924 49.0563 55.3835 48.1571 55.3835 47.0479C55.3835 45.9388 54.6924 45.0396 53.84 45.0396C52.9876 45.0396 52.2964 45.9388 52.2964 47.0479C52.2964 48.1571 52.9876 49.0563 53.84 49.0563Z"
          fill="#F2F7F2"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="102"
          height="102"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  </Container>
);
export default LogOut;
