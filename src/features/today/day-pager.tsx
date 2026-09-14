import { Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { FlatList, useWindowDimensions, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

import { useDailyGoals } from '@/db/daily-goals';

import { daysBetween, shiftDate, todayDate } from './dates';
import { DayPage } from './day-page';
import { DaySwitcher } from './day-switcher';

// A fixed range that feels endless: about 27 years before and after today.
const PAGE_COUNT = 20_001;
const TODAY_INDEX = 10_000;
const pages = Array.from({ length: PAGE_COUNT }, (_, index) => index);

export function DayPager() {
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<number>>(null);
  const [anchorDate] = useState(todayDate);
  const [index, setIndex] = useState(TODAY_INDEX);
  const { goals } = useDailyGoals();

  const dateAt = (pageIndex: number) => shiftDate(anchorDate, pageIndex - TODAY_INDEX);

  function goTo(pageIndex: number) {
    const clamped = Math.min(Math.max(pageIndex, 0), PAGE_COUNT - 1);

    // An animated jump over many pages shows blank pages on the way.
    const animated = Math.abs(clamped - index) <= 1;

    setIndex(clamped);
    listRef.current?.scrollToIndex({ index: clamped, animated });
  }

  function handleMomentumScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    setIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerLargeTitle: false,
          headerTitle: () => (
            <DaySwitcher
              date={dateAt(index)}
              onPrevious={() => goTo(index - 1)}
              onNext={() => goTo(index + 1)}
              onToday={() => goTo(TODAY_INDEX + daysBetween(anchorDate, todayDate()))}
            />
          ),
        }}
      />

      <FlatList
        ref={listRef}
        data={pages}
        extraData={goals}
        horizontal
        pagingEnabled
        contentInsetAdjustmentBehavior="never"
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item)}
        getItemLayout={(_, itemIndex) => ({ length: width, offset: width * itemIndex, index: itemIndex })}
        initialScrollIndex={TODAY_INDEX}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => <DayPage date={dateAt(item)} goals={goals} width={width} />}
      />
    </>
  );
}
