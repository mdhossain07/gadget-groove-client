import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useUser from "../../hooks/useUser";
import {
  FaCheckCircle,
  FaFileMedical,
  FaQuestionCircle,
  FaStar,
} from "react-icons/fa";

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
                <FaFileMedical className="text-2xl mt-5" />
              </div>
              <div className="stat-title">Total Added Products</div>
              <div className="stat-value text-primary">
                {userStats?.result?.length}
              </div>
            </div>
            <div className="stat">
              <div className="stat-figure text-accent">
                <FaCheckCircle className="text-xl mt-5" />
              </div>
              <div className="stat-title">Accepted </div>
              <div className="stat-value text-accent">{userStats.accepted}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-blue-500">
                <FaStar className="text-2xl mt-5" />
              </div>
              <div className="stat-title">Featured </div>
              <div className="stat-value text-blue-500">
                {userStats.accepted}
              </div>
            </div>

            <div className="stat">
              <div className="stat-figure text-warning">
                <FaQuestionCircle className="text-2xl mt-5" />
              </div>
              <div className="stat-title">Pending </div>
              <div className="stat-value text-warning">{userStats.pending}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-error">
                <FaQuestionCircle className="text-2xl mt-5" />
              </div>
              <div className="stat-title">Rejected </div>
              <div className="stat-value text-error">{userStats.rejected}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
