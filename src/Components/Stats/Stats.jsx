import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useUser from "../../hooks/useUser";

const Stats = () => {
  const axiosPublic = useAxiosPublic();
  const { userInfo } = useUser();

  const { data: userStats, isLoading } = useQuery({
    queryKey: ["userStats", userInfo?.email],
    initialData: {},
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/v1/user-stats/${userInfo?.email}`
      );
      return res.data;
    },
  });

  console.log(userStats);

  return (
    <div>
      {isLoading ? (
        <span className="mt-20 loading loading-spinner text-info tex-2xl text-center"></span>
      ) : (
        <div>
          <div className="stats stats-vertical lg:stats-horizontal shadow mt-10">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total Added Products</div>
              <div className="stat-value text-primary">
                {userStats?.result?.length}
              </div>
              <div className="stat-desc">21% more than last month</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Accepted </div>
              <div className="stat-value text-secondary">
                {userStats.accepted}
              </div>
              <div className="stat-desc">21% more than last month</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="avatar online">
                  <div className="w-16 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
              </div>
              <div className="stat-title">Featured </div>
              <div className="stat-value">{userStats.featured}</div>
              <div className="stat-title">Tasks done</div>
              <div className="stat-desc text-secondary">31 tasks remaining</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="avatar online">
                  <div className="w-16 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
              </div>
              <div className="stat-title">Pending</div>
              <div className="stat-value">{userStats?.pending}</div>
              <div className="stat-title">Tasks done</div>
              <div className="stat-desc text-secondary">31 tasks remaining</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
