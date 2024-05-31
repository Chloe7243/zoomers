import { zodResolver } from "@hookform/resolvers/zod";
import { FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "@/components/ui/password-input";
import { authTokenKey } from "@/utils/constants";
import { useAppDispatch } from "@/hooks";
import toast from "react-hot-toast";
import { displayErrorMessage } from "@/utils/functions";
import { authenticate } from "@/store/slices/authSlice";
import { useLoginUserMutation } from "@/services";
import Logo from "@/components/Logo";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isLoading) return;
    try {
      const { data } = await loginUser(values).unwrap();
      localStorage.setItem(authTokenKey, data.authToken);
      dispatch(authenticate());
      toast.success("Logged in successfully", { id: "unauthorized" });
      window.location.reload();
      setTimeout(() => navigate("/explore"), 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      displayErrorMessage(error);
    }
  }

  return (
    <div className="flex flex-col items-center py-4 h-full w-full px-3 overflow-y-auto">
      <Logo />
      <Form {...form}>
        <div className="flex flex-col gap-8 h-max min-w-[min(30rem,_100%)] max-w-[30rem] min max-h-[40rem] rounded-[2rem] bg-pc2 p-4">
          <header className="flex flex-col gap-2 px-2 pt-2">
            <h2 className="text-lg font-bold">Login</h2>
            <p className="text-[0.9rem]">
              Please fill in the details below to login into your account
            </p>
          </header>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex justify-between flex-col gap-4 flex-1"
          >
            <div className="flex flex-col gap-4 flex-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        toggleVisibility
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link
                className="text-sm max-w-max self-end"
                to="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>
            <Button className="mt-6" type="submit">
              Submit
            </Button>
            <div className="w-full flex items-center gap-2">
              <span className="flex-1 border"></span>or
              <span className="flex-1 border"></span>
            </div>
            <Button
              variant={"outline"}
              type="button"
              className="flex items-center gap-4"
            >
              <FcGoogle /> Continue with Google
            </Button>
            <Button
              variant={"outline"}
              type="button"
              className="flex items-center gap-4"
            >
              <FaFacebookF />
              Continue with Facebook
            </Button>
            <p className="text-sm max-w-max self-center mt-4 mb-2">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default Login;
