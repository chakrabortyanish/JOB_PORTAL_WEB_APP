import React, { useState } from "react";
import { useContext } from "react";
import { JobContext } from "../context/JobContext";
import { showError, showSuccess } from "../utils/toast";
import { ToastContainer } from "react-toastify";


const RecruiterProfileModal = ({recruiter }) => {
  /* const [editMode, setEditMode] = useState(false); */
  const {editMode, setEditMode, setOpenProfile} = useContext(JobContext)
  const [formData, setFormData] = useState({
    name: recruiter.name,
    email: recruiter.email,
    /* image: recruiter.image, */
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/recruiter/editprofile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success) {
        showSuccess("Profile updated successfully");
        setTimeout(() => {
          setOpenProfile(false);
        }, 2000);
        localStorage.setItem("recruiterName", data.user.name);
        localStorage.setItem("recruiterEmail", data.user.email);
      }

      if (!res.ok) {
        throw new Error(data.message);
      }

    } catch (error) {
      showError(error.message);
    }

    setEditMode(false);

    // 🔥 API call here
    // console.log("Updated Data:", formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Modal */}
      <div className="bg-white w-[380px] rounded-2xl shadow-lg p-6 relative animate-scaleIn">
        {/* Close */}
        <button
          onClick={()=> setOpenProfile(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/uploads/images/${localStorage.getItem("CompanyImage")}`}
            alt="company"
            className="w-24 h-24 rounded-full object-contain border-2 p-[8px]"
          />
        </div>

        {/* Content */}
        {!editMode ? (
          <>
            <h2 className="text-center text-xl font-semibold mt-4">
              {formData.name}
            </h2>
            <p className="text-center text-gray-500 text-sm">
              {formData.email}
            </p>

            <button
              onClick={() => setEditMode(true)}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Recruiter Name"
              className="w-full border px-3 py-2 rounded-lg focus:outline-blue-500"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border px-3 py-2 rounded-lg focus:outline-blue-500"
            />

            {/* <input
              type="file"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Company Image URL"
              className="w-full border px-3 py-2 rounded-lg focus:outline-blue-500"
            /> */}

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="flex-1 bg-gray-100 py-2 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default RecruiterProfileModal;
