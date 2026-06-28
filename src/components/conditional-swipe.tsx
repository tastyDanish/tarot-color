import useIsSmallScreen from "@/lib/use-is-small-screen";
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
  const isSmall = useIsSmallScreen();

  if (isSmall) {
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
