import { useCallback } from 'react';
import { userService } from '../services/userService';
import { useApi } from '../hooks/useApi';
import Loading from './common/Loading';
import Error from './common/Error';
import { User } from '../services/userService';

interface UserProp {
  clerkId: string;
}

const UserData = ({ clerkId }: UserProp) => {
  const getuser = useCallback(() => userService.getUser(clerkId), [clerkId]);
  const { data: user, loading, error } = useApi<User>(getuser);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!user) return <p>No workout user found</p>;

  return (
    <div className="user-data">
      <h2>Profile</h2>

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

      {/* New section for purchased workout plans */}
      <h3>Purchased Workout Plans</h3>
      <ul>
        {user.purchasedWorkoutPlans && user.purchasedWorkoutPlans.length > 0 ? (
          user.purchasedWorkoutPlans.map((plan, index) => (
            <li key={index}>{plan}</li>
          ))
        ) : (
          <li>No purchased workout plans found</li>
        )}
      </ul>

      {/* New section for payment history */}
      <h3>Payment History</h3>
      <ul>
        {user.paymentHistory && user.paymentHistory.length > 0 ? (
          user.paymentHistory.map((payment, index) => (
            <li key={index}>
              {new Date(payment.date).toLocaleDateString()} - {payment.amount}
            </li>
          ))
        ) : (
          <li>No payment history found</li>
        )}
      </ul>
    </div>
  );
};

export default UserData;
