"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Certification Data
const certifications = [
  {
    id: 1,
    title: "Python (Basic)",
    issuer: "HackerRank",
    date: "June 2022",
    image: "https://images.unsplash.com/photo-1589330694653-b1838638c2e1?q=80&w=2670&auto=format&fit=crop", // Placeholder: Use real certificate image
    link: "#",
  },
  {
    id: 2,
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "August 2023",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=2670&auto=format&fit=crop", 
    link: "#",
  },
  {
    id: 3,
    title: "Meta Front-End Developer",
    issuer: "Coursera",
    date: "December 2023",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2671&auto=format&fit=crop",
    link: "#",
  },
  {
    id: 4,
    title: "JavaScript Algorithms",
    issuer: "FreeCodeCamp",
    date: "January 2024",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop",
    link: "#",
  },
  {
    id: 5,
    title: "UI/UX Design Specialization",
    issuer: "CalArts",
    date: "March 2024",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=2670&auto=format&fit=crop",
    link: "#",
  },
];

export function Certifications() {
  return (
    <div className="container py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Certificates</h2>
        <p className="text-muted-foreground">
          Validating my skills with industry-recognized certifications.
        </p>
      </div>

      <div className="mx-auto max-w-5xl">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          initialSlide={1} // Start with the second slide focused (looks nice)
          coverflowEffect={{
            rotate: 0, // No rotation for a cleaner look (like your image)
            stretch: 0, // Space between slides
            depth: 300, // Perspective depth (higher = smaller side slides)
            modifier: 1, // Effect multiplier
            slideShadows: false, // Disable shadows for cleaner flat design
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="mySwiper w-full py-12"
        >
          {certifications.map((cert) => (
            <SwiperSlide 
              key={cert.id} 
              className="w-[300px] sm:w-[400px] md:w-[500px]" // Fixed width is important for coverflow
            >
              {/* Certificate Card */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border-4 border-white bg-card shadow-2xl transition-all">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover"
                />
                
                {/* Optional Overlay with Info */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity hover:opacity-100 p-6 text-center text-white">
                  <h3 className="text-xl font-bold">{cert.title}</h3>
                  <p className="mt-2 text-sm font-medium text-gray-200">{cert.issuer}</p>
                  <p className="mt-1 text-xs text-primary">{cert.date}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styles for Swiper Navigation (Orange Theme) */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: hsl(var(--primary)); /* Orange Arrows */
          background: hsl(var(--background));
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border: 1px solid hsl(var(--border));
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        .swiper-pagination-bullet-active {
          background: hsl(var(--primary));
        }
      `}</style>
    </div>
  );
}
