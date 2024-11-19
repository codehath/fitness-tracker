import { useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

interface ProfileFormData {
  age: string;
  weight: string;
  height: string;
  gender: string;
  bodyType: string;
  fitnessGoals: string;
}

function ProfilePage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileFormData>({
    age: "",
    weight: "",
    height: "",
    gender: "",
    bodyType: "",
    fitnessGoals: "",
  });

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/webhooks/clerk/users/${user?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label>Body Type</label>
          <select
            name="bodyType"
            value={formData.bodyType}
            onChange={handleChange}
          >
            <option value="">Select Body Type</option>
            {formData.gender === "Male" ? (
              <>
                <option value="Slim">Slim</option>
                <option value="Skinny Fat">Skinny Fat</option>
                <option value="Average">Average</option>
                <option value="Athletic">Athletic</option>
                <option value="Muscular">Muscular</option>
                <option value="Overweight">Overweight</option>
              </>
            ) : (
              <>
                <option value="Slim">Slim</option>
                <option value="Average">Average</option>
                <option value="Toned">Toned</option>
                <option value="Curvy">Curvy</option>
                <option value="Overweight">Overweight</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label>Fitness Goals</label>
          <input
            type="text"
            name="fitnessGoals"
            value={formData.fitnessGoals}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default ProfilePage;
