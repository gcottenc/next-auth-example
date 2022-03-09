import Layout from "../components/layout"
import Link from "next/link"

export default function IndexPage() {
  return (
    <Layout>
      <h1>NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use{" "}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
      </p>
        <p>SSR getting/refreshing access token demo:
        <Link href="/ssr">
            <a>SSR</a>
        </Link>
        </p>
    </Layout>
  )
}
