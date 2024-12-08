import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserInfo, updateUserInfo } from "@/api/auth";
import { queryKeys } from "@/api/queryKeys";
import { Cookies } from "react-cookie";
import { UserInfoType, UpdateUserInfoResponse } from "@/types/mypageType";

export const useGetUserData = (accessToken: string) => {
  return useQuery({
    queryKey: queryKeys.userData,
    queryFn: () => getUserInfo(accessToken),
  });
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  const cookies = new Cookies();
  const accessToken = cookies.get("access_token");
  return useMutation<UpdateUserInfoResponse, Error, UserInfoType>({
    mutationFn: ({ avatar, nickname }) => updateUserInfo(accessToken, avatar, nickname),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.userData, data);
      queryClient.invalidateQueries({
        queryKey: queryKeys.userData,
      });
    },
  });
};
