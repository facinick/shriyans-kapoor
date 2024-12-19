'use client';
import clsx from 'clsx';
import React, { ChangeEvent, useId } from 'react';

import { range } from '@/lib/helpers/utils';
import { LayoutGroup, LazyMotion, m, motion } from 'framer-motion';
import SliderControl from '../../SliderControl';
import { Card } from '../../ui/Card';
import styles from './DivisionGroupsDemo.module.css';
import Equation from './Equation';

interface Props {
  numOfItems: number;
  initialNumOfGroups: number;
  includeRemainderArea: boolean;
}

function DivisionGroupsDemo({
  numOfItems = 12,
  initialNumOfGroups = 1,
  includeRemainderArea,
}: Props) {
  const id = useId();

  const [numOfGroups, setNumOfGroups] = React.useState(initialNumOfGroups);

  const numOfItemsPerGroup = Math.floor(numOfItems / numOfGroups);

  const remainder = includeRemainderArea ? numOfItems % numOfGroups : 0;

  // When we're splitting into 1-3 groups, display side-by-side
  // columns. When we get to 4, it should switch to a 2x2 grid.
  const gridStructure =
    numOfGroups < 4
      ? {
          gridTemplateColumns: `repeat(${numOfGroups}, 1fr)`,
        }
      : {
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
        };

  return (
    <LayoutGroup>
      <Card className={styles.wrapper}>
        <header className={styles.header}>
          <SliderControl
            label='Number of Groups'
            className={styles.slider}
            step={1}
            min={1}
            max={4}
            defaultValue={[initialNumOfGroups]}
            value={[numOfGroups]}
            onValueChange={(v) => setNumOfGroups(v[0])}
          />
        </header>

        <div className={styles.demoWrapper}>
          <div className={clsx(styles.demoArea)} style={gridStructure}>
            {range(numOfGroups).map((groupIndex) => (
              <div key={groupIndex} className={styles.group}>
                {range(numOfItemsPerGroup).map((index) => {
                  const consistentId = `${id}-${
                    groupIndex * numOfItemsPerGroup + index
                  }`;

                  return (
                    <motion.div
                      layoutId={consistentId}
                      data-key={consistentId}
                      key={consistentId}
                      className={styles.item}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {includeRemainderArea && (
          <div className={styles.remainderArea}>
            <p className={styles.remainderHeading}>Remainder Area</p>

            {range(remainder)
              .reverse()
              .map((index) => {
                const consistentId = `${id}-${numOfItems - remainder + index}`;

                return (
                  <motion.div
                    layout
                    layoutId={consistentId}
                    data-key={consistentId}
                    key={consistentId}
                    className={styles.item}
                  />
                );
              })}
          </div>
        )}

        <Equation
          dividend={numOfItems}
          divisor={numOfGroups}
          remainder={remainder}
        />
      </Card>
    </LayoutGroup>
  );
}

export default DivisionGroupsDemo;
