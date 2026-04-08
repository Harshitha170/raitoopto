import React from 'react';
import Hero from '../components/HomeSections/Hero';
import Ticker from '../components/Ticker';
import AboutSection from '../components/HomeSections/AboutSection';
import ServicesSection from '../components/HomeSections/ServicesSection';
import ZeroDowntime from '../components/HomeSections/ZeroDowntime';
import ServiceProcess from '../components/HomeSections/ServiceProcess';
import Brands from '../components/HomeSections/Brands';
import Testimonials from '../components/HomeSections/Testimonials';
import GlobalWings from '../components/HomeSections/GlobalWings';
import CTA from '../components/HomeSections/CTA';

function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <AboutSection />
      <ServicesSection />
      <ZeroDowntime />
      <ServiceProcess />
      <Brands />
      <Testimonials />
      <GlobalWings />
      <CTA />
    </>
  );
}

export default Home;