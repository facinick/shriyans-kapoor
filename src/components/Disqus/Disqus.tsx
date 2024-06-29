"use client";
import { Children, useContext, useEffect, useRef, useState } from "react";
import styles from "./Disqus.module.css";
import { DISQUS_SHORT_NAME } from "@/lib/constants";
import { ThemeContext } from "../providers/ThemeProvider";
import ThemeConfig from "../../../tailwind.config";
import { LazyMotion, m, motion } from "framer-motion";
import { cn, min, minWithCap } from "@/lib/helpers/utils";
import { Heading } from "../ui/Typography";
import { Skeleton } from "../ui/Skeleton";

interface Props {
    url: string;
    identifier: string;
}

const loadFeatures = () =>
    import("../../lib/motion-features").then(res => res.default)

const Disqus = ({ url, identifier }: Props): JSX.Element => {

    const discusThreadRef = useRef<HTMLDivElement>(null)
    const [innerHeight, setInnerHeight] = useState(0)
    const { colorScheme, theme } = useContext(ThemeContext)
    const [disqusLoaded, setDisqusLoaded] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        window.disqus_config = function () {
            this.page.url = url;
            this.page.identifier = identifier;
            this.callbacks.onReady.push(function () {

                timerRef.current && clearTimeout(timerRef.current)
                timerRef.current = setTimeout(() => {
                    setDisqusLoaded(true)
                }, 1200)

                discusThreadRef?.current && setInnerHeight(discusThreadRef.current.clientHeight)
            });
        };

        const d = document;
        const s = d.createElement('script');
        s.src = `${DISQUS_SHORT_NAME}.disqus.com/embed.js`;
        s.setAttribute('data-timestamp', (new Date()).toString());
        (d.head || d.body).appendChild(s);

        return () => {
            timerRef.current && clearTimeout(timerRef.current)
            setDisqusLoaded(false)

            const script = document.querySelector('script[src*="disqus.com/embed.js"]');
            if (script) script.remove();
            window.DISQUS = undefined;
            if (discusThreadRef.current) {
                discusThreadRef.current.innerHTML = ''
            }
        };
    }, [url, identifier, colorScheme, theme]);

    return (
        <LazyMotion features={loadFeatures}>
            <section className={styles.section}>
                <m.div
                    style={{
                        minHeight: minWithCap(500, innerHeight, 500),
                        visibility: disqusLoaded ? "visible" : "hidden"
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: disqusLoaded ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className={cn(styles['disqus_thread'], styles.disqus)}
                    ref={discusThreadRef}
                    id="disqus_thread"
                />
                <Skeleton style={{
                    minHeight: minWithCap(500, innerHeight, 500),
                    display: disqusLoaded ? "none" : "flex",
                }} className={styles.skeleton}>
                    <Heading level={4}>Loading comments...</Heading>
                </Skeleton>
            </section>
        </LazyMotion>
    );
};

export default Disqus;
