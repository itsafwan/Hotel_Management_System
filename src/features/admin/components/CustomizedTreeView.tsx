// Stub for CustomizedTreeView - @mui/x-tree-view not installed
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function CustomizedTreeView() {
  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h6">Tree View Not Available</Typography>
        <Typography variant="body2">
          @mui/x-tree-view is not installed
        </Typography>
      </CardContent>
    </Card>
  );
}
