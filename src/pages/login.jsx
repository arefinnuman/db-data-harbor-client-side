/* eslint-disable react-hooks/exhaustive-deps */
import LoadingScreen from "@/components/Ui/LoadingScreen";
import { useLoginMutation } from "@/redux/auth/authApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const router = useRouter();
  const [loginResponse, { isLoading }] = useLoginMutation();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      employeeId: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const userData = {
      id: data.employeeId,
      password: data.password,
    };
    try {
      const response = await loginResponse(userData);
      if (response?.data?.success === true) {
        const accessToken = response?.data?.data?.accessToken;
        localStorage.setItem("token", accessToken);
        toast.success("Login Successful !");
        setValue("employeeId", "");
        setValue("password", "");
        router.push("/");
      } else if (response?.error?.data?.success === false) {
        toast.error(response?.error?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const dispatch = useDispatch();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-4 sm:px-0">
      <div className="container flex flex-col mx-auto items-center lg:flex-row bg-white rounded-lg">
        <div className="w-full lg:w-1/2 p-8 flex justify-center">
          <Image
            width={500}
            height={500}
            src="https://i.ibb.co/4RgmNFB/IMG-5668.jpg"
            alt="Eastern Bank Logo"
            className="max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/2 p-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
              <span className="text-4xl sm:text-5xl">W</span>elcome to{" "}
              <span className="text-primary">Digital Banking</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-2">
              Location Tracking Service
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("employeeId", { required: true })}
              type="text"
              placeholder="Employee ID"
              className="input input-bordered input-primary w-full lg:w-96 my-2"
            />
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="input input-bordered input-primary w-full lg:w-96 my-2"
            />

            <p className="text-gray-600 mb-4">
              If you are new, you need to{" "}
              <span>
                <Link className="text-blue-500" href="/sign-up">
                  sign up
                </Link>
              </span>
            </p>

            <button
              type="submit"
              className="btn btn-secondary rounded-2xl mt-2 w-full sm:w-auto"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
