import { useVibrateOnce } from '../hooks/useVibrateOnce';

export function VibrateOnClick(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  const vibrate = useVibrateOnce();

  descriptor.value = function (...args: any[]) {
    const result = originalMethod.apply(this, args);
    vibrate();
    return result;
  };

  return descriptor;
}
