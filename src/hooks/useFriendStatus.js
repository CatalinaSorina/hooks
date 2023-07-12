import { useState, useEffect, useCallback, useRef } from "react";

export function useFriendStatus(friendId, time) {
  const [isOnline, setIsOnline] = useState(false);
  const timerRef = useRef(null);

  const toggleOnlineStatus = useCallback(() => {
    setIsOnline((prevState) => !prevState);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    let isMounted = true;

    const startTimer = () => {
      timerRef.current = setInterval(toggleOnlineStatus, time);
    };

    const stopTimer = () => {
      clearInterval(timerRef.current);
    };

    if (friendId) {
      startTimer();
    }

    return () => {
      isMounted = false;
      stopTimer();
    };
  }, [friendId, time, toggleOnlineStatus]);

  return isOnline;
}
