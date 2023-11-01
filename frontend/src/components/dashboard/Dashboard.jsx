import { useAuth } from "../../context/AuthContext";
import Sidebar from "../shared/Sidebar";

const Dashboard = () => {
  const { logoutUser } = useAuth();
  return (
    <>
      <Sidebar>
        <div>Dashboard</div>
        <button onClick={logoutUser}>Logout</button>
      </Sidebar>
    </>
  );
};
export default Dashboard;
