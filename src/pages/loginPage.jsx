import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, Lock, EyeOff, Loader2, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../component/AuthImagePattern ";

function LoginPage() {
  const [isPassword, setIsPassword] = useState(false);
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });
  const { login, isLogin } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();

    login(formData);
  };

  return (
    <div className='min-h-screen grid lg: grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8 '>
          <div className='text-center mb-8'>
            <div className='flex flex-col item-center gap-2 group'>
              <div
                className='size-12 rounded-xl bg-primary/10 flex item-center justify-center 
                group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Log in</h1>
              <p className='text-base-content/60'>
                get started with your free account{" "}
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content/40' />
                </div>
                <input
                  type='text'
                  className='input input-bordered w-full pl-10'
                  placeholder='john@gmail.com'
                  value={formData.email}
                  onChange={(e) =>
                    setFromData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium '>password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-base-content/40' />
                </div>
                <input
                  type={isPassword ? "text" : "password"}
                  className='input input-bordered w-full pl-10'
                  placeholder='........'
                  value={formData.password}
                  onChange={(e) =>
                    setFromData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setIsPassword(!isPassword)}>
                  {isPassword ? (
                    <EyeOff className='size-5 text-base-content/40' />
                  ) : (
                    <Eye className='size-5 text-base-content/40' />
                  )}
                </button>
              </div>
            </div>
            <button
              type='submit'
              className='btn btn-primary w-full'
              disabled={isLogin}>
              {isLogin ? (
                <>
                  <Loader2 className='size-5 text-base-content/40' />
                  Loading...
                </>
              ) : (
                <>Log in</>
              )}
            </button>
          </form>
          <div className='text-center'>
            <p className='text-base-content/50'>
              create an account{" "}
              <Link to='/signup' className='link link-primary'>
                signup
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title='join our community'
        subTitle='connect with friends, share moments, and stay in touched with your loved ones'
      />
    </div>
  );
}

export default LoginPage;
