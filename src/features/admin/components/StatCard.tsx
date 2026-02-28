// Stub for StatCard - @mui/x-charts not installed
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowDownwardRounded, ArrowUpwardRounded } from "@mui/icons-material";

export type StatCardProps = {
  title: string;
  value: string;
  interval: string;
  trend: "up" | "down" | "neutral";
  data: number[];
};

export default function StatCard({
  title,
  value,
  interval,
  trend,
}: StatCardProps) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack sx={{ justifyContent: "space-between", gap: 1 }}>
          <Typography color="textSecondary" variant="overline">
            {title}
          </Typography>
          <Box>
            <Typography variant="h4" component="p">
              {value}
            </Typography>
            <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {interval}
              </Typography>
              {trend === "up" && (
                <ArrowUpwardRounded
                  sx={{ fontSize: 16, color: "success.main" }}
                />
              )}
              {trend === "down" && (
                <ArrowDownwardRounded
                  sx={{ fontSize: 16, color: "error.main" }}
                />
              )}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
