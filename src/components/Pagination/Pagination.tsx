'use client';

import { CHARACTERS } from '@/lib/helpers/string-helper';
import { usePagination } from '@/lib/hooks/usePagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VisuallyHidden from '../VisuallyHidden';
import { Button } from '../ui/Button';
import { Flex } from '../ui/Flex';
import { LazyMotion, m, motion } from 'framer-motion';
import { useId, useState } from 'react';
import styles from './Pagination.module.css';
import { usePrevious } from '@/lib/hooks/usePrevious';

interface Props {
  count: number;
  siblingCount: number;
  page: number;
  onChange: (nextPage: number) => void;
}

type HoveredItem =
  | 'outside'
  | 'previous'
  | 'next'
  | number
  | 'left-ellipsis'
  | 'right-ellipsis';

const Pagination = ({
  count,
  siblingCount,
  page,
  onChange,
}: Props): JSX.Element | null => {
  const paginationRange = usePagination({
    count,
    page,
    siblingCount,
  });

  const [hoveredNavItem, setHoveredNavItem] = useState<HoveredItem>('outside');

  const id = useId();

  const previousHoveredElement = usePrevious(hoveredNavItem);

  // If there are less than 2 times in pagination range we shall not render the component
  if (page === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onChange(Number(page) + 1);
  };

  const onPrevious = () => {
    onChange(Number(page) - 1);
  };

  const onPageChange = (nextPage: number) => {
    onChange(Number(nextPage));
  };

  const isUserComingFromOutsidePagination = () => {
    return previousHoveredElement === 'outside';
  };

  const isHovered = (hoveredItem: HoveredItem) => {
    return hoveredItem === hoveredNavItem;
  };

  return (
    <Flex asChild>
      {/* Left navigation arrow */}
      <nav style={{ margin: 'auto', width: 'auto' }}>
        <Flex
          onMouseLeave={() => setHoveredNavItem('outside')}
          asChild
          justify={'center'}
          align={'center'}
          gap={2}
        >
          <ul>
            <li key={'previous'}>
              <Button
                title="previous"
                variant={'link'}
                disabled={page <= 1}
                onClick={onPrevious}
                onMouseEnter={() => setHoveredNavItem('previous')}
                style={{
                  position: 'relative',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  color: 'inherit',
                }}
              >
                {isHovered('previous') && (
                  <MotionBackground
                    id={id}
                    showEnterAnimation={isUserComingFromOutsidePagination()}
                  />
                )}
                <span className={styles['button-text']}>{<ChevronLeft />}</span>
                <VisuallyHidden>Goto previous</VisuallyHidden>
              </Button>
            </li>

            {paginationRange.map((pageNumber) => {
              if (
                pageNumber === 'left-ellipsis' ||
                pageNumber === 'right-ellipsis'
              ) {
                return (
                  <li key={pageNumber}>
                    <Button
                      onMouseEnter={() => setHoveredNavItem(pageNumber)}
                      disabled
                      variant={'link'}
                      asChild
                      style={{
                        fontWeight: 'bold',
                        color: 'inherit',
                      }}
                    >
                      <span className={styles['button-text']}>
                        {CHARACTERS.ellipsis}
                      </span>
                    </Button>
                  </li>
                );
              }

              return (
                <li key={pageNumber}>
                  <Button
                    title={`Page ${pageNumber}`}
                    key={pageNumber}
                    onClick={() => onPageChange(Number(pageNumber))}
                    variant={'link'}
                    onMouseEnter={() => setHoveredNavItem(Number(pageNumber))}
                    style={{
                      position: 'relative',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      color:
                        page === pageNumber ? 'hsl(var(--primary))' : 'inherit',
                    }}
                  >
                    {isHovered(Number(pageNumber)) && (
                      <MotionBackground
                        id={id}
                        showEnterAnimation={isUserComingFromOutsidePagination()}
                      />
                    )}
                    <span className={styles['button-text']}>{pageNumber}</span>
                    <VisuallyHidden>{`Goto Page ${pageNumber}`}</VisuallyHidden>
                  </Button>
                </li>
              );
            })}

            {/*  Right Navigation arrow */}
            <li key={'next'}>
              <Button
                title="next"
                variant={'link'}
                onClick={onNext}
                onMouseEnter={() => setHoveredNavItem('next')}
                disabled={page >= count}
                style={{
                  position: 'relative',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  color: 'inherit',
                }}
              >
                {isHovered('next') && (
                  <MotionBackground
                    id={id}
                    showEnterAnimation={isUserComingFromOutsidePagination()}
                  />
                )}
                <span className={styles['button-text']}>
                  {<ChevronRight />}
                </span>
                <VisuallyHidden>Goto next</VisuallyHidden>
              </Button>
            </li>
          </ul>
        </Flex>
      </nav>
    </Flex>
  );
};

interface MotionBackgroundProps {
  id: string;
  showEnterAnimation: boolean;
}

const MotionBackground = ({
  id,
  showEnterAnimation,
}: MotionBackgroundProps) => {
  return (
    <motion.div
      layoutId={`${id}-hovered-backdrop`}
      className={styles.backdrop}
      initial={{
        borderRadius: '12px',
        opacity: showEnterAnimation ? 0 : 1,
        scale: showEnterAnimation ? 0.1 : 1,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
    />
  );
};

export default Pagination;
