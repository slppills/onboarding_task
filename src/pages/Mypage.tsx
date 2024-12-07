import { getUserInfo, updateUserInfo } from "@/api/auth";
import { useEffect, useRef, useState } from "react";
import { queryKeys } from "@/api/queryKeys";
import { Cookies } from "react-cookie";
import defaultProfile from "../../public/images/defaultProfile.jpg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Mypage = () => {
  const queryClient = useQueryClient();
  const [isRenaming, setIsRenaming] = useState(false);
  const [userNickname, setUserNickname] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const cookies = new Cookies();
  const accessToken = cookies.get("access_token");
  const fileInputRef = useRef(null);

  const { data: userData } = useQuery({
    queryKey: queryKeys.userData,
    queryFn: () => getUserInfo(accessToken),
  });

  const mutation = useMutation({
    mutationFn: ({ avatar, nickname }: { avatar: string; nickname: string }) =>
      updateUserInfo(accessToken, avatar, nickname),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.userData, data);
      queryClient.invalidateQueries({
        queryKey: queryKeys.userData,
      });
    },
  });

  const handleProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        mutation.mutate({ avatar: reader.result as string, nickname: userNickname });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setUserNickname(userData?.nickname);
    setUserAvatar(userData?.avatar);
  }, [userData]);

  return (
    <div className="w-[400px] mx-auto mt-32 flex flex-col items-center gap-10">
      <div className="flex gap-10 items-center">
        {isRenaming ? (
          <input
            type="text"
            value={userNickname}
            onChange={(e) => setUserNickname(e.target.value)}
            className="border p-2 rounded-md"
          />
        ) : (
          <p className="text-[1.3rem]">닉네임 : {userData?.nickname}</p>
        )}
        {isRenaming ? (
          <button
            className=" p-2 bg-gray-300 rounded-lg"
            onClick={() => {
              alert("닉네임이 수정되었습니다.");
              setIsRenaming(false);
              mutation.mutate({ avatar: userAvatar, nickname: userNickname });
            }}
          >
            수정 완료
          </button>
        ) : (
          <button className=" p-2 bg-gray-300 rounded-lg" onClick={() => setIsRenaming(true)}>
            닉네임 수정
          </button>
        )}
      </div>
      <div className="flex flex-col items-center gap-4">
        <img
          src={userData?.avatar || defaultProfile}
          alt="유저 프로필 사진"
          className="w-[100px] h-[100px] object-cover"
        />
        <button className="p-1" onClick={handleProfileClick}>
          프로필 변경
        </button>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleFileChange(e)}
        />
      </div>
    </div>
  );
};

export default Mypage;
