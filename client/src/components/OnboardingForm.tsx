import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  age: string;
  weight: string;
  height: string;
  gender: string;
  bodyType: string;
  fitnessGoals: string;
}

function OnboardingForm() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    age: '',
    weight: '',
    height: '',
    gender: '',
    bodyType: '',
    fitnessGoals: '',
  });

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/v1/webhooks/clerk/users/${user?.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      navigate('/');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const ProgressBar = () => (
    <div>
      <div style={{ width: `${(step / 6) * 100}%` }} />
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>Question {step} of 6</h2>
            <h3>What's your age?</h3>
            <input
              type="number"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              required
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Question {step} of 6</h2>
            <h3>What's your weight (in kg)?</h3>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) =>
                setFormData({ ...formData, weight: e.target.value })
              }
              required
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Question {step} of 6</h2>
            <h3>What's your height (in cm)?</h3>
            <input
              type="number"
              value={formData.height}
              onChange={(e) =>
                setFormData({ ...formData, height: e.target.value })
              }
              required
            />
          </div>
        );
      case 4:
        return (
          <div>
            <h2>Question {step} of 6</h2>
            <h3>What's your gender?</h3>
            <div>
              <button
                onClick={() => setFormData({ ...formData, gender: 'Male' })}
              >
                Male
              </button>
              <button
                onClick={() => setFormData({ ...formData, gender: 'Female' })}
              >
                Female
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h2>Question {step} of 6</h2>
            <h3>What's your body type?</h3>
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
                      key={type}
                      onClick={() =>
                        setFormData({ ...formData, bodyType: type })
                      }
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
                        key={type}
                        onClick={() =>
                          setFormData({ ...formData, bodyType: type })
                        }
                      >
                        {type}
                      </button>
                    )
                  )}
                </>
              )}
            </div>
          </div>
        );
      case 6:
        return (
          <div>
            <h2>Question {step} of 6</h2>
            <h3>What are your fitness goals?</h3>
            <input
              type="text"
              value={formData.fitnessGoals}
              onChange={(e) =>
                setFormData({ ...formData, fitnessGoals: e.target.value })
              }
              required
            />
          </div>
        );
    }
  };

  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return !formData.age;
      case 2:
        return !formData.weight;
      case 3:
        return !formData.height;
      case 4:
        return !formData.gender;
      case 5:
        return !formData.bodyType;
      case 6:
        return !formData.fitnessGoals;
      default:
        return false;
    }
  };

  return (
    <div>
      <h1>Tell us about yourself</h1>
      <ProgressBar />
      {renderStep()}
      <div>
        <button onClick={handleBack} disabled={step === 1}>
          Back
        </button>
        <button onClick={handleNext} disabled={isNextDisabled()}>
          {step === 6 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default OnboardingForm;
