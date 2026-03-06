import React from "react";

// 1. Accept the isFilled boolean prop
const SaveIcon = ({ isFilled }) => {
  // Use currentColor when filled so it inherits from the MUI IconButton
  const strokeColor = isFilled ? "currentColor" : "#6C757D";
  const fillColor = isFilled ? "currentColor" : "none";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_6_2066"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <path d="M0 1.90735e-06H24V24H0V1.90735e-06Z" fill="white" />
      </mask>
      <g mask="url(#mask0_6_2066)">
        {/* Main Bookmark Shape */}
        <path
          d="M18.1875 0.937502H5.8125C4.77694 0.937502 3.9375 1.77521 3.9375 2.80856V22.2656L12 17.0156L20.0625 22.2406V2.80856C20.0625 1.77521 19.2231 0.937502 18.1875 0.937502Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          style={{ transition: "all 0.2s ease-in-out" }} // Smooth color transition
        />

        {/* The '+' inside the bookmark. We hide this when it is saved! */}
        {!isFilled && (
          <>
            <path
              d="M12 4.6875V13.125"
              stroke={strokeColor}
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinejoin="round"
            />
            <path
              d="M7.78125 8.90625H16.2188"
              stroke={strokeColor}
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinejoin="round"
            />
          </>
        )}
      </g>
    </svg>
  );
};

export default SaveIcon;
