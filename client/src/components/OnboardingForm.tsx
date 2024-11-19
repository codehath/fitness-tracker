import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';

interface FormData {
  age: string;
  weight: string;
  height: string;
  gender: string;
  bodyType: string;
  fitnessGoals: string;
}

interface Question {
  title: string;
  type: 'number' | 'text' | 'gender' | 'bodyType';
  field: keyof FormData;
  options?: string[];
  placeholder?: string;
}

function OnboardingForm() {
  const { user } = useUser();
  const clerkId = user?.id;

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

  const questions: Question[] = [
    {
      title: 'Age',
      type: 'number',
      field: 'age',
      placeholder: 'Enter your age',
    },
    {
      title: 'Weight (kg)',
      type: 'number',
      field: 'weight',
      placeholder: 'Enter your weight in kg',
    },
    {
      title: 'Height (cm)',
      type: 'number',
      field: 'height',
      placeholder: 'Enter your height in cm',
    },
    {
      title: 'Gender',
      type: 'gender',
      field: 'gender',
      options: ['Male', 'Female'],
    },
    {
      title: 'Body Type',
      type: 'bodyType',
      field: 'bodyType',
      options:
        formData.gender === 'Male'
          ? [
              'Slim',
              'Skinny Fat',
              'Average',
              'Athletic',
              'Muscular',
              'Overweight',
            ]
          : ['Slim', 'Average', 'Toned', 'Curvy', 'Overweight'],
    },
    {
      title: 'Fitness Goals',
      type: 'text',
      field: 'fitnessGoals',
      placeholder: 'Enter your fitness goals',
    },
  ];

  const handleNext = () => {
    if (step < questions.length) {
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
      const processedFormData = {
        ...formData,
        age: parseInt(formData.age),
        weight: parseInt(formData.weight),
        height: parseInt(formData.height),
      };

      await userService.updateUser(clerkId!, processedFormData);
      navigate('/');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === 'gender' || field === 'bodyType') {
      handleNext();
    }
  };

  const ProgressBar = () => (
    <div
      style={{
        width: '100%',
        backgroundColor: '#e0e0e0',
        height: '10px',
        borderRadius: '5px',
      }}
    >
      <div
        style={{
          width: `${(step / questions.length) * 100}%`,
          backgroundColor: '#8700a3',
          height: '100%',
          borderRadius: '5px',
          transition: 'width 0.3s ease-in-out',
        }}
      />
    </div>
  );

  const renderQuestion = (question: Question) => {
    const { title, type, field, options, placeholder } = question;

    return (
      <div>
        <h2>
          {step} / {questions.length}
        </h2>
        <h3>{title}</h3>
        {type === 'number' || type === 'text' ? (
          <input
            type={type}
            value={formData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={placeholder}
            required
          />
        ) : type === 'gender' ? (
          <div>
            {options?.map((option) => (
              <button
                key={option}
                onClick={() => handleInputChange(field, option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : type === 'bodyType' ? (
          <div>
            {options?.map((type) => (
              <button key={type} onClick={() => handleInputChange(field, type)}>
                {type}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <ProgressBar />
      {renderQuestion(questions[step - 1])}
      <div>
        <button onClick={handleBack} disabled={step === 1}>
          Back
        </button>
        {(questions[step - 1].type === 'number' ||
          questions[step - 1].type === 'text') && (
          <button
            onClick={handleNext}
            disabled={!formData[questions[step - 1].field]}
          >
            {step === questions.length ? 'Finish' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
}

export default OnboardingForm;
