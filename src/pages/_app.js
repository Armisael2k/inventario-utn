import Head from "next/head";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextNProgress from "nextjs-progressbar";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { indexed } from "@/configs/pages";
import { esES as gridES } from "@mui/x-data-grid";
import { esES as pickerES } from "@mui/x-date-pickers";
import { esES as coreES } from "@mui/material/locale";
import "@/styles/global.css";
import "react-data-grid/lib/styles.css";
// import moment from "moment";
// import "moment/locale/es-MX";
// moment.locale("es-MX");

const inter = Inter({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const customTheme = createTheme(
  {
    palette: {
      primary: {
        main: "#43a047",
      },
      secondary: {
        main: "#66bb6a",
      },
    },
    typography: {
      fontFamily: inter.style.fontFamily
    },
  },
  gridES,
  pickerES,
  coreES
);

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ThemeProvider theme={customTheme}>
      <Head>
        <title>{ indexed[router.pathname]?.title ? `Inventario | ${indexed[router.pathname]?.title}` : indexed.default.title }</title>
      </Head>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Component {...pageProps} />
      </LocalizationProvider>
      <ToastContainer />
      <NextNProgress color={customTheme.palette.primary.main}/>
    </ThemeProvider>
  );
}
