import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Unicons from "@iconscout/react-unicons";
import { Link, useNavigate, useParams } from "react-router-dom";

//components
import Photo from "../Photo/Photo";
import { timeAgo } from "../../utils/timeAgo";

//img
import likeUnfilled from "../../images/like/like_unfilled.svg";
import likeFilled from "../../images/like/like-filed.svg";
import userPhotoDefault from "../../data/static/userphoto_default.jpeg";

//hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

//store
import { deletePost, likePost } from "../../store/post/actions";
import { authUserIdSelector } from "../../store/auth/selectors";

//styles
import "./styles.scss";

const Post = ({
  post: {
    _id: postId,
    userId: postUserId,
    createdAt,
    content,
    photo,
    firstname,
    lastname,
    userphoto,
    likedBy,
  },
}) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const likes = likedBy;
  const userId = useSelector(authUserIdSelector);

  useEffect(() => {
    likes.includes(userId) ? setLiked(true) : setLiked(false);
  }, [likes.length]);

  const handleDeletePost = async (e) => {
    try {
      const res = await axiosPrivate.delete(`/post/post/${postId}/delete`);

      dispatch(deletePost({ postId: res.data }));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostLike = async (e) => {
    try {
      const res = await axiosPrivate.patch(`/post/post/${postId}/like`);
      dispatch(likePost(res));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUsernameClick = () => {
    navigate(`/account/${postUserId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="posts" data-postid={postId}>
      <section className="posts__post">
        <div className="posts__head">
          <Photo
            className="posts__photo"
            applyRound={true}
            photo={userphoto ? userphoto : userPhotoDefault}
          />
          <div className="posts__short-info">
            <p className="posts__username" onClick={handleUsernameClick}>
              {" "}
              {firstname} {lastname}
            </p>
            <p className="posts__time-ago">{timeAgo(createdAt)}</p>
          </div>
        </div>
        <div className="posts__body">
          <p className="posts__content">{content}</p>
          <div className={`posts__img ${photo ? "" : "posts__img_hide"}`}>
            <img src={photo} />
          </div>
        </div>
        <div className="posts__footer">
          <div className="posts__likes">
            <div className="posts__like" onClick={handlePostLike}>
              {liked ? <img src={likeFilled} /> : <img src={likeUnfilled} />}
            </div>
            <p className="posts__likes-number">{likes.length} likes</p>
          </div>
        </div>
        <div className="posts__del" onClick={handleDeletePost}>
          X
        </div>
      </section>
    </div>
  );
};

export default Post;
