import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useModerator = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: isModerator, isPending: isModeratorLoading } = useQuery({
    queryKey: ["isModerator", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/user/moderator/${user.email}`);
      return res.data;
    },
  });
  return [isModerator, isModeratorLoading];
};

export default useModerator;
