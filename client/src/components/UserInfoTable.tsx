import React from 'react';

interface User {
  name?: string;
  email: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  bodyType?: string;
  fitnessGoals?: string;
}

interface UserInfoTableProps {
  user: User;
}

const UserInfoTable: React.FC<UserInfoTableProps> = ({ user }) => {
  return (
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
  );
};

export default UserInfoTable;
