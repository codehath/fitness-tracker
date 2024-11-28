import React from 'react';
import { paymentService } from '../services/paymentService';
import { WorkoutPlan } from '../services/workoutPlanService';
import { useUser } from '@clerk/clerk-react';

interface PurchaseWorkoutPlanProps {
  plan: WorkoutPlan;
}

const PurchaseWorkoutPlan: React.FC<PurchaseWorkoutPlanProps> = ({ plan }) => {
  const { user } = useUser();

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
      <h3>{plan.name}</h3>
      <p>Price: £{plan.price}</p>
      <button onClick={handlePurchase} className="btn btn-primary">
        Purchase Plan
      </button>
    </div>
  );
};

export default PurchaseWorkoutPlan;
