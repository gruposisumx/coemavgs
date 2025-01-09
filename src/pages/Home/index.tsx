import React from 'react';
import { ViolenceCarousel } from './components/ViolenceCarousel';
import { EventsSection } from './components/EventsSection';
import { PopularPosts } from './components/PopularPosts';
import { ContactSection } from './components/ContactSection';

export function Home() {
  return (
    <div>
      <ViolenceCarousel />
      <EventsSection />
      <PopularPosts />
      <ContactSection />
    </div>
  );
}