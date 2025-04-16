/** @type {import('tailwindcss').Config} */
module.exports = {
    "content": [
          "./src/**/*.{js,jsx,ts,tsx}"
    ],
    "theme": {
          "extend": {
                "colors": {
                      "white": "#fff",
                      "gainsboro": {
                            "100": "#e7e7e7",
                            "200": "#e5e7eb"
                      },
                      "deepskyblue": "#0ea5e9",
                      "whitesmoke": {
                            "100": "#f8f8f8",
                            "200": "#f3f4f6"
                      },
                      "dimgray": {
                            "100": "#4b5563",
                            "200": "rgba(75, 85, 99, 0.6)"
                      },
                      "gray": "#111827"
                },
                "fontFamily": {
                      "poppins": "Poppins"
                },
                "borderRadius": {
                      "9980xl": "9999px"
                },
                "padding": {
                      "101xl": "120px",
                      "10xs": "3px"
                }
          },
          "fontSize": {
                "sm": "14px",
                "15xl": "34px",
                "base": "16px",
                "inherit": "inherit"
          }
    },
    "corePlugins": {
          "preflight": false
    }
}