import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateEmp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = async (newEmpObj) => {
    try {
      setLoading(true);

      let res = await fetch("http://localhost:6001/emp-api/employees", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmpObj),
      });

      if (res.status === 201) {
        navigate("/list");
      } else {
        let errorRes = await res.json();
        throw new Error(errorRes.message); 
      }
    } catch (err) {
      console.log("err in catch", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-4xl">Loading....</p>;
  }

  return (
   
    <div>
      <h1 className="text-5xl text-center text-gray-600">Create New Employee</h1>

      {error && (
        <p className="text-red-500 text-center text-xl">{error}</p>
      )}

      <form
        className="max-w-md mx-auto mt-10"
        onSubmit={handleSubmit(onFormSubmit)}>

        <input
          type="text"
          placeholder="Enter name"
          {...register("name", { required: "Name is required" })}
          className="mb-3 border p-3 w-full rounded-2xl"/>

        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Enter Email"
          {...register("email", { required: "Email is required" })}
          className="mb-3 border p-3 w-full rounded-2xl"/>

        <input
          type="text"
          placeholder="Enter mobile number"
          {...register("mobile")}
          className="mb-3 border p-3 w-full rounded-2xl"/>

        <input
          type="text"
          placeholder="Enter designation"
          {...register("designation", { required: true })}
          className="mb-3 border p-3 w-full rounded-2xl"/>

        <input
          type="text"
          placeholder="Enter company name"
          {...register("companyName", { required: true })}
          className="mb-3 border p-3 w-full rounded-2xl"/>

        <button className="text-2xl rounded-2xl bg-gray-600 text-white block mx-auto p-4">Add Emp</button>

      </form>
    </div>
  );
}

export default CreateEmp;