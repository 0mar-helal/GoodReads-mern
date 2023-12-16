import DashboardLayout from "../../components/DashboardLayout";

const Dashboard = () => {
  return (
    <div>
      <h2>dashboard</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae eum
        provident nam iusto laudantium nostrum, necessitatibus numquam quis
        beatae tempora labore, eligendi nemo facilis. Beatae nostrum aliquid
        deserunt dicta labore.
      </p>
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
