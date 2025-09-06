'use client'

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

import burgerImg from '@/assets/burger.jpg';
import curryImg from '@/assets/curry.jpg';
import dumplingsImg from '@/assets/dumplings.jpg';
import macncheeseImg from '@/assets/macncheese.jpg';
import pizzaImg from '@/assets/pizza.jpg';
import schnitzelImg from '@/assets/schnitzel.jpg';
import tomatoSaladImg from '@/assets/tomato-salad.jpg';
import classes from './image-slideshow.module.css';

const images = [
    { image: burgerImg, alt: 'A delicious, juicy burger' },
    { image: curryImg, alt: 'A delicious, spicy curry' },
    { image: dumplingsImg, alt: 'Steamed dumplings' },
    { image: macncheeseImg, alt: 'Mac and cheese' },
    { image: pizzaImg, alt: 'A delicious pizza' },
    { image: schnitzelImg, alt: 'A delicious schnitzel' },
    { image: tomatoSaladImg, alt: 'A delicious tomato salad' },
];

export default function ImageSlideshow() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        startInterval();
        return () => clearInterval(intervalRef.current);
      }, []);
      
      const startInterval = () => {
        intervalRef.current = setInterval(() => {
          setCurrentImageIndex(prev => (prev + 1) % images.length);
        }, 5000);
      };
      
      const goNext = () => {
        setCurrentImageIndex(prev => (prev + 1) % images.length);
        clearInterval(intervalRef.current);
        startInterval();
      };
      
      const goPrev = () => {
        setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
        clearInterval(intervalRef.current);
        startInterval();
      };

    return (
        <>
            <div className={classes.slideshow}>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image.image}
                        className={index === currentImageIndex ? classes.active : ''}
                        alt={image.alt}
                    />
                ))}

            </div>
            <div className={classes.actions}>
                <button onClick={goPrev}>&#10094;</button>
                <button onClick={goNext}> &#10095;</button>
            </div>
        </>
    );
}