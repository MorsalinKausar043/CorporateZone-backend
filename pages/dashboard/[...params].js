import DashboardRoutes from "../../components/Dashboard/Dashboard/DashboardRoutes";

const Dashboard = (props) => {
  return (
    <>
      <DashboardRoutes jobs={props.jobs} />
    </>
  );
};

export default Dashboard;

export const getServerSideProps = async (context) => {
  const { query } = context;
  const { jobType } = query;

  // without filtering
  if (jobType) {
    const response = await fetch(
      `https://corporate-zone-backend-main.vercel.app/jobs/?jobType=${jobType}`
    );
    const data = await response.json();

    return {
      props: {
        jobs: data.data,
        count: data.count,
      },
    };
  } else {
    const response = await fetch(
      "https://corporate-zone-backend-main.vercel.app/jobs"
    );
    const data = await response.json();
    return {
      props: {
        jobs: data.data,
        count: data.count,
      },
    };
  }
};
