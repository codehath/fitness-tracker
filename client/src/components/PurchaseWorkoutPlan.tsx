import React, { useEffect, useState } from 'react';
import { paymentService } from '../services/paymentService';
import { WorkoutPlan } from '../services/workoutPlanService';
import { useUser } from '@clerk/clerk-react';
import { userService } from '../services/userService'; // Import userService

interface PurchaseWorkoutPlanProps {
  plan: WorkoutPlan;
}

const PurchaseWorkoutPlan: React.FC<PurchaseWorkoutPlanProps> = ({ plan }) => {
  const { user } = useUser();
  const [hasPurchased, setHasPurchased] = useState<boolean>(false);

  useEffect(() => {
    const checkPurchaseStatus = async () => {
      if (user) {
        const userData = await userService.getUser(user.id);
        setHasPurchased(
          userData.purchasedWorkoutPlans?.includes(plan._id) || false
        );
      }
    };

    checkPurchaseStatus();
  }, [user, plan._id]);

  const handlePurchase = async () => {
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    try {
      await paymentService.purchaseWorkoutPlan(
        plan._id,
        plan.price * 100,
        user.id
      );
    } catch (error) {
      console.error('Error purchasing:', error);
    }
  };

  return (
    <div>
      {hasPurchased ? (
        <p>Plan Purchased.</p>
      ) : (
        <button onClick={handlePurchase} className="btn btn-primary">
          Purchase Plan
        </button>
      )}
    </div>
  );
};

export default PurchaseWorkoutPlan;
