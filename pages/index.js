import PostFeed from "../components/PostFeed";
import Metatags from "../components/Metatags";
import Loader from "../components/Loader";
import { firestore, fromMillis, postToJSON } from "../lib/firebase";

import { useState } from "react";

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  // Get next page in pagination query
  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1]; // get index of last post on page

    // there is a difference in the type returned based on whether we render on
    // the client or the server so we must conver it
    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    // build query for posts from firestore db
    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc") // posts are sorted by created date
      .startAfter(cursor) // start after index of last post on page
      .limit(LIMIT); // limit of posts that can be returned

    // take snapshot and
    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    // add posts to current post list
    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <Metatags
        title="Home Page"
        description="Get the latest posts on our site"
      />

      <div className="card card-info">
        <h2>Spark, a simple blog app to share unimportant ideas.</h2>
        <p>
          Welcome! This app is built with Next.js and Firebase and features
          client side, server side, and staticly generated pages. It was baed on
          fireships next.js firbase course.
        </p>
        <p>
          Sign up for an 👨‍🎤 account, ✍️ write posts, then 💞 heart content
          created by other users. All public content is server-rendered and
          search-engine optimized.
        </p>
      </div>

      <PostFeed posts={posts} />

      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}

      <Loader show={loading} />

      {postsEnd && "You have reached the end!"}
    </main>
  );
}
