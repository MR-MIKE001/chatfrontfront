import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUploads = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilepic: base64Image });
    };
  };

  return (
    <div className='h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8  '>
        <div className='bg-base-100 rounded-xl  p-6 space-y-8'>
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='mt-2'>Your profile information</p>
          </div>
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <img
                src={selectedImage || authUser?.profilepic || "/avatar.png"}
                alt='profile'
                className='size-32 rounded-full object-cover border-4'
              />
              <label
                htmlFor='avatar-upload'
                className={`absolute bottom-0 right-0 
              bg-base-content
              hover:scale-105 p-2 rounded-full
               cursor-pointer transition-all
              duration-200 
              ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>
                <Camera className='size-5 text-base200' />
                <input
                  type='file'
                  id='avatar-upload'
                  className='hidden'
                  accept='image/*'
                  onChange={handleImageUploads}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className='text-sm text-zinc-400'>
              {isUpdatingProfile
                ? "uploading....."
                : "click the cameral to update your photo"}
            </p>
          </div>
          <div className='space-y-6'>
            <div className='-space-y-1.5 '>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <User className='size-4' />
                fullname
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>
                {authUser?.fullname}
              </p>
            </div>
            <div className='-space-y-1.5 '>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <Mail className='size-4' />
                email
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>
                {authUser?.email}
              </p>
            </div>
          </div>
          <div className='mt-6 bg-base-300 rounded-xl p-6'>
            <h1 className='text-lg font-medium mb-4'>Account information</h1>
            <div className='space-y-3 text-sm'>
              <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                <span>Member since</span>
                <span>{authUser.createdAt?.split("1")[0]}</span>
              </div>
              <div className='flex items-center justify-between py-2'>
                <span>Account Status</span>
                <span className='text-green-500'>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
