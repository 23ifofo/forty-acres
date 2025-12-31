import React, { useEffect, useState } from 'react';

// CountdownTimer: cycles through March 23 and August 27 deadlines every year, infinitely
export default function CountdownTimer() {
  const [parts, setParts] = useState({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function getNextDeadline() {
      const now = new Date();
      const year = now.getUTCFullYear();
      
      // First deadline: March 23 of current year
      const march23 = new Date(Date.UTC(year, 2, 23, 0, 0, 0));
      
      // Second deadline: August 27 of current year
      const august27 = new Date(Date.UTC(year, 7, 27, 0, 0, 0));
      
      // If before March 23, target is March 23 of current year
      if (now < march23) {
        return march23;
      }
      
      // If between March 23 and August 27, target is August 27 of current year
      if (now < august27) {
        return august27;
      }
      
      // If after August 27, target is March 23 of next year
      return new Date(Date.UTC(year + 1, 2, 23, 0, 0, 0));
    }

    function computeParts(now, target) {
      if (now >= target) return null;
      // calculate full months difference between now and target
      let yearsDiff = target.getUTCFullYear() - now.getUTCFullYear();
      let monthsDiff = target.getUTCMonth() - now.getUTCMonth() + yearsDiff * 12;

      // If the day-of-month of 'now' is greater than target's day, reduce months by 1
      if (now.getUTCDate() > target.getUTCDate()) monthsDiff -= 1;
      if (monthsDiff < 0) monthsDiff = 0;

      // compute an intermediate date adding monthsDiff months to now
      const intermediate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + monthsDiff, now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()));

      // if intermediate > target, step back one month
      if (intermediate > target && monthsDiff > 0) {
        monthsDiff -= 1;
      }

      // compute remainder milliseconds
      const monthAdded = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + monthsDiff, now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()));
      let diffMs = target - monthAdded;
      if (diffMs < 0) diffMs = 0;

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      return { months: monthsDiff, days, hours, minutes, seconds };
    }

    const tick = () => {
      const now = new Date();
      const target = getNextDeadline();
      const p = computeParts(now, target);
      if (p) {
        setParts(p);
      } else {
        // Past all deadlines, recalculate next (should not happen with infinite cycle, but safety check)
        const nextTarget = getNextDeadline();
        const nextP = computeParts(now, nextTarget);
        if (nextP) setParts(nextP);
      }
    };

    // initial tick
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-md bg-blue-50 border border-blue-300 p-3 inline-flex items-center gap-3 shadow-lg">
      <div className="text-sm md:text-base text-blue-900 font-semibold">Application deadline</div>
      <div className="text-sm md:text-base text-blue-700">
        {parts.months} month{parts.months !== 1 ? 's' : ''}, {parts.days} day{parts.days !== 1 ? 's' : ''}, {parts.hours}h {parts.minutes}m {parts.seconds}s
      </div>
    </div>
  );
}
