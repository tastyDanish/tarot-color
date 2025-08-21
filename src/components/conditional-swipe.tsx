import useIsSmallScreen from "@/lib/use-is-small-screen";
import useIsTouchDevice from "@/lib/use-is-touch";
import { type ReactNode } from "react";
import SwipeButtons from "./swipe-buttons";

interface ConditionalSwipeProps {
  children: ReactNode;
}

export function ConditionalSwipe({ children }: ConditionalSwipeProps) {
  const isTouch = useIsTouchDevice();
  const isSmall = useIsSmallScreen();

  if (isTouch && isSmall) {
    return <SwipeButtons>{children}</SwipeButtons>;
  }

  // desktop or large screen → just render children directly
  return <>{children}</>;
}
