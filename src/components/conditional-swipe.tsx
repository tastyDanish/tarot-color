import useIsSmallScreen from "@/lib/use-is-small-screen";
import useIsTouchDevice from "@/lib/use-is-touch";
import { type ReactNode } from "react";
import SwipeButtons from "./swipe-buttons";

interface ConditionalSwipeProps {
  classnames?: string;
  showProgress?: boolean;
  children: ReactNode;
}

export function ConditionalSwipe({
  children,
  showProgress,
  classnames,
}: ConditionalSwipeProps) {
  const isTouch = useIsTouchDevice();
  const isSmall = useIsSmallScreen();

  if (isTouch && isSmall) {
    return (
      <SwipeButtons
        classnames={classnames}
        showProgress={showProgress}>
        {children}
      </SwipeButtons>
    );
  }

  // desktop or large screen → just render children directly
  return <>{children}</>;
}
