import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { DEFAULT_ICON_URL } from "@/lib/config";
import { userState } from "@/lib/recoil/atoms";
import { useRecoilValue } from "recoil";
import usePosts from "./usePosts";
import AsyncButton from "@/lib/components/AsyncButton";

const PostList: React.FC = () => {
  const LoggedInuserInfo = useRecoilValue(userState);
  const { deletePostById, posts } = usePosts();

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Tokyo",
    };
    return new Date(dateString).toLocaleDateString("ja-JP", options);
  };

  const formatPostContent = (content: string) => {
    return content.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("本当に削除しますか？")) return;
    await deletePostById(postId);
  };

  return (
    <div className="grid gap-4 px-4 pb-20">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-4 bg-white rounded shadow overflow-hidden break-words"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center mb-2">
              <img
                src={post.user.iconImageUrl || DEFAULT_ICON_URL}
                alt="User Icon"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <p className="font-bold">{post.user.name}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </div>
            {LoggedInuserInfo && LoggedInuserInfo.id === post.user.id && (
              <AsyncButton
                type="button"
                onClick={() => handleDelete(post.id)}
                loadingText="削除中"
                baseClassName="text-red-500 rounded hover:text-red-700"
                disabledClassName="bg-gray-400 cursor-not-allowed"
                activeClassName="hover:bg-red-100"
              >
                <FontAwesomeIcon icon={faTrash} /> 削除
              </AsyncButton>
            )}
          </div>
          <div className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
            <p>{formatPostContent(post.body)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
