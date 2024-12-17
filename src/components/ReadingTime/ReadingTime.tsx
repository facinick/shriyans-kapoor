import { Clock } from 'lucide-react';
import { Flex } from '../ui/Flex';
import VisuallyHidden from '../VisuallyHidden';
import styles from './ReadingTime.module.css';

interface Props {
  minutes: number;
}

const ReadingTime = ({ minutes }: Props): JSX.Element => {
  return (
    <Flex gap={2} align={'center'} className={styles.wrapper}>
      <Clock size={20} />
      <span>
        <VisuallyHidden>Estimated reading time: </VisuallyHidden>
        {minutes} min read
      </span>
    </Flex>
  );
};

export default ReadingTime;
