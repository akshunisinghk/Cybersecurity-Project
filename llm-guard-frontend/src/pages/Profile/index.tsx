import { useUser } from "@clerk/clerk-react";

const Profile = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  console.log(user);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      <p><b>Full Name:</b> {user?.fullName || "Not Available"}</p>
      <p><b>First Name:</b> {user?.firstName || "Not Available"}</p>
      <p><b>Last Name:</b> {user?.lastName || "Not Available"}</p>
      <p><b>Email:</b> {user?.primaryEmailAddress?.emailAddress}</p>

      <img
        src={user?.imageUrl}
        alt="Profile"
        className="w-24 h-24 rounded-full mt-4"
      />
    </div>
  );
};

export default Profile;