import * as React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { cn } from "@/lib/utils";

// Define Card Component
const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
    {...props}
  >
    {children}
  </div>
));

Card.displayName = "Card";

// Define CardHeader Component
const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  >
    {children}
  </div>
));

CardHeader.displayName = "CardHeader";

// Define CardTitle Component
const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = "CardTitle";

// Define CardDescription Component
const CardDescription = React.forwardRef(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = "CardDescription";

// Define CardContent Component
const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0", className)}
    {...props}
  >
    {children}
  </div>
));

CardContent.displayName = "CardContent";

// Define CardFooter Component
const CardFooter = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = "CardFooter";

// Define PropTypes for Each Component
const commonPropTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Card.propTypes = {
  ...commonPropTypes,
};

CardHeader.propTypes = {
  ...commonPropTypes,
};

CardTitle.propTypes = {
  ...commonPropTypes,
};

CardDescription.propTypes = {
  ...commonPropTypes,
};

CardContent.propTypes = {
  ...commonPropTypes,
};

CardFooter.propTypes = {
  ...commonPropTypes,
};

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
