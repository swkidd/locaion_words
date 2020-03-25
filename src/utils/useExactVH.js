// makes var --vh available for use as css varaible
/*
.my-element {
  height: 100vh; // Fallback for browsers that do not support Custom Properties 
  height: calc(var(--vh, 1vh) * 100);
}
*/

import { useState, useEffect } from 'react';

const getHeight = () => window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

export default function useExactVH() {
    useEffect(() => {
        const resizeListener = () => {
            let vh = getHeight() * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        window.addEventListener('resize', resizeListener);
        var evt = window.document.createEvent('UIEvents'); 
        evt.initUIEvent('resize', true, false, window, 0); 
        window.dispatchEvent(evt);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [])
}
