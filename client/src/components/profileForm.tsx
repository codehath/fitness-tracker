import { useEffect, useCallback, useState } from 'react';
import { userService } from '../services/userService';
import { useApi } from '../hooks/useApi';
import Loading from './common/Loading';
import Error from './common/Error';
import { User } from '../services/userService';

interface UserProp {
  clerkId: string;
}

const UserDataEdit = ({ clerkId }: UserProp) => {
  const getuser = useCallback(() => userService.getUser(clerkId), [clerkId]);
  const { data: user, loading, error } = useApi<User>(getuser);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    bodyType: '',
    fitnessGoals: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: '',
        email: '',
        age: '',
        gender: user.gender || '',
        height: '',
        weight: '',
        bodyType: user.bodyType || '',
        fitnessGoals: '',
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Only include fields that were changed
      const changedFields = Object.entries(formData).reduce(
        (acc, [key, value]) => {
          if (value !== '') {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, string>
      );

      const processedFormData = {
        ...changedFields,
        age: changedFields.age ? parseInt(changedFields.age) : undefined,
        weight: changedFields.weight
          ? parseInt(changedFields.weight)
          : undefined,
        height: changedFields.height
          ? parseInt(changedFields.height)
          : undefined,
      };

      await userService.updateUser(clerkId, processedFormData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleGenderBodyTypeChange = (gender: string) => {
    setFormData((prev) => ({
      ...prev,
      gender,
      bodyType: '', // Reset bodyType when gender changes
    }));
  };

  // Generic handler for all other form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getButtonStyle = (isSelected: boolean) => ({
    backgroundColor: isSelected ? '#666' : undefined,
    color: isSelected ? '#fff' : undefined,
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!user) return <p>No workout user found</p>;

  return (
    <div className="user-data-edit">
      <h2>Edit Profile</h2>

      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={user.name || ''}
                />
              </td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={user.email || ''}
                />
              </td>
            </tr>
            <tr>
              <td>Age:</td>
              <td>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder={user.age?.toString() || '-'}
                />
              </td>
            </tr>
            <tr>
              <td>Gender:</td>
              <td>
                <div>
                  <button
                    type="button"
                    onClick={() => handleGenderBodyTypeChange('Male')}
                    style={getButtonStyle(formData.gender === 'Male')}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenderBodyTypeChange('Female')}
                    style={getButtonStyle(formData.gender === 'Female')}
                  >
                    Female
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>Height:</td>
              <td>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder={user.height ? `${user.height} cm` : '-'}
                />
              </td>
            </tr>
            <tr>
              <td>Weight:</td>
              <td>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder={user.weight ? `${user.weight} kg` : '-'}
                />
              </td>
            </tr>
            <tr>
              <td>Body Type:</td>
              <td>
                <div>
                  {formData.gender === 'Male' ? (
                    <>
                      {[
                        'Slim',
                        'Skinny Fat',
                        'Average',
                        'Athletic',
                        'Muscular',
                        'Overweight',
                      ].map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, bodyType: type }))
                          }
                          style={getButtonStyle(formData.bodyType === type)}
                        >
                          {type}
                        </button>
                      ))}
                    </>
                  ) : (
                    <>
                      {['Slim', 'Average', 'Toned', 'Curvy', 'Overweight'].map(
                        (type) => (
                          <button
                            type="button"
                            key={type}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                bodyType: type,
                              }))
                            }
                            style={getButtonStyle(formData.bodyType === type)}
                          >
                            {type}
                          </button>
                        )
                      )}
                    </>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td>Fitness Goals:</td>
              <td>
                <input
                  type="text"
                  name="fitnessGoals"
                  value={formData.fitnessGoals}
                  onChange={handleChange}
                  placeholder={user.fitnessGoals || '-'}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button type="submit">Update Profile</button>
        </div>
      </form>
    </div>
  );
};

export default UserDataEdit;
