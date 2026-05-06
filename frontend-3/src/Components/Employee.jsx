import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Employee() {
  const { state } = useLocation();
  const { id } = useParams();

  const [emp, setEmp] = useState(state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch if state not available
  useEffect(() => {
    if (!emp) {
      const fetchEmp = async () => {
        try {
          setLoading(true);

          const res = await axios.get(
            `http://localhost:6001/emp-api/employees`
          );

          const foundEmp = res.data.payload.find((e) => e._id === id);

          if (foundEmp) {
            setEmp(foundEmp);
          } else {
            setError("Employee not found");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchEmp();
    }
  }, [emp, id]);

  if (loading) {
    return <p className="text-center text-2xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-xl">{error}</p>;
  }

  if (!emp) {
    return (
      <p className="text-center text-red-500 text-xl">
        No employee data found
      </p>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-8">
      <div className="max-w-2xl mx-auto bg-gray-300 rounded-xl shadow-2xl p-6 sm:p-8 text-left space-y-3">
        <p className="text-2xl sm:text-3xl font-semibold mb-4">
          Employee Details
        </p>
        <p><b>Name:</b> {emp.name}</p>
        <p><b>Email:</b> {emp.email}</p>
        <p><b>Mobile Number:</b> {emp.mobile}</p>
        <p><b>Designation:</b> {emp.designation}</p>
        <p><b>Company Name:</b> {emp.companyName}</p>
      </div>
    </div>
  );
}

export default Employee;
