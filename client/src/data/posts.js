import photo1 from "../images/postsPhoto/1.jpeg";
import photo2 from "../images/postsPhoto/2.jpeg";
import photo3 from "../images/postsPhoto/3.jpeg";
import photo4 from "../images/postsPhoto/1.jpeg";

export const posts = [
  {
    id: 1,
    userId: 1,
    content: "hello world",
    createdAt: "2022-03-17T03:24:00",
    likedBy: [1, 2, 3, 4],
    photo: photo1,
  },
  {
    id: 2,
    userId: 1,
    content: "hello world again",
    createdAt: "2022-04-17T03:24:00",
    likedBy: [1, 2, 3],
    photo: photo2,
  },
  {
    id: 3,
    userId: 2,
    content: "Hi world",
    createdAt: "2022-05-17T03:24:00",
    likedBy: [1, 2],
    photo: photo3,
  },
  {
    id: 4,
    userId: 2,
    content: "Hi world again",
    createdAt: "2022-01-17T03:24:00",
    likedBy: [2],
    photo: photo4,
  },
];
