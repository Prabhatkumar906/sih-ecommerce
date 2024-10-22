// import * as React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, children, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
}

// Define PropTypes for Badge
Badge.propTypes = {
  className: PropTypes.string, // className should be a string
  variant: PropTypes.oneOf(["default", "secondary", "destructive", "outline"]), // variant should be one of the specified strings
  children: PropTypes.node, // children can be any renderable node
};

// (Optional) Define defaultProps if you want to set default values for props
Badge.defaultProps = {
  className: "",
  variant: "default",
  children: null,
};

export { Badge, badgeVariants };
