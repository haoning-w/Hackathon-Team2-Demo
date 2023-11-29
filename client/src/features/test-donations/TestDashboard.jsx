import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TestPieChart from "./TestPieChart";
import TestBarChart from "./TestBarChart";

function TestDashboard() {
  return (
    <div className="mx-auto w-[800px] mt-8">
      <Grid2 container spacing={2} columns={16}>
        <Grid2 md={12}>
          <div className="bg-blue-300">grid 1</div>
        </Grid2>
        <Grid2 md={4}>
          <div className="bg-slate-300">grid 2</div>
        </Grid2>
        <Grid2 sm={6} md={8}>
          <TestPieChart />
        </Grid2>
      </Grid2>
      <Grid2 md={12}>
        <div className="h-[300px]">
          <TestBarChart />
        </div>
      </Grid2>
    </div>
  );
}

export default TestDashboard;
