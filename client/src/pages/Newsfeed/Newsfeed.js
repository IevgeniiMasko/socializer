import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Components
import AssetLoader from "../../components/AssetLoader/AssetLoader";
import Post from "../../components/Post/Post";

//hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

//store
import { addAllPosts, clearPosts } from "../../store/post/actions";
import { getAllPostsSelector } from "../../store/post/selector";

//styles
import "./styles.scss";

const Newsfeed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [newsfeed, setNewfeed] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const posts = useSelector(getAllPostsSelector);

  useEffect(() => {
    setIsLoading(true);
    axiosPrivate.get("/post/newsfeed").then((res) => {
      const data = res.data.sort((a, b) => {
        if (new Date(a.createdAt) > new Date(b.createdAt)) return -1;
        if (new Date(a.createdAt) < new Date(b.createdAt)) return 1;
        return 0;
      });
      dispatch(addAllPosts({ data }));
      // setNewfeed(data);
      setIsLoading(false);
    });

    return () => {
      dispatch(clearPosts());
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading posts...</div>
      ) : (
        <div className="newsfeed">
          <div className="container">
            <div className="newsfeed__body">
              <AssetLoader />
              {posts.map((post) => {
                return <Post key={post._id} post={post} />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Newsfeed;
