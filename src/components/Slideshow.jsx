import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

const images = [
    '/images/slide1.jpg',
    '/images/slide2.jpg',
    '/images/slide3.jpg',
];

const Slideshow = () => {
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const pauseTimeoutRef = useRef(null);

    useEffect(() => {
        const container = scrollRef.current;
        const scrollSpeed = 0.5;
        let animationFrame;

        const autoScroll = () => {
            if (!isPaused && container) {
                container.scrollLeft += scrollSpeed;

                const scrollWidth = container.scrollWidth;
                const totalScrollable = scrollWidth / 2;

                if (container.scrollLeft >= totalScrollable) {
                    container.scrollLeft -= totalScrollable;
                }
            }

            animationFrame = requestAnimationFrame(autoScroll);
        };

        animationFrame = requestAnimationFrame(autoScroll);
        return () => cancelAnimationFrame(animationFrame);
    }, [isPaused]);

    const handleUserInteraction = () => {
        setIsPaused(true);
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = setTimeout(() => {
            setIsPaused(false);
        }, 1000);
    };

    return (
        <Box
            ref={scrollRef}
            onMouseDown={handleUserInteraction}
            onTouchStart={handleUserInteraction}
            onWheel={handleUserInteraction}
            sx={{
                width: '100vw',
                position: 'relative',
                left: '50%',
                marginLeft: '-50vw',
                overflowX: 'scroll',
                display: 'flex',
                whiteSpace: 'nowrap',
                scrollBehavior: 'auto',
                height: { xs: 250, sm: 350, md: 450 },
                mb: 6,
                '&::-webkit-scrollbar': { height: 8 },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    borderRadius: 4,
                },
            }}
        >
            {[...images, ...images].map((src, index) => (
                <Box
                    key={index}
                    component="img"
                    src={src}
                    alt={`slide-${index}`}
                    sx={{
                        height: '100%',
                        width: '100vw',
                        objectFit: 'cover',
                        flexShrink: 0,
                        display: 'block',
                        userSelect: 'none',
                        pointerEvents: 'none',
                    }}
                    draggable={false}
                />
            ))}
        </Box>
    );
};

export default Slideshow;
