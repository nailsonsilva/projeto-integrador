import Sidebar from "../../components/shared/Sidebar";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { logoutUser } = useAuth();
  return (
    <>
      <Sidebar />
      <div>Dashboard</div>
      <button onClick={logoutUser}>Logout</button>
    </>
  );
};
export default Dashboard;
