// import * as React from "react"
// import PropTypes from "prop-types"
// import { Slot } from "@radix-ui/react-slot"
// import buttonVariants from "./buttonVariants" // Adjust the path as needed

// import { cn } from "@/lib/utils"

// const Button = React.forwardRef(
//   ({ className, variant, size, asChild = false, ...props }, ref) => {
//     const Comp = asChild ? Slot : "button"
//     return (
//       <Comp
//         className={cn(buttonVariants({ variant, size, className }))}
//         ref={ref}
//         {...props}
//       />
//     )
//   }
// )
// Button.displayName = "Button"

// Button.propTypes = {
//   className: PropTypes.string,
//   variant: PropTypes.oneOf([
//     "default",
//     "destructive",
//     "outline",
//     "secondary",
//     "ghost",
//     "link",
//   ]),
//   size: PropTypes.oneOf(["default", "sm", "lg", "icon"]),
//   asChild: PropTypes.bool,
// }

// // Button.defaultProps = {
// //   className: "",
// //   variant: "default",
// //   size: "default",
// //   asChild: false,
// // }

// // Export only the Button component
// export { Button }


// src/components/ui/button.jsx
import * as React from "react";
import PropTypes from "prop-types";
import { Slot } from "@radix-ui/react-slot";
import buttonVariants from "./buttonVariants"; // Adjust the path as needed

import { cn } from "@/lib/utils";

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
  ]),
  size: PropTypes.oneOf(["default", "sm", "lg", "icon"]),
  asChild: PropTypes.bool,
};

// Button.defaultProps = {
//   className: "",
//   variant: "default",
//   size: "default",
//   asChild: false,
// };

// Export as default
export default Button;

