import { useTransitionRouter } from 'next-view-transitions';
import { useRouter as useNextRouter } from 'next/navigation';
import { USE_VIEW_TRANSITIONS } from '../constants';

function useRouter() {

    const transitionRouter = useTransitionRouter()
    const nextRouter = useNextRouter()
    const isRunningOnClient = globalThis.document

    return isRunningOnClient ?
        (USE_VIEW_TRANSITIONS && document.startViewTransition) ?
            transitionRouter
            :
            nextRouter
        :
        null
}

export {
    useRouter
};
