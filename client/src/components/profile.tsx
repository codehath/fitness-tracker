import { useCallback } from 'react';
import { userService } from '../services/userService';
import { useApi } from '../hooks/useApi';
import Loading from './common/Loading';
import Error from './common/Error';
import UserInfoTable from './UserInfoTable';
import PurchasedPlans from './PurchasedPlans';
import PaymentHistory from './PaymentHistory';
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
      <UserInfoTable user={user} />
      <PurchasedPlans plans={user.purchasedWorkoutPlans || []} />
      <PaymentHistory
        payments={
          user.paymentHistory?.map((payment) => ({
            ...payment,
            date: payment.date.toString(),
          })) || []
        }
      />
    </div>
  );
};

export default UserData;
