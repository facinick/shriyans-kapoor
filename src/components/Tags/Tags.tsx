

import { Badge } from "@/components/ui/badge";
import { Flex } from "../ui/Flex";
import styles from './Tags.module.css';

interface Props {
    tags: string[];
}

export const Tags = ({ tags }: Props): JSX.Element => {

    return (
        <>
            <Flex wrap={'wrap'} className={styles.tags} dir="column" gap={2}>
                {tags.map((tag) => {
                    return (
                        <Badge className="text-nowrap" key={tag} variant={'default'}>{tag}</Badge>
                    )
                })}
            </Flex>
        </>
    );
};
