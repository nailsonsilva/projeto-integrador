import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { logoutUser } = useAuth();
  return (
    <>
      <div>Dashboard</div>
      <button onClick={logoutUser}>Logout</button>
    </>
  );
};
export default Dashboard;
