import * as React from "react";

import { Body, Container, Font, Head, Html, Img, Link, Preview, Text } from "@react-email/components";

interface InstantFormCreateNotificationProps {
    subject?: string;
    accessKey: string;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const InstantFormCreateNotification = ({ subject = "Your Access Key for Formsubmit", accessKey }: InstantFormCreateNotificationProps) => {
    return (
        <Html>
            <Head>
                <Font
                    fontFamily="Sora"
                    fallbackFontFamily="Helvetica"
                    webFont={{
                        url: "https://cdn.jsdelivr.net/fontsource/fonts/sora@latest/latin-400-normal.woff2",
                        format: "woff2",
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
                <Font
                    fontFamily="Plus Jakarta Sans"
                    fallbackFontFamily="Helvetica"
                    webFont={{
                        url: "https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans@latest/latin-500-normal.woff2",
                        format: "woff2",
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Preview>{subject}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Text style={{ ...text, marginBottom: "14px", opacity: 0.5 }}>Hello,</Text>
                    <Text style={{ ...text, marginBottom: "14px", opacity: 0.5 }}>
                        Thank you for using <span style={{ ...serif, opacity: 1, color: "black" }}>Formsubmit</span>.
                    </Text>
                    <Text style={{ ...text, marginBottom: "14px", opacity: 0.5 }}>Your Access Key is:</Text>
                    <code style={code}>{`${accessKey}`}</code>
                    <hr style={{ opacity: 0.1, margin: "40px 0" }} />
                    <Img src={`${baseUrl}/static/notion-logo.png`} width="32" height="32" alt="Notion's Logo" />
                    <Text style={footer}>
                        <Link href="https://notion.so" target="_blank" style={{ ...link, color: "#898989" }}>
                            Notion.so
                        </Link>
                        , the all-in-one-workspace
                        <br />
                        for your notes, tasks, wikis, and databases.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

InstantFormCreateNotification.PreviewProps = {
    subject: "Your Access Key for Web3Forms",
    accessKey: "2e0766f1-8b0a-4241-81d5-c93e3bf2ebb8",
} as InstantFormCreateNotificationProps;

export default InstantFormCreateNotification;

const main = {
    backgroundColor: "#ffffff",
    letterSpacing: "0.01em",
};

const container = {
    paddingLeft: "12px",
    paddingRight: "12px",
    margin: "0 auto",
};

const link = {
    color: "#2754C5",
    fontFamily:
        "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    textDecoration: "underline",
};

const text = {
    color: "#333",
    fontFamily:
        "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    margin: "24px 0",
};

const serif = {
    fontFamily: "'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const footer = {
    color: "#898989",
    fontFamily:
        "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    lineHeight: "22px",
    marginTop: "12px",
    marginBottom: "24px",
};

const code = {
    display: "inline-block",
    padding: "16px 4.5%",
    width: "90.5%",
    backgroundColor: "#f4f4f4",
    borderRadius: "5px",
    border: "1px solid #eee",
    color: "#333",
};
