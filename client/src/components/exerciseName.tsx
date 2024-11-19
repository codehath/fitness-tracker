import { useEffect, useState } from 'react';
import { exerciseService } from '../services/exerciseService';

interface ExerciseNameProps {
  exerciseId: string;
}

const ExerciseName = ({ exerciseId }: ExerciseNameProps) => {
  const [exerciseName, setExerciseName] = useState<string>('');

  useEffect(() => {
    exerciseService
      .getExercise(exerciseId)
      .then((data) =>
        setExerciseName(
          data.name
            .split(' ') // Split only on spaces
            .map((word: string) => {
              // Handle words that may contain dashes
              if (word.includes('-')) {
                return word
                  .split('-')
                  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                  .join('-');
              }
              return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ')
        )
      )
      .catch((err) => {
        console.error('Error Fetching Exercise:', err);
        setExerciseName(exerciseId); // Fallback to ID if fetch fails
      });
  }, [exerciseId]);

  return <>{exerciseName || exerciseId}</>;
};

export default ExerciseName;
