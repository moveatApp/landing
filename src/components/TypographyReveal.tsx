import { useRef, forwardRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Simple cn utility
function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export interface TypographyRevealProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  revealType?: 'word' | 'line' | 'character';
  animationType?: 'fadeInUp' | 'blurIn' | 'flipIn' | 'colorizeIn';
  fromDirection?: 'top' | 'bottom' | 'left' | 'right';
  mutedColor?: string;
  duration?: number;
  stagger?: number;
  start?: string;
  end?: string;
  ease?: string;
}

const TypographyReveal = forwardRef<
  HTMLParagraphElement,
  TypographyRevealProps
>(
  (
    {
      children,
      className,
      revealType = 'word',
      animationType = 'fadeInUp',
      fromDirection = 'bottom',
      mutedColor = '#94a3b8',
      duration = 0.5,
      stagger = 0.04,
      start = 'top 85%',
      end = 'bottom 50%',
      ease = 'power3.out',
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLParagraphElement>(null);
    const textToRender = typeof children === 'string' ? children : '';

    useGSAP(
      () => {
        const targets = {
          word: '.reveal-word',
          line: '.reveal-line',
          character: '.reveal-character',
        }[revealType];
        
        const elements = gsap.utils.toArray(targets, containerRef.current);
        if (elements.length === 0) return;

        if (animationType === 'colorizeIn') {
          gsap.set(elements, { color: mutedColor });
          gsap.to(elements, {
            color: 'inherit',
            stagger: stagger,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: start,
              end: end,
              scrub: true,
            },
          });
          return;
        }

        const animationVars: gsap.TweenVars = {
          opacity: 1,
          duration,
          ease,
          stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start: start,
            once: true,
          },
        };

        switch (animationType) {
          case 'blurIn':
            animationVars.filter = 'blur(0px)';
            break;
          case 'flipIn':
            animationVars.rotateX = 0;
            break;
          case 'fadeInUp':
          default:
            if (fromDirection === 'left' || fromDirection === 'right') {
              animationVars.x = 0;
            } else {
              animationVars.y = 0;
            }
            break;
        }
        gsap.to(elements, animationVars);
      },
      {
        scope: containerRef,
        dependencies: [textToRender, revealType, animationType, fromDirection, end],
      }
    );

    const getPreAnimationClasses = () => {
      if (animationType === 'colorizeIn') return '';
      let classes = 'opacity-0 will-change-transform';
      switch (animationType) {
        case 'blurIn':
          return (classes += ' blur-sm');
        case 'flipIn':
          return (classes += '');
        case 'fadeInUp':
        default:
          switch (fromDirection) {
            case 'top':
              return (classes += ' -translate-y-full');
            case 'left':
              return (classes += ' -translate-x-full');
            case 'right':
              return (classes += ' translate-x-full');
            case 'bottom':
            default:
              return (classes += ' translate-y-full');
          }
      }
    };

    const renderContent = () => {
      const preAnimationClasses = getPreAnimationClasses();
      const unitClass = `inline-block ${preAnimationClasses}`;
      const lineUnitClass = `block ${preAnimationClasses}`;

      switch (revealType) {
        case 'character': {
          const words = textToRender.split(' ');
          return words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {word.split('').map((char, i) => (
                <span
                  key={i}
                  className={cn(
                    'inline-block align-bottom',
                    animationType !== 'colorizeIn' && animationType !== 'fadeInUp' && 'overflow-hidden'
                  )}
                  style={{ lineHeight: '1.4' }}
                >
                  <span
                    className={`reveal-character ${unitClass}`}
                    style={animationType === 'flipIn' ? { transformOrigin: 'bottom center', transform: 'rotateX(-90deg)', display: 'inline-block' } : { display: 'inline-block' }}
                  >
                    {char}
                  </span>
                </span>
              ))}
              {wordIndex < words.length - 1 && (
                <span
                  className={cn(
                    'inline-block align-bottom',
                    animationType !== 'colorizeIn' && animationType !== 'fadeInUp' && 'overflow-hidden'
                  )}
                  style={{ lineHeight: '1.4' }}
                >
                  <span
                    className={`reveal-character ${unitClass}`}
                    style={animationType === 'flipIn' ? { transformOrigin: 'bottom center', transform: 'rotateX(-90deg)', display: 'inline-block' } : { display: 'inline-block' }}
                  >
                    {'\u00A0'}
                  </span>
                </span>
              )}
            </span>
          ));
        }
        case 'line':
          return textToRender.split('\n').map((line, i) => (
            <span
              key={i}
              className={cn('block', animationType !== 'colorizeIn' && 'overflow-hidden')}
            >
              <span className={`reveal-line ${lineUnitClass}`}>
                {line.trim() === '' ? '\u00A0' : line}
              </span>
            </span>
          ));
        case 'word':
        default:
          return textToRender.split(' ').map((word, i, arr) => (
            <span key={i}>
              <span
                className={cn('inline-block', animationType !== 'colorizeIn' && 'overflow-hidden')}
              >
                <span className={`reveal-word ${unitClass}`}>{word}</span>
              </span>
              {i < arr.length - 1 && '\u00A0'}
            </span>
          ));
      }
    };

    return (
      <p
        ref={(el) => {
          containerRef.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLParagraphElement | null>).current = el;
        }}
        className={cn(
          animationType === 'flipIn' && '[perspective:800px]',
          className
        )}
        {...props}
        aria-label={textToRender}
      >
        {renderContent()}
      </p>
    );
  }
);
TypographyReveal.displayName = 'TypographyReveal';

export default TypographyReveal;
