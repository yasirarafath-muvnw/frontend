"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { endpoints } from "@/api/endpoints";

export default function OnboardPage() {
  const { user, accessToken } = useAuth();
  const router = useRouter();

  console.log('user', user)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    name: user?.name || "",
    // email: user?.email || "",
    age: "",
    gender: "",
    comments: "",
  });

  console.log("accessToken", accessToken);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (file) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);

        console.log("formDataUpload", formDataUpload);
        console.log("formData", formData);

        const response = await axios.post(endpoints.postProfilePic, formDataUpload, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log('pic response', response);
        console.log('pic response', response.data);

      }

      const response = await axios.post(
        endpoints.postProfileDetails,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age,
          gender: formData.gender,
          comments: formData.comments
            ? [{ body: formData.comments, date: new Date().toISOString() }]
            : [],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log('response', response);
      console.log('response data', response.data);


      router.replace("/dashboard");

    } catch (err) {
      console.error("Submit error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-black mb-4">
        Complete Your Profile
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        {/* <input type="hidden" name="email" value={formData.email} /> */}

        <div>
          <label className="block text-sm text-gray-700">First Name</label>
          <input
            name="firstName"
            className="w-full px-4 py-2 border rounded"
            onChange={handleChange}
            value={formData.firstName}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Last Name</label>
          <input
            name="lastName"
            className="w-full px-4 py-2 border rounded"
            onChange={handleChange}
            value={formData.lastName}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Age</label>
          <input
            name="age"
            type="number"
            className="w-full px-4 py-2 border rounded"
            onChange={handleChange}
            value={formData.age}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Gender</label>
          <select
            name="gender"
            className="w-full px-4 py-2 border rounded"
            onChange={handleChange}
            value={formData.gender}
            required
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700">Comments</label>
          <textarea
            name="comments"
            rows="3"
            className="w-full px-4 py-2 border rounded"
            onChange={handleChange}
            value={formData.comments}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2"
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </form>
    </div>
  );
}
