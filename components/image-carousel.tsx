"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const MATI_PHOTOS = [
    "/mati/f1.jpg",
    "/mati/f2.jpg",
    "/mati/f3.jpg",
    "/mati/f4.jpg",
    "/mati/f5.jpg",
    "/mati/f6.jpg",
    "/mati/f7.jpg",
    "/mati/f8.jpg",
    "/mati/f9.jpg",
    "/mati/f10.jpg",
    "/mati/f11.jpg",
    "/mati/f12.jpg",
    "/mati/f13.jpg",
];

export function ImageCarousel() {
    const [index, setIndex] = useState(0);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            // Animate out
            gsap.to(imageRef.current, {
                opacity: 0,
                scale: 0.9,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    setIndex((prev) => (prev + 1) % MATI_PHOTOS.length);
                    // Animate in
                    gsap.fromTo(imageRef.current,
                        { opacity: 0, scale: 1.1 },
                        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
                    );
                }
            });
        }, 4500);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-64 w-64 md:h-80 md:w-80 overflow-hidden rounded-3xl shadow-2xl border-4 border-white/50 bg-white/20 backdrop-blur-sm">
            <div ref={imageRef} className="h-full w-full">
                <Image
                    src={MATI_PHOTOS[index]}
                    alt={`Memory ${index + 1}`}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
    );
}
