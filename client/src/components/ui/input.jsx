// import * as React from "react"
// import PropTypes from "prop-types"

// import { cn } from "@/lib/utils"

// const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
//   return (
//     <input
//       type={type}
//       className={cn(
//         "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
//         className
//       )}
//       ref={ref}
//       {...props}
//     />
//   )
// })
// Input.displayName = "Input"

// Input.propTypes = {
//   className: PropTypes.string,
//   type: PropTypes.string,
// }

// Input.defaultProps = {
//   className: "",
//   type: "text",
// }

// export { Input }



// src/components/ui/input.jsx
import * as React from "react";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className = "", type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

// Remove defaultProps as we've set default values in the function parameters
// Input.defaultProps = {
//   className: "",
//   type: "text",
// };

// Export as default
export default Input;
