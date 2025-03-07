// src/app/page.tsx
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('pages/login');
    } else {
      router.push('pages/dashboard');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold">Chargement...</h1>
    </div>
  );
}
