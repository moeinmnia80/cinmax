import { type ComponentProps } from "react";

import { cn } from "@/utils";

export const Table = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div className="md:overflow-auto md:max-h-150">
      <div role="table" className={cn("md:min-w-max", className)} {...props}>
        {children}
      </div>
    </div>
  );
};

export const THead = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      role="rowgroup"
      className={cn("md:min-w-max md:sticky md:top-0 md:z-20", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const TBody = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      role="rowgroup"
      className={cn("md:min-w-max md:flex md:flex-col", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const Row = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div role="row" className={cn(className)} {...props}>
      {children}
    </div>
  );
};

interface TDProps extends ComponentProps<"div"> {
  dataCell?: string;
}

export const TD = ({ children, className, dataCell, ...props }: TDProps) => {
  return (
    <div role="cell" data-cell={dataCell} className={cn(className)} {...props}>
      {children}
    </div>
  );
};

export const RowContent = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};

export const RowContentSection = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};
