'use client';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Flex } from '@/components/ui/Flex';
import { Grid } from '@/components/ui/Grid';
import { Heading, Paragraph } from '@/components/ui/Typography';
import { getRandomIntBetween } from '@/lib/helpers/utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { GridNode } from './Node';
import styles from './PercolatingGrid.module.css';
import { Stats } from './Stats/Stats';
import { Percolation, SiteState } from './percolation';

const SETTINGS = {
  ROWS: 15,
  COLS: 15,
  NUMBER_OF_TRIALS: 100,
  FLOOD_STAGGER_DELAY: 70,
  NODE_WIDTH: 20,
  NODE_HEIGHT: 20,
};

export const PercolatingGrid = (): JSX.Element => {
  const nRows: number = SETTINGS.ROWS;
  const nCols: number = SETTINGS.COLS;
  const nLength = nRows * nCols + 2;

  const percolation = useMemo(
    () => new Percolation(nRows, nCols),
    [nRows, nCols]
  );
  const [id, setId] = useState<Array<number>>(() => percolation.getData());
  const [siteState, setSiteState] = useState<Array<SiteState>>(() =>
    percolation.getSiteState()
  );

  const [flooding, setFlooding] = useState<Array<boolean>>(() => {
    return percolation
      .getSiteState()
      .map((siteState) => (siteState === SiteState.FULL ? true : false));
  });

  const wetElements = useRef<Set<number>>(new Set([0]));
  const elementsToWet = useRef<Set<number>>(new Set());
  const drownedElements = useRef<Set<number>>(new Set());

  const animationTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    checkForActivation();
  }, id);

  const onGridNodeClick = (p: number) => {
    if (!percolation.isOpen(p)) {
      percolation.openSite(p).forEach((p) => elementsToWet.current.add(p));
      update();
    }
  };

  const animate = () => {
    wetElements.current.forEach((wet) => {
      wetNeighbours(wet);
      removeDrownedElements(wet);
    });
    checkForActivation();
  };

  const resume = () => {
    clearInterval(animationTimer.current);
    animationTimer.current = setInterval(animate, SETTINGS.FLOOD_STAGGER_DELAY);
  };

  const pause = () => {
    clearInterval(animationTimer.current);
  };

  const checkForActivation = () => {
    if (elementsToWet.current.size === 0) {
      pause();
    } else {
      resume();
    }
  };

  const wetNeighbours = (p: number) => {
    let neighbours;
    if (p === 0) {
      neighbours = percolation.getTopVirtualNeighbours();
    } else {
      neighbours = [percolation.getNetighbours(p)];
    }
    neighbours.forEach((fourNeighbour) => {
      Object.entries(fourNeighbour).forEach(([position, index]) => {
        if (index && elementsToWet.current.has(index)) {
          setTimeout(() => {
            setFlooding((prevFlooding) => {
              const newFlooding = [...prevFlooding];
              newFlooding[index] = true;
              return newFlooding;
            });
            wetElements.current.add(index);
            elementsToWet.current.delete(index);
          }, 0);
        }
      });
    });
  };

  const removeDrownedElements = (p: number) => {
    let neighbours;
    if (p === 0) {
      neighbours = percolation.getTopVirtualNeighbours();
    } else {
      neighbours = [percolation.getNetighbours(p)];
    }

    neighbours.forEach((fourNeighbour) => {
      if (
        fourNeighbour.bottom &&
        siteState[fourNeighbour.bottom] === SiteState.FULL &&
        fourNeighbour.top &&
        siteState[fourNeighbour.top] === SiteState.FULL &&
        fourNeighbour.left &&
        siteState[fourNeighbour.left] === SiteState.FULL &&
        fourNeighbour.right &&
        siteState[fourNeighbour.right] === SiteState.FULL
      ) {
        drownedElements.current.add(p);
        wetElements.current.delete(p);
      }
    });
  };

  const update = () => {
    setId([...percolation.getData()]);
    setSiteState([...percolation.getSiteState()]);
  };

  const reset = () => {
    percolation.reset();
    setFlooding(
      percolation
        .getSiteState()
        .map((siteState) => (siteState === SiteState.FULL ? true : false))
    );
    wetElements.current = new Set([0]);
    elementsToWet.current = new Set();
    drownedElements.current = new Set();
    update();
  };

  const randomize = () => {
    reset();
    for (let i = nCols + 1; i <= nCols * nRows; i++) {
      const openOrNot = getRandomIntBetween(0, 1);
      if (openOrNot === 0) {
        percolation.openSite(i);
      }
    }
    update();
  };

  useEffect(() => {
    randomize();
  }, []);

  return (
    <>
      <Card className={styles.wrapper}>
        <Flex justify={'center'} align={'center'}>
          <Flex
            gap={3}
            direction={'column'}
            justify={'center'}
            align={'center'}
          >
            <header className={styles.header}>
              <Heading>Percolating Grid</Heading>
            </header>
            <Paragraph>
              Try <strong>tapping/clicking</strong> the top layer, breaking them
              will allow water to come through!
            </Paragraph>
            <Grid
              style={{
                gridTemplateColumns: `repeat(${nCols}, ${SETTINGS.NODE_WIDTH}px)`,
                gridTemplateRows: `repeat(${nCols}, ${SETTINGS.NODE_WIDTH}px)`,
              }}
            >
              {id.map((_, index, id) => {
                if (index !== 0 && index !== nLength - 1) {
                  return (
                    <GridNode
                      key={index}
                      flooding={flooding[index]}
                      onClick={() => onGridNodeClick(index)}
                      id={index}
                      parentId={id[index]}
                      siteState={siteState[index]}
                    />
                  );
                } else return null;
              })}
              {/* </div> */}
            </Grid>
          </Flex>
        </Flex>
        <Flex justify={'center'} align={'center'} direction={'column'} gap={3}>
          <Stats percolation={percolation} siteState={siteState} />
          <Button onClick={randomize}>Randomize</Button>
        </Flex>
      </Card>
    </>
  );
};

export default PercolatingGrid;
