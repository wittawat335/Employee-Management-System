import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToLogin = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);

    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-rose-950">Redirecting you in {count} sec</p>
    </div>
  );
};

export default RedirectToLogin;
