"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const AuthErrorPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (errorType) => {
    switch (errorType) {
      case "OAuthAccountNotLinked":
        return "The account is already linked to another provider. Please sign in with the same provider.";
      case "AccessDenied":
        return "You do not have access to this resource.";
      case "Verification":
        return "Email verification failed. Please try again.";
      case "Configuration":
        return "There is an issue with the server configuration.";
      case "ServerError":
        return "An error occurred on the server. Please try again later.";
      case "Signin":
        return "Unable to sign in. Please try again.";
      default:
        return "An unknown error occurred. Please try again.";
    }
  };

  const errorMessage = getErrorMessage(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
      <p className="mt-4 text-lg text-gray-700">{errorMessage}</p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default AuthErrorPage;
