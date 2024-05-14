// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  colors: {
    primary: {
        100: "#00FF90",
        900: "red"
    },
    secondary:{
        100:  "#7F39FB"
    },
    black:{
        100:  "#0A060F"
    },
    darkGray:{
        100:  "#141516"
    },
    white: {
        100: "#fff"
    }
  },
})
