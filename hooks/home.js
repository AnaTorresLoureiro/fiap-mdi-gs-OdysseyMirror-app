import { useRef, useState } from 'react';

import { natureSlides, spaceSlides } from '../data/data';

export function useHomeScreen() {
  const [mode, setMode] = useState('nature');
  const [activeIndex, setActiveIndex] = useState(0);

  const flatListRef = useRef(null);

  const slides = mode === 'nature' ? natureSlides : spaceSlides;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 60,
  }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  function handleChangeMode(selectedMode) {
    setMode(selectedMode);
    setActiveIndex(0);

    requestAnimationFrame(() => {
      flatListRef.current?.scrollToIndex({
        index: 0,
        animated: false,
      });
    });
  }

  return {
    mode,
    slides: slides ?? [],
    activeIndex,
    flatListRef,
    viewabilityConfig,
    onViewableItemsChanged,
    handleChangeMode,
  };
}