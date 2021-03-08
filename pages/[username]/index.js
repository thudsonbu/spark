import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";

import { getUserWithUsername, postToJSON } from "../../lib/firebase";

/**
 * Get server side props is used when a page will be rendered server side but
 * requires dynamic data
 * @param {query} param0
 * @returns {object} object containing the user and posts that will be used
 */
export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let posts = null;

  // here we order posts by created date, in order to do this a composite
  // index is needed to be created with post published date ascending and posts
  // created date descending
  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
}
