import { RefObject, useEffect, useRef } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

function useEventListener<T extends keyof MediaQueryListEventMap>(
  eventName: T,
  handler: (event: MediaQueryListEventMap[T]) => void,
  element?: RefObject<MediaQueryList>,
  options?: boolean | AddEventListenerOptions
): void;

function useEventListener<T extends keyof WindowEventMap>(
  eventName: T,
  handler: (event: WindowEventMap[T]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions
): void;

function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: RefObject<K>,
  options?: boolean | AddEventListenerOptions
): void;

function useEventListener<T extends keyof DocumentEventMap>(
  eventName: T,
  handler: (event: DocumentEventMap[T]) => void,
  element?: RefObject<Document>,
  options?: boolean | AddEventListenerOptions
): void;

function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  KM extends keyof MediaQueryListEventMap,
  T extends HTMLElement | MediaQueryList | void = void
>(
  eventName: KW | KH | KM,
  handler: (
    event:
      | WindowEventMap[KW]
      | HTMLElementEventMap[KH]
      | MediaQueryListEventMap[KM]
      | Event
  ) => void,
  element?: RefObject<T>,
  options?: boolean | AddEventListenerOptions
) {
  // create a ref to store handler
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // define listening target
    const targetElement: T | Window = element?.current ?? window;

    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    // create event listener that calls handler function stored in ref
    const listener: typeof handler = (event) => savedHandler.current(event);

    // add event listener
    targetElement.addEventListener(eventName, listener, options);

    // remove event listener on cleanup

    return () => {
      targetElement.removeEventListener(eventName, listener, options);
    };
  }, [eventName, element, options]);
}
export default useEventListener;
