import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRegisterMutation } from "@/features/auth/services/authApi";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { isAuthenticated, setUser } from "@/features/auth/services/authSlice";
import { messages } from "@/config/messages";

export default function Register() {
  const [register, { data: registerData, isLoading, isSuccess, isError }] =
    useRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      email: "user@example.com",
      password: "",
      confirmPassword: "",
      roles: [],
      username: "",
      fullname: "",
    },
  });

  // Handler
  const handleRegister = async (request: z.infer<typeof SignupValidation>) => {
    try {
      await register(request);
      if (isError) {
        toast.error(messages.regieter_error);
        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(registerData));
      dispatch(isAuthenticated(true));
      toast.success(messages.regieter_success);
      navigate("/");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) toast.error((isError as any).data.message);
  }, [isError]);
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>

        <form
          onSubmit={form.handleSubmit(handleRegister)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Fullname</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            type="submit"
            loading={isLoading}
            loadingPosition="start"
            startIcon={<FaSignInAlt />}
            variant="contained"
          >
            {isLoading ? "Loading....." : "Register"}
          </LoadingButton>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/login"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}
