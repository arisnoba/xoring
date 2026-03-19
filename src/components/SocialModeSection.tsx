"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function SocialModeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ringContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const ring = ringContainerRef.current;

    if (!section || !ring) return;

    // Pin the ring element while scrolling through the section
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 10%", // When the top of the section comes near the top of the viewport
      end: "bottom 80%", // Until the bottom of the section reaches the bottom
      pin: ring, // Pin the ring element
      pinSpacing: false, // Don't add extra space as it overlays
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const cards = [
    {
      title: "Partner Matching",
      description: "XO connects you with users who share your lifestyle and workout routines in real-time. If they're nearby, give a ring 'Bump'. If they're far, connect via the app and work out together.",
      image: "/images/social-mode/partner-matching.jpg"
    },
    {
      title: "Social Community",
      description: "From your neighborhood to the other side of the globe. Build a community with people who match your vibe. Join offline meetups happening worldwide every day.",
      image: "/images/social-mode/social-community.jpg"
    },
    {
      title: "Couple Mode",
      description: "Check in on your loved ones safely, even on busy days. It's not about tracking; it's a gentle way to share your day, entirely on your terms.",
      image: "/images/social-mode/couple-mode.jpg"
    },
    {
      title: "Location Sharing",
      description: "Includes real-time location tracking and sharing for the safety of children and the elderly, allowing users to monitor health status, detect emergencies, and identify abnormal location changes.",
      image: "/images/social-mode/location-sharing.jpg"
    }
  ];

  return (
    <section ref={sectionRef} className="relative w-full min-h-[120vh] bg-[#e5e5e5] py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background Image/Pattern */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20 -z-10 bg-[url('/images/social-mode/runners-bg.jpg')] bg-cover bg-center grayscale mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 relative w-full h-full">
        
        {/* Left Side: Pinned Ring Element */}
        <div className="w-full lg:w-[35%] flex flex-col relative h-full">
          {/* GSAP Target for Pinning */}
          <div ref={ringContainerRef} className="flex flex-col gap-6 py-10 lg:py-20 z-10 will-change-transform">
            {/* Badge */}
            <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-[0.2em] text-[#8a8a8a]">
              <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#8a8a8a]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#111]"></span>
              </span>
              SOCIAL MODE
            </div>
            
            {/* Ring Image Element Placeholder styling if image is missing */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 -ml-4 md:-ml-8 transition-transform duration-500 hover:scale-105 mt-8">
              <div className="w-full h-full rounded-full border-[32px] md:border-[40px] border-[#1d1d1f] shadow-2xl flex items-center justify-center relative bg-gradient-to-br from-[#2c2c2e] to-black ring-1 ring-white/10">
               <div className="absolute top-8 right-8 w-8 h-8 rounded-full border border-[#444] shadow-inner bg-[#1a1a1a]"></div>
              </div>
              
              {/* Actual Image Tag (Assuming it will be uploaded properly) */}
              <Image 
                src="/images/social-mode/social-mode-ring.png" 
                alt="XO Ring Social Mode" 
                fill 
                className="object-contain drop-shadow-2xl z-10" 
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Scrollable Content & Carousel */}
        <div className="w-full lg:w-[65%] flex flex-col pt-10 lg:pt-24 pb-32 z-20 overflow-visible">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-[#111] leading-[1.1] mb-8">
            A connected world <br className="hidden md:block" />
            at your fingertips
          </h2>
          
          <p className="text-lg md:text-xl text-[#333] font-semibold max-w-2xl leading-relaxed mb-20 md:mb-32">
            True social networks exist in shared rhythms and breaths, <br className="hidden md:block"/>
            not on screens.
          </p>

          {/* Swiper Carousel Area */}
          <div className="w-[100vw] lg:w-[150%] xl:w-[200%] max-w-none relative -ml-4 md:-ml-8 lg:ml-0 overflow-visible">
            <Swiper
              spaceBetween={16}
              slidesPerView={1.2}
              breakpoints={{
                640: { slidesPerView: 2.2, spaceBetween: 24 },
                1024: { slidesPerView: 2.5, spaceBetween: 32 },
                1280: { slidesPerView: 3.2, spaceBetween: 32 },
              }}
              className="w-full pb-16 pt-4"
              grabCursor={true}
            >
              {cards.map((card, idx) => (
                <SwiperSlide key={idx} className="h-auto">
                  <div className="flex flex-col bg-[#f5f5f7]/90 backdrop-blur-sm rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-white/50 group">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e5e5e5]">
                      <Image 
                        src={card.image} 
                        alt={card.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-[#111] mb-4">{card.title}</h3>
                      <p className="text-sm md:text-base text-[#555] leading-relaxed font-medium">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

      </div>
    </section>
  );
}
