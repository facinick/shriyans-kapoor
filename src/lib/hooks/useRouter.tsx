import { useRouter as useNextRouter } from 'next/navigation';
import { useTransitionRouter } from 'next-view-transitions';

function useRouter() {

    const transitionRouter = useTransitionRouter()
    const nextRouter = useNextRouter()

    return globalThis.document ? document.startViewTransition ? transitionRouter : nextRouter : null
}

export {
    useRouter
}   