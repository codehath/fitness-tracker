import { useEffect, useCallback } from 'react';
import { userService } from '../services/userService';
import { useApi } from '../hooks/useApi';
import Loading from './common/Loading';
import Error from './common/Error';
import { User } from '../services/userService';

interface UserProp {
  userId: string;
}

const UserData = ({ userId }: UserProp) => {
  const getLog = useCallback(() => userService.getUser(userId), [userId]);

  const { data: log, loading, error, execute: fetchLog } = useApi<User>(getLog);

  useEffect(() => {
    fetchLog();
  }, [fetchLog]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!log) return <p>No workout log found</p>;

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '12px 0',
      }}
      className="user-data"
    >
      <h3>{log.name}'s Profile</h3>

      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ textAlign: 'left', padding: '8px' }}>Email:</td>
            <td style={{ textAlign: 'left', padding: '8px' }}>{log.email}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', padding: '8px' }}>Age:</td>
            <td style={{ textAlign: 'left', padding: '8px' }}>
              {log.age || '-'}
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', padding: '8px' }}>Gender:</td>
            <td style={{ textAlign: 'left', padding: '8px' }}>{log.gender}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', padding: '8px' }}>Height:</td>
            <td style={{ textAlign: 'left', padding: '8px' }}>
              {log.height ? `${log.height} cm` : '-'}
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', padding: '8px' }}>Weight:</td>
            <td style={{ textAlign: 'left', padding: '8px' }}>
              {log.weight ? `${log.weight} kg` : '-'}
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', padding: '8px' }}>Body Type:</td>
            <td style={{ textAlign: 'left', padding: '8px' }}>
              {log.bodyType}
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', padding: '8px' }}>
              Fitness Goals:
            </td>
            <td style={{ textAlign: 'left', padding: '8px' }}>
              {log.fitnessGoals || '-'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
