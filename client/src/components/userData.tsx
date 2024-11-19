import { useCallback } from 'react';
import { userService } from '../services/userService';
import { useApi } from '../hooks/useApi';
import Loading from './common/Loading';
import Error from './common/Error';
import { User } from '../services/userService';

interface UserProp {
  userId: string;
}

const UserData = ({ userId }: UserProp) => {
  const getuser = useCallback(() => userService.getUser(userId), [userId]);
  const { data: user, loading, error } = useApi<User>(getuser);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!user) return <p>No workout user found</p>;

  return (
    <div className="user-data">
      <h3>Profile</h3>

      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{user.name || '-'}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{user.email || '-'}</td>
          </tr>
          <tr>
            <td>Age:</td>
            <td>{user.age || '-'}</td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>{user.gender || '-'}</td>
          </tr>
          <tr>
            <td>Height:</td>
            <td>{user.height ? `${user.height} cm` : '-'}</td>
          </tr>
          <tr>
            <td>Weight:</td>
            <td>{user.weight ? `${user.weight} kg` : '-'}</td>
          </tr>
          <tr>
            <td>Body Type:</td>
            <td>{user.bodyType || '-'}</td>
          </tr>
          <tr>
            <td>Fitness Goals:</td>
            <td>{user.fitnessGoals || '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
