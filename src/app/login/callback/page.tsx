import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query;
    if (code) {
      window.opener.postMessage(
        { type: "GOOGLE_LOGIN", code },
        `${process.env.NEXT_PUBLIC_BASE_URL}/login/`,
      );
      window.close();
    }
  }, [router.query]);

  return <div>Processing...</div>;
}
