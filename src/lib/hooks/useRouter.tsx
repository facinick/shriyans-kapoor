import { useRouter as useNextRouter } from 'next/navigation';
import { useTransitionRouter } from 'next-view-transitions';

function useRouter() {
    return globalThis.document ? document.startViewTransition ? useTransitionRouter() : useNextRouter() : null
}

export {
    useRouter
}   