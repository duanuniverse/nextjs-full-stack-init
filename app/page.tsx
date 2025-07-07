'use client';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function HomePage() {
  // const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch('/api/users')
  //     .then(res => res.json())
  //     .then(data => {
  //       setUsers(data);
  //       setLoading(false);
  //     });
  // }, []);
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data: users, isLoading } = useSWR<User[]>('/api/users', fetcher);

  return (
    <main className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">用户列表</h1>
      {isLoading ? (
        <div className="text-gray-500">加载中...</div>
      ) : (
        <ul className="space-y-2">
          {users?.map(user => (
            <li key={user.id} className="p-4 bg-white rounded shadow flex flex-col">
              <span className="font-bold">{user.name}</span>
              <span className="text-gray-600">{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}