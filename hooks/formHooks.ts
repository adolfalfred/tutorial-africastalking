import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const useSubmitForm = (url: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const submitForm = async (FormData: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const promise = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit the form");
        }
        return response.json();
      })
      .then((data) => {
        setSuccess(true);
        router.push("/signin");
        return data;
      })
      .catch((err) => {
        setError(err.message);
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });

    toast.promise(promise, {
      loading: "Submitting...",
      success: "Submitted successfully!",
      error: "Failed to submit",
    });

    return promise;
  };
  return { submitForm, loading, error, success };
};

export default useSubmitForm;
