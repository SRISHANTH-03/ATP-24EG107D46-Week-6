import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ListOfEmp() {
  const [emps, setEmps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const gotoEditemployee = (empObj) => {
    navigate(`/edit-employee/${empObj._id}`, { state: empObj });
  };

  const gotoEmployee = (empObj) => {
    navigate(`/employee/${empObj._id}`, { state: empObj });
  };

  useEffect(() => {
    async function getEmps() {
      try {
        setLoading(true);

        let res = await axios.get(`${import.meta.env.VITE_API_URL}/emp-api/employees`);

        if (res.status === 200) {
          let resObj = res.data; 
          setEmps(resObj.payload);
        } else {
          throw new Error("Failed to fetch employees");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }

    getEmps();
  }, []);

  const deleteEmp = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/emp-api/employees/${id}`);

      setEmps((prev) => prev.filter((emp) => emp._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <p className="text-center text-3xl">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div>
      <h1 className="text-4xl text-center mb-5">List of Employees</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {emps.map((empObj) => (
          <div key={empObj._id} className="bg-white p-5 rounded-xl shadow">
            <p className="wrap-break-words"><b>Name:</b> {empObj.name}</p>
            <p className="wrap-break-words"><b>Email:</b> {empObj.email}</p>
            <p className="wrap-break-words"><b>Designation:</b> {empObj.designation}</p>

            <div>
              <button
                onClick={() => gotoEmployee(empObj)}
                className="mt-3 bg-blue-500 text-white px-3 py-1 rounded mr-2"
              >
                View
              </button>

              <button
                onClick={() => gotoEditemployee(empObj)}
                className="mt-3 bg-green-500 text-white px-3 py-1 rounded mr-2"
              >
                Edit
              </button>

              <button
                onClick={() => deleteEmp(empObj._id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfEmp;
