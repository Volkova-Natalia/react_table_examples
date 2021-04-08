import React from "react";


export const TABLE = React.forwardRef<HTMLDivElement, any>(({ className = null, ...props }, ref) => {
  return (
    <div className={"table " + className} {...props} ref={ref}>
      {props.children}
    </div>
  );
});

export const THEAD = React.forwardRef<HTMLDivElement, any>(({ className = null, ...props }, ref) => {
  return (
    <div className={"thead " + className} {...props} ref={ref}>
      {props.children}
    </div>
  );
});

export const TBODY = React.forwardRef<HTMLDivElement, any>(({ className = null, ...props }, ref) => {
  return (
    <div className={"tbody " + className} {...props} ref={ref}>
      {props.children}
    </div>
  );
});

export const TR = React.forwardRef<HTMLDivElement, any>(({ className = null, ...props }, ref) => {
  return (
    <div className={"tr " + className} {...props} ref={ref}>
      {props.children}
    </div>
  );
});

export const TD = React.forwardRef<HTMLDivElement, any>(({ className = null, ...props }, ref) => {
  return (
    <div className={"td " + className} {...props} ref={ref}>
      {props.children}
    </div>
  );
});

export const TH = React.forwardRef<HTMLDivElement, any>(({ className = null, ...props }, ref) => {
  return (
    <div className={"th " + className} {...props} ref={ref}>
      {props.children}
    </div>
  );
});
