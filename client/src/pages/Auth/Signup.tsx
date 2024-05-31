import { zodResolver } from "@hookform/resolvers/zod";
import { FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { z } from "zod";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { useCreateUserMutation } from "@/services";
import { displayErrorMessage } from "@/utils/functions";
import toast from "react-hot-toast";
import Logo from "@/components/Logo";

const formSchema = z.object({
  firstname: z.string().min(1, {
    message: "Please enter firstname",
  }),
  lastname: z.string().min(1, {
    message: "Please enter lastname",
  }),
  username: z.string().min(1, {
    message: "Please enter a nickname or username",
  }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  dob: z.string().datetime(),
});

const Signup = () => {
  const navigate = useNavigate();
  const [signupUser, { isLoading }] = useCreateUserMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isLoading) return;
    try {
      const data = await signupUser(values).unwrap();
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      displayErrorMessage(error);
    }
  }

  const formStyle = "min-w-[min(18rem,_100%)] flex-1";

  return (
    <div className="flex items-center justify-center h-full w-full overflow-auto px-3">
      <Logo />
      <Form {...form}>
        <div className="flex flex-col gap-8 min-w-[min(50rem,_100%)] max-w-[30rem] max-h-[85%] rounded-[2rem] bg-pc2 p-4 h-max overflow-y-auto">
          <header className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Signup</h2>
            <p className="text-[0.9rem]">
              Please fill in the details below to create your account
            </p>
          </header>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex justify-between flex-col gap-4 flex-1"
          >
            <div className="flex flex-wrap gap-4 flex-1">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className={`${formStyle}`}>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your firstname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className={formStyle}>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your lastname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className={formStyle}>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
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
                  <FormItem className={formStyle}>
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
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className={formStyle}>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => {
                  const selectedDate = field.value
                    ? new Date(field.value)
                    : new Date();
                  return (
                    <FormItem className={`${formStyle}`}>
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              isLoading={isLoading}
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            showOutsideDays={false}
                            fromYear={1990}
                            defaultMonth={selectedDate}
                            toYear={new Date().getFullYear()}
                            captionLayout={"dropdown-buttons"}
                            selected={new Date(field.value)}
                            onSelect={(event) =>
                              field.onChange({
                                target: { value: event?.toISOString() },
                              } as React.ChangeEvent<HTMLSelectElement>)
                            }
                            disabled={(date) =>
                              date > new Date() || date < new Date("1990-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <p className="text-sm w-full text-right">
                <Link to="/forgot-password">Forgot password?</Link>
              </p>
            </div>
            <Button type="submit" className="mt-6">
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
              Already have an account?{" "}
              <Link to="/login" className="font-semibold hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
