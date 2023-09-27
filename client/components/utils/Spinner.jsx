import React from "react";

export const Spinner = ({color, margin}) => {
  return (
    <div style={{marginTop: margin}}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 200 200"
          fill="none"
          color={color}
        >
          <defs>
            <linearGradient id="spinner-secondHalf">
              <stop offset="0%" stop-opacity="0" stop-color="currentColor" />
              <stop offset="100%" stop-opacity="0.5" stop-color="currentColor" />
            </linearGradient>
            <linearGradient id="spinner-firstHalf">
              <stop offset="0%" stop-opacity="1" stop-color="currentColor" />
              <stop offset="100%" stop-opacity="0.5" stop-color="currentColor" />
            </linearGradient>
          </defs>

          <g stroke-width="8">
            <path stroke="url(#spinner-secondHalf)" d="M 4 100 A 96 96 0 0 1 196 100" />
            <path stroke="url(#spinner-firstHalf)" d="M 196 100 A 96 96 0 0 1 4 100" />

            <path
              stroke="currentColor"
              stroke-linecap="round"
              d="M 4 100 A 96 96 0 0 1 4 98"
            />
          </g>

          <animateTransform
            from="0 0 0"
            to="360 0 0"
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1300ms"
          />
        </svg>
      </div>
    </div>
  )
}