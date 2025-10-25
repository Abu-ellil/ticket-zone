import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function EventDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1>Event Details for Event ID: {id}</h1>
        {/* You can fetch and display event details here */}
      </main>
      <Footer />
    </div>
  );
}