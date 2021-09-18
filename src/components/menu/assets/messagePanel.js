import styled from "styled-components";

const Container = styled.div`
  width: 94px;
  height: 94px;
`;

const MessagePanel = () => (
  <Container>
    <svg
      width="102"
      height="102"
      viewBox="0 0 102 102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <circle
          cx="51"
          cy="47"
          r="45.5"
          fill="#12BFCE"
          stroke="#F2F7F2"
          strokeWidth="3"
        />
        <g clipPath="url(#clip0)">
          <path
            d="M71 42.88C71 30.75 59.125 22 46 22C32.7975 22 21 30.8175 21 42.88C21 47.155 22.5375 51.355 25.2625 54.6175C25.38 58.435 23.1375 63.915 21.1125 67.8975C26.5325 66.92 34.2425 64.7525 37.7325 62.61C56.9775 67.3025 71 55.505 71 42.88ZM34.75 46.3325C33.0275 46.3325 31.625 44.9325 31.625 43.2075C31.625 41.4825 33.0275 40.0825 34.75 40.0825C36.4725 40.0825 37.875 41.4825 37.875 43.2075C37.875 44.9325 36.4725 46.3325 34.75 46.3325ZM46 46.3325C44.2775 46.3325 42.875 44.9325 42.875 43.2075C42.875 41.4825 44.2775 40.0825 46 40.0825C47.7225 40.0825 49.125 41.4825 49.125 43.2075C49.125 44.9325 47.7225 46.3325 46 46.3325ZM57.25 46.3325C55.5275 46.3325 54.125 44.9325 54.125 43.2075C54.125 41.4825 55.5275 40.0825 57.25 40.0825C58.9725 40.0825 60.375 41.4825 60.375 43.2075C60.375 44.9325 58.9725 46.3325 57.25 46.3325ZM74.84 49.935C74.4375 51.155 73.9375 52.3375 73.3375 53.475C77.53 56.63 78.98 61.54 74.4975 66.8875C74.445 68.75 74.375 69.51 74.8425 71.55C72.6125 70.7825 72.395 70.57 70.68 69.5175C65.3625 70.815 60.0175 71.2575 55.4575 67.38C54.0525 67.7775 52.595 68.075 51.1075 68.29C54.89 72.9825 61.8525 75.5325 70.05 73.54C72.335 74.9425 77.3825 76.3575 80.93 77.0025C79.605 74.39 78.1375 70.805 78.21 68.305C82.5975 63.06 82.0675 54.715 74.84 49.935Z"
            fill="#F2F7F2"
          />
        </g>
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
        <clipPath id="clip0">
          <rect
            width="60"
            height="60"
            fill="white"
            transform="translate(21 17)"
          />
        </clipPath>
      </defs>
    </svg>
  </Container>
);
export default MessagePanel;
