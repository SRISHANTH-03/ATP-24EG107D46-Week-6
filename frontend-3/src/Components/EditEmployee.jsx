import { useForm } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function EditEmployee() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  const [emp, setEmp] = useState(state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch employee if state not available
  useEffect(() => {
    if (!emp) {
      const fetchEmp = async () => {
        try {
          setLoading(true);

          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/emp-api/employees/${id}`
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

  
  useEffect(() => {
    if (emp) {
      setValue("name", emp.name);
      setValue("email", emp.email);
      setValue("mobile", emp.mobile);
      setValue("designation", emp.designation);
      setValue("companyName", emp.companyName);
    }
  }, [emp, setValue]);

  // update employee
  const saveModifiedEmp = async (modifiedEmp) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/emp-api/employees/${id}`,
        modifiedEmp
      );

      if (res.status === 200) {
        navigate("/list");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update employee");
    } finally {
      setLoading(false);
    }
  };

  // loading UI
  if (loading && !emp) {
    return <p className="text-center text-2xl">Loading...</p>;
  }

  // error UI
  if (error) {
    return <p className="text-center text-red-500 text-xl">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-5xl text-center text-gray-600">
        Edit Employee
      </h1>

      <form
        className="max-w-md mx-auto mt-10"
        onSubmit={handleSubmit(saveModifiedEmp)}
      >
        <input
          type="text"
          placeholder="Enter name"
          {...register("name", { required: true })}
          className="mb-3 border p-3 w-full rounded-2xl"
        />

        <input
          type="email"
          placeholder="Enter Email"
          {...register("email", { required: true })}
          className="mb-3 border p-3 w-full rounded-2xl"
        />

        <input
          type="text"
          placeholder="Enter mobile number"
          {...register("mobile")}
          className="mb-3 border p-3 w-full rounded-2xl"
        />

        <input
          type="text"
          placeholder="Enter designation"
          {...register("designation", { required: true })}
          className="mb-3 border p-3 w-full rounded-2xl"
        />

        <input
          type="text"
          placeholder="Enter company name"
          {...register("companyName", { required: true })}
          className="mb-3 border p-3 w-full rounded-2xl"
        />

        <button
          type="submit"
          disabled={loading}
          className="text-2xl rounded-2xl bg-green-500 text-white block mx-auto p-4"
        >
          {loading ? "Updating..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;