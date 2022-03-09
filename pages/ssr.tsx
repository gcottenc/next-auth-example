import Layout from "../components/layout"
import {GetServerSideProps} from "next"
import React from "react"
import {getSession} from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await getSession(context)
    console.log("awaited getSession, access token is now: " + session?.accessToken)

    return {props: {}}
}

const Ssr = () => {

    return (
        <Layout>
            <h1>Done</h1>
        </Layout>
    )
}

export default Ssr
