import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//Components
import AssetLoader from "../../../components/AssetLoader/AssetLoader";
import Post from "../../../components/Post/Post";

//hooks
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

//store
import { addAllPosts, clearPosts } from "../../../store/post/actions";
import { getAllPostsSelector } from "../../../store/post/selector";

//styles
import "./styles.scss";

const AccountPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const posts = useSelector(getAllPostsSelector);
  const { currentUserId } = useParams();
  useEffect(() => {
    setIsLoading(true);
    // const controller = new AbortController();
    axiosPrivate
      .get(`/post/user/${currentUserId}`)
      .then((res) => {
        const data = res.data.sort((a, b) => {
          if (new Date(a.createdAt) > new Date(b.createdAt)) return -1;
          if (new Date(a.createdAt) < new Date(b.createdAt)) return 1;
          return 0;
        });
        dispatch(addAllPosts({ data }));
      })
      .then(() => setIsLoading(false));

    return () => {
      // controller.abort()
      dispatch(clearPosts());
    };
  }, [currentUserId]);

  return (
    <>
      {isLoading ? (
        <div>Loading posts...</div>
      ) : (
        <div className="account-posts">
          <AssetLoader />
          {posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
        </div>
      )}
    </>
  );
};

export default AccountPosts;
