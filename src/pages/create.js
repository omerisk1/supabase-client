import { incrementByAmount } from "@/store/features/counter/counterSlice";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Create() {
  const dispatch = useDispatch();
  const [job, setJob] = useState([]);
  const counter = useSelector((state) => state.job.value);

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      dispatch(incrementByAmount(job));
      setJob("");
    }
  };

  return (
    <>
      <div className="text-center mt-10">
        <h1 className="mb-5 text-2xl">Create Job</h1>

        <input
          type="text"
          placeholder="Job"
          className="p-3 rounded w-1/4 border-2 border-gray-300"
          value={job}
          onChange={(e) => {
            setJob(e.target.value);
          }}
          onKeyUp={handleKeyUp}
        ></input>
      </div>
    </>
  );
}

// export const getServerSideProps = withPageAuth({ redirectTo: "/Login" });

// OTHER WAY CHECK AUTH
export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/Login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
