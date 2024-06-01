"use client";
import { Formik } from "formik";
import Link from "next/link";

export default function LoginPage() {
  const loading = false;
  return (
    <section className="flex justify-center bg-[#11111b]">
      <div className="w-[50%] h-screen relative mobile:hidden">
        <div className="w-full h-full top-0 absolute " />
        <img
          src="https://res.cloudinary.com/madimages/image/fetch/e_sharpen:100,q_auto:eco,fl_progressive:semi,h_496,w_785/https://s3.amazonaws.com/mobileappdaily/mad/uploads/img_reminder_apps_for_android.png"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <div className="w-[50%] mobile:w-full flex justify-center items-center h-screen bg-[url('/login-bg.png')] bg-cover bg-no-repeat">
        <div className="w-[70%] mobile:w-[80%]">
          <div className="flex flex-col items-center gap-5">
            <span className="text-3xl font-bold pb-5 block">LOGIN</span>
            <div className="flex flex-col gap-y-5 w-full">
              <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={(values, { resetForm }) => {
                  console.log(values);
                  resetForm();
                }}
              >
                {({ handleChange, handleSubmit, isSubmitting, values }) => (
                  <form
                    className=" flex flex-col items-center gap-y-5 "
                    onSubmit={handleSubmit}
                  >
                      <label htmlFor="username" className="font-bold text-green-400">Phone Number</label>
                      <input
                        type="text"
                        name="username"
                        className="w-full px-4 py-2 outline-none text-black placeholder:font-bold bg-slate-300 font-bold rounded-md"
                        placeholder="Username or Email Address"
                        value={values.username}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="password" className="font-bold text-green-300">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="w-full px-4 py-2 outline-none text-black rounded-md placeholder:font-bold bg-slate-300 font-bold"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      required
                    />
                    <span className="descr-1 flex justify-start w-full text-primary cursor-pointer text-xs font-medium">
                      Forgot Password?
                    </span>
                    <button
                      type="submit"
                      className="bg-yellow-300 text-black font-bold w-full py-2"
                      disabled={isSubmitting}
                    >
                      Sign In
                    </button>
                  </form>
                )}
              </Formik>

           
                {loading && (
                  <div className="w-screen h-screen absolute top-0 bg-black/70 left-0 flex justify-center items-center">
                    <div className="modal-box">
                      <span className="loading loading-bars loading-lg"></span>
                      <p className="py-4 font-bold text-base">
                        "We're brewing up something special just for you.
                        <br /> Patience is a virtue, they say..."
                      </p>
                    </div>
                  </div>
                )}
                
            </div>
            <div className="descr-1">
              <span>
                Don't have an account ?{" "}
                <Link href="/signup">
                  <span className="text-primary font-medium cursor-pointer">
                    Sign Up!
                  </span>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
