// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  colors: {
    secondary: {
        50: "#ccffeb",
        100: "#a3ffe0",
        200: "#7affd5",
        300: "#51ffc9",
        400: "#27ffbe",
        500: "#00FF90",
        600: "#00cc6d",
        700: "#00994d",
        800: "#00662f",
        900: "#003411",
        950: "#001a08"
      },
      primary: {
        50: "#e0ccff",
        100: "#c2a3ff",
        200: "#a57aff",
        300: "#874fff",
        400: "#6a27ff",
        500: "#7F39FB",
        600: "#5e2ed9",
        700: "#4524b0",
        800: "#2f1b86",
        900: "#1d114f",
        950: "#10081e"
      },
      black: {
        50: "#0d0a13",
        100: "#1e1929",
        200: "#302b40",
        300: "#433d56",
        400: "#565f6c",
        500: "#0A060F",
        600: "#687484",
        700: "#7e909a",
        800: "#95a8b1",
        900: "#adbfc8",
        950: "#c6d7de"
      },
      darkGray: {
        50: "#1b1c1d",
        100: "#303233",
        200: "#46494b",
        300: "#5b5f61",
        400: "#717578",
        500: "#141516",
        600: "#8a8e90",
        700: "#a3a7a9",
        800: "#bcbfc1",
        900: "#d5d7d8",
        950: "#e7e8e9"
      },
    white: "#fff",
  },
})
