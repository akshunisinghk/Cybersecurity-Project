// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   SignUpButton,
//   UserButton,
//   useUser,
// } from "@clerk/clerk-react";

// const UserMenu = () => {
//   const { user } = useUser();

//   return (
//     <>
//       <SignedOut>
//         <div className="flex items-center gap-3">
//           <SignInButton mode="modal">
//             <button className="rounded-md bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700">
//               Login
//             </button>
//           </SignInButton>

//           <SignUpButton mode="modal">
//             <button className="rounded-md border border-cyan-600 px-4 py-2 text-cyan-400 hover:bg-cyan-600 hover:text-white">
//               Sign Up
//             </button>
//           </SignUpButton>
//         </div>
//       </SignedOut>

//       <SignedIn>
//         <div className="flex items-center gap-3">
//           <div className="text-right">
//             <p className="font-medium text-white">
//               {user?.fullName || user?.firstName}
//             </p>
//             <p className="text-sm text-slate-400">
//               {user?.primaryEmailAddress?.emailAddress}
//             </p>
//           </div>

//           <UserButton afterSignOutUrl="/" />
//         </div>
//       </SignedIn>
//     </>
//   );
// };

// export default UserMenu;

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const UserMenu = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  console.log({
    isLoaded,
    isSignedIn,
    user,
  });

  return (
    <>
      <SignedOut>
        <div className="flex items-center gap-3">
          <SignInButton mode="modal">
            <button className="rounded-md bg-cyan-600 px-4 py-2 text-white">
              Login
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="rounded-md border border-cyan-600 px-4 py-2 text-cyan-400">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-medium text-white">
              {user?.fullName || "No Name"}
            </p>

            <p className="text-sm text-slate-400">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>

          <UserButton afterSignOutUrl="/login" />
        </div>
      </SignedIn>
    </>
  );
};

export default UserMenu;