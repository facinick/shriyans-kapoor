import { Spinner } from '@/components/ui/spinner';

export default async function Loading() {
  return (
    <div className='flex items-center justify-center min-h-[200px]'>
      <div className='flex items-center gap-2'>
        <Spinner className='size-4' />
        <span className='text-sm text-muted-foreground'>Loading Post...</span>
      </div>
    </div>
  );
}
