import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Copyright() {
  return (
    <Typography variant="body2" align="center" sx={{ color: "text.secondary" }}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Sitemark
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
