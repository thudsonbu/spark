import Head from "next/head";

export default function Metatags({ title = "Spark" }) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
