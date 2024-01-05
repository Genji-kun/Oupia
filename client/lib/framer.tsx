import React, { useEffect, useRef, useState } from 'react';

import { Tab } from '@/hooks/use-tabs';
import { AnimatePresence, motion } from 'framer-motion';

const transition = {
    type: 'tween',
    ease: 'easeOut',
    duration: 0.15,
};

type Props = {
    selectedTabIndex: number;
    tabs: Tab[];
    setSelectedTab: (input: [number, number]) => void;
};

const Tabs = ({
    tabs,
    selectedTabIndex,
    setSelectedTab,
}: Props): JSX.Element => {
    const [buttonRefs, setButtonRefs] = useState<Array<HTMLButtonElement | null>>(
        [],
    );

    useEffect(() => {
        setButtonRefs((prev) => prev.slice(0, tabs.length));
    }, [tabs.length]);

    const navRef = useRef<HTMLDivElement>(null);
    const navRect = navRef.current?.getBoundingClientRect();

    const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect();

    const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null);
    const hoveredRect =
        buttonRefs[hoveredTabIndex ?? -1]?.getBoundingClientRect();

    return (
        <nav
            ref={navRef}
            className="flex flex-shrink-0 justify-center items-center relative z-0 py-2"
            onPointerLeave={(e) => setHoveredTabIndex(null)}
        >
            {tabs.map((item, i) => {
                return (
                    <motion.button
                        key={i}
                        className={' relative rounded-md flex items-center h-10 px-4 z-20 bg-transparent  cursor-pointer select-none transition-colors mb-0.5'}
                        ref={(el) => (buttonRefs[i] = el)}
                        onPointerEnter={() => {
                            setHoveredTabIndex(i);
                        }}
                        onFocus={() => {
                            setHoveredTabIndex(i);
                        }}
                        onClick={() => {
                            setSelectedTab([i, i > selectedTabIndex ? 1 : -1]);
                        }}
                    >
                        {item.label}
                    </motion.button>
                );
            })}

            <AnimatePresence>
                {hoveredRect && navRect && (
                    <motion.div
                        key={'hover'}
                        className="absolute p-1 mb-1 z-10 top-0 left-0 rounded-md bg-zinc-200 dark:bg-zinc-800 "
                        initial={{
                            x: hoveredRect.left - navRect.left,
                            y: hoveredRect.top - navRect.top,
                            width: hoveredRect.width,
                            height: hoveredRect.height,
                            opacity: 0,
                        }}
                        animate={{
                            x: hoveredRect.left - navRect.left,
                            y: hoveredRect.top - navRect.top,
                            width: hoveredRect.width,
                            height: hoveredRect.height,
                            opacity: 1,
                        }}
                        exit={{
                            x: hoveredRect.left - navRect.left,
                            y: hoveredRect.top - navRect.top,
                            width: hoveredRect.width,
                            height: hoveredRect.height,
                            opacity: 0,
                        }}
                        transition={transition}
                    />
                )}
            </AnimatePresence>

            {selectedRect && navRect && (
                <motion.div
                    className={
                        'absolute z-10 bottom-0 left-0.5 h-[3px] bg-primary-500'
                    }
                    initial={false}
                    animate={{
                        width: selectedRect.width * 0.8,
                        x: `calc(${selectedRect.left - navRect.left}px + 10%)`,
                        opacity: 1,
                    }}
                    transition={transition}
                />
            )}
        </nav>
    );
};

export const Framer = { Tabs };