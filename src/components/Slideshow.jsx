import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

//These are just temp images
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
        const scrollAmount = 1;
        let animationFrame;

        const autoScroll = () => {
            if (!isPaused && container) {
                container.scrollLeft += scrollAmount;

                const totalWidth = container.scrollWidth / 2;
                if (container.scrollLeft >= totalWidth) {
                    container.scrollLeft = 0;
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
                right: '50%',
                marginLeft: '-50vw',
                marginRight: '-50vw',
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
                        width: '100%',
                        objectFit: 'cover',
                        flexShrink: 0,
                        ml: index === 0 ? 0 : 1,
                        mr: index === images.length * 2 - 1 ? 0 : 1,
                        borderRadius: 2,
                    }}
                />
            ))}
        </Box>
    );
};

export default Slideshow;
