import clsx from 'clsx';
import { SiteState } from '../percolation';
import styles from './GridNode.module.css';

interface Props {
  id: number;
  parentId: number;
  siteState: SiteState;
  onClick: () => void;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement> | undefined;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement> | undefined;
  // openOrder: number
  value?: number | string;
  flooding: boolean;
}

export const GridNode = ({
  id,
  value,
  flooding,
  parentId,
  siteState,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: Props): JSX.Element => {
  return (
    <>
      <div
        data-flooding={flooding}
        onClick={onClick}
        className={clsx(
          styles.gridnode,
          styles[siteState],
          styles[flooding ? 'flooding' : '']
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {value}
      </div>
    </>
  );
};
