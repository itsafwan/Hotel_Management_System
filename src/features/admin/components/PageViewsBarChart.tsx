// Stub for PageViewsBarChart - @mui/x-charts not installed
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function PageViewsBarChart() {
  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Page views and downloads
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" sx={{ gap: 1 }}>
            <Typography variant="h4" component="p">
              1.3M
            </Typography>
            <Chip size="small" color="error" label="-8%" />
          </Stack>
          <Typography variant="body2">
            Chart not available - @mui/x-charts not installed
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
