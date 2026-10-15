import { useEffect } from "react";

interface UseClickOutSideProps {
  domNode: React.RefObject<HTMLDivElement | null>;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useClickOutside = ({
  domNode,
  setState,
}: UseClickOutSideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (domNode.current && !domNode.current.contains(event.target as Node)) {
        setState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
};
