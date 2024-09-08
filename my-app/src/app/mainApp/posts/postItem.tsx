import { Post } from "@/hooks/usePosts";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface PostItemProps {
  post: Post;
  userInfo: any;
  isDeleting: boolean;
  onDelete: (id: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({
  post,
  userInfo,
  isDeleting,
  onDelete,
}) => {
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

  return (
    <div
      key={post.id}
      className="p-4 bg-white rounded shadow overflow-hidden break-words"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center mb-2">
          <img
            src={
              post.user.iconImageUrl || `https://robohash.org/${post.user.name}`
            }
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
        {userInfo && userInfo.id === post.user.id && (
          <button
            onClick={() => onDelete(post.id)}
            disabled={isDeleting}
            className={`text-red-500 rounded hover:text-red-700 ${
              isDeleting ? "bg-gray-400 cursor-not-allowed" : "hover:bg-red-100"
            }`}
          >
            <FontAwesomeIcon icon={faTrash} /> {isDeleting ? "削除中" : "削除"}
          </button>
        )}
      </div>
      <p>{formatPostContent(post.body)}</p>
    </div>
  );
};

export default PostItem;
