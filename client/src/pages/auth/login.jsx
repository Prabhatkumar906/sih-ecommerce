// // import CommonForm from "@/components/common/form";
// // import { useToast } from "@/components/ui/use-toast";
// // import { loginFormControls } from "@/config";
// // import { loginUser } from  "@/store/auth-slice";
// // import { useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { Link } from "react-router-dom";

// // const initialState = {
// //   email: "",
// //   password: "",
// // };

// // function AuthLogin() {
// //   const [formData, setFormData] = useState(initialState);
// //   const dispatch = useDispatch();
// //   const { toast } = useToast();

// //   // function onSubmit(event) {
// //   //   event.preventDefault();

// //   //   dispatch(loginUser(formData)).then((data) => {
// //   //     if (data?.payload?.success) {
// //   //       toast({
// //   //         title: data?.payload?.message,
// //   //       });
// //   //     } else {
// //   //       toast({
// //   //         title: data?.payload?.message,
// //   //         variant: "destructive",
// //   //       });
// //   //     }
// //   //   });
// //   // }
// //   function onSubmit(event) {
// //     event.preventDefault();
// //     dispatch(loginUser(formData)).then((action) => {
// //       if (loginUser.fulfilled.match(action)) {
// //         toast({
// //           title: "Login successful!",
// //         });
// //         // Redirect to the dashboard or home page
// //         // navigate("/dashboard");
// //       } else {
// //         toast({
// //           title: action.payload || "Login failed.",
// //           variant: "destructive",
// //         });
// //       }
// //     });
// //   }
  

// //   return (
// //     <div className="mx-auto w-full max-w-md space-y-6">
// //       <div className="text-center">
// //         <h1 className="text-3xl font-bold tracking-tight text-foreground">
// //           Sign in to your account
// //         </h1>
// //         <p className="mt-2">
// //           Dont have an account
// //           <Link
// //             className="font-medium ml-2 text-primary hover:underline"
// //             to="/auth/register"
// //           >
// //             Register
// //           </Link>
// //         </p>
// //       </div>
// //       <CommonForm
// //         formControls={loginFormControls}
// //         buttonText={"Sign In"}
// //         formData={formData}
// //         setFormData={setFormData}
// //         onSubmit={onSubmit}
// //       />
// //     </div>
// //   );
// // }

// // export default AuthLogin;


// // src/pages/auth/login.jsx
// import CommonForm from "@/components/common/form";
// import { useToast } from "@/components/ui/use-toast";
// import { loginFormControls } from "@/config";
// import { loginUser } from "@/store/auth-slice"; // Named import
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link} from "react-router-dom";
// const bcrypt = require("bcryptjs");   //for hashing
// const jwt = require("jsonwebtoken");
// const User = require("../../models/User");

// const initialState = {
//   email: "",
//   password: "",
// };

// function AuthLogin() {
//   const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch();
//   const { toast } = useToast();
//   // const navigate = useNavigate(); // Initialize navigate

//   function onSubmit(event) {
//     event.preventDefault();
//     dispatch(loginUser(formData)).then((data) => {
//       if(data?.payload?.success){
//         toast({
//           title:data?.payload?.message,
//         });
//       }else{
//         toast({
//           title:data?.payload?.message,
//           variant:"destructive",
//         });
//       }
//       const loginUser = async (req, res) => {
//         const { email, password } = req.body;
      
//         try {
//           const checkUser = await User.findOne({ email });
//           if (!checkUser) {
//             return res.status(400).json({
//               success: false,
//               message: "User doesn't exist! Please register first",
//             });
//           }
      
//           const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
//           if (!checkPasswordMatch) {
//             return res.status(400).json({
//               success: false,
//               message: "Incorrect password! Please try again",
//             });
//           }
      
//           const token = jwt.sign(
//             {
//               id: checkUser._id,
//               role: checkUser.role,
//               email: checkUser.email,
//               userName: checkUser.userName,
//             },
//             "CLIENT_SECRET_KEY",
//             { expiresIn: "60m" }
//           );
      
//           res.cookie("token", token, { httpOnly: true, secure: false }).json({
//             success: true,
//             message: "Logged in successfully",
//             user: {
//               email: checkUser.email,
//               role: checkUser.role,
//               id: checkUser._id,
//               userName: checkUser.userName,
//             },
//           });
//         } catch (e) {
//           console.log(e);  // This should log any server-side errors
//           res.status(500).json({
//             success: false,
//             message: "Some error occurred",
//           });
//         }
//       };
//     })};
    
  

//   return (
//     <div className="mx-auto w-full max-w-md space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold tracking-tight text-foreground">
//           Sign in to your account
//         </h1>
//         <p className="mt-2">
//           Dont have an account?
//           <Link
//             className="font-medium ml-2 text-primary hover:underline"
//             to="/auth/register"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//       <CommonForm
//         formControls={loginFormControls}
//         buttonText={"Sign In"}
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={onSubmit}
//       />
//     </div>
//   );
// }

// export default AuthLogin;




import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice"; // Named import
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  console.log("AuthLogin component is rendering");
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
    
    // Dispatch the login action to your Redux store (or directly call the API)
    dispatch(loginUser(formData)).then((data) => {
      console.log("Dispatch result:", data);
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        // Optionally, navigate the user to another page after successful login
        // navigate("/dashboard");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }
  

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Dont have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
