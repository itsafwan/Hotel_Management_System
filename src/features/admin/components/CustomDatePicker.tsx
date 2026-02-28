// Stub for CustomDatePicker - @mui/x-date-pickers not installed
import Button from "@mui/material/Button";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";

export default function CustomDatePicker() {
  return (
    <Button
      variant="outlined"
      size="small"
      startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
      sx={{ minWidth: "fit-content" }}
      disabled
    >
      Date Picker Not Available
    </Button>
  );
}
