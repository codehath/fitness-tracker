import React from 'react';
import WorkoutPlanName from './WorkoutPlanName';

interface PurchasedPlansProps {
  plans: string[];
}

const PurchasedPlans: React.FC<PurchasedPlansProps> = ({ plans }) => {
  return (
    <div>
      <h3>Purchased Workout Plans</h3>
      <ul>
        {plans.length > 0 ? (
          plans.map((plan, index) => (
            <li key={index}>
              <WorkoutPlanName planId={plan} />
            </li>
          ))
        ) : (
          <li>No purchased workout plans found</li>
        )}
      </ul>
    </div>
  );
};

export default PurchasedPlans;
