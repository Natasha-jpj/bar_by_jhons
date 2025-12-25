'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import './BlobCursor.css';

interface BlobCursorProps {
  blobType?: 'circle' | 'square';
  fillColor?: string;
  trailCount?: number;
  sizes?: number[];
  innerSizes?: number[];
  innerColor?: string;
  opacities?: number[];
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  filterId?: string;
  filterStdDeviation?: number;
  filterColorMatrixValues?: string;
  useFilter?: boolean;
  fastDuration?: number;
  slowDuration?: number;
  fastEase?: string;
  slowEase?: string;
  zIndex?: number;
}

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#f59e0b',
  trailCount = 3,
  sizes = [50, 90, 65],
  innerSizes = [18, 30, 22],
  innerColor = 'rgba(255,255,255,0.8)',
  opacities = [0.6, 0.5, 0.4],
  shadowColor = 'rgba(245, 158, 11, 0.4)',
  shadowBlur = 20,
  shadowOffsetX = 0,
  shadowOffsetY = 0,
  filterId = 'blob',
  filterStdDeviation = 35,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -8',
  useFilter = true,
  fastDuration = 0,
  slowDuration = 0.6,
  fastEase = 'none',
  slowEase = 'power1.out',
  zIndex = 9999
}: BlobCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isInPackagesSection, setIsInPackagesSection] = useState(false);

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      // Check if mouse is in packages section
      const packagesSection = document.getElementById('packages');
      if (packagesSection) {
        const rect = packagesSection.getBoundingClientRect();
        const inSection = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
        setIsInPackagesSection(inSection);
        
        if (!inSection) return;
      }

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x,
          y: y,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase
        });
      });
    },
    [fastDuration, slowDuration, fastEase, slowEase]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e);
    const handleTouchMove = (e: TouchEvent) => handleMove(e);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMove]);

  return (
    <div
      ref={containerRef}
      className="blob-container"
      style={{ 
        zIndex,
        opacity: isInPackagesSection ? 1 : 0,
        pointerEvents: isInPackagesSection ? 'none' : 'none'
      }}
    >
      {useFilter && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id={filterId}>
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
              <feColorMatrix in="blur" values={filterColorMatrixValues} />
            </filter>
          </defs>
        </svg>
      )}

      <div className="blob-main">
        {/* Trail blobs with filter */}
        <div style={{ filter: useFilter ? `url(#${filterId})` : undefined }}>
          {Array.from({ length: trailCount }).slice(1).map((_, idx) => {
            const i = idx + 1;
            return (
              <div
                key={i}
                ref={el => (blobsRef.current[i] = el)}
                className="blob"
                style={{
                  width: sizes[i],
                  height: sizes[i],
                  borderRadius: '50%',
                  backgroundColor: fillColor,
                  opacity: opacities[i],
                  boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`
                }}
              >
                <div
                  className="inner-dot"
                  style={{
                    width: innerSizes[i],
                    height: innerSizes[i],
                    top: (sizes[i] - innerSizes[i]) / 2,
                    left: (sizes[i] - innerSizes[i]) / 2,
                    backgroundColor: innerColor,
                    borderRadius: '50%'
                  }}
                />
              </div>
            );
          })}
        </div>
        
        {/* Main cursor with text - no filter */}
        <div
          ref={el => (blobsRef.current[0] = el)}
          className="blob"
          style={{
            width: 90,
            height: 90,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 250, 240, 0.95)',
            opacity: 1,
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            color: '#1a1a1a',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontFamily: '"Playfair Display", serif',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none'
          }}>
            View More
          </span>
        </div>
      </div>
    </div>
  );
}
