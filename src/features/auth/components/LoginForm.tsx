import * as z from "zod";
import { SigninValidation } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { messages } from "@/config/messages";
import { MuiLoadingButton } from "@/components/shared";
import { useLoginMutation } from "@/features/auth/services/authApi";
import { isAuthenticated, setUser } from "@/features/auth/services/authSlice";

const LoginForm = () => {
  const [login, { data: loginData, isLoading, isSuccess, isError, error }] =
    useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (request: z.infer<typeof SigninValidation>) => {
    await login(request);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(loginData));
      dispatch(isAuthenticated(true));
      toast.success(messages.login_success);

      navigate("/");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log({ error });
      toast.error(JSON.stringify(error?.data));
    }
  }, [isError]);

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log in</h2>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">E-Mail</FormLabel>
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
          <MuiLoadingButton
            type="submit"
            loading={isLoading}
            loadingPosition="start"
            startIcon={<FaSignInAlt />}
          >
            {" "}
            {isLoading ? "Loading....." : "Log in"}
          </MuiLoadingButton>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/register"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default LoginForm;
