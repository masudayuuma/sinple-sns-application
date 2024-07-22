'use client';

import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms';

const MyPage = () => {
  const user = useRecoilValue(userState);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">My Page</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* その他のユーザー情報 */}
    </div>
  );
};

export default MyPage;
