import * as React from "react";

import { Body, Container, Head, Html, Img, Link, Preview, Text } from "@react-email/components";

interface SubmissionNotificationProps {
    subject: string;
    fields: { [key: string]: any };
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const SubmissionNotification = ({ subject, fields }: SubmissionNotificationProps) => {
    return (
        <Html>
            <Head />
            <Preview>{subject}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Text style={{ ...text, marginBottom: "14px" }}>
                        Hello, <br />A new form has been submitted on your website. Details below.
                    </Text>
                    {Object.keys(fields).map((key) => (
                        <>
                            <Text
                                style={{
                                    ...text,
                                    color: "#ababab",
                                    marginTop: "14px",
                                    marginBottom: "16px",
                                }}
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Text>
                            <code style={code}>{fields[key]}</code>
                        </>
                    ))}
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

SubmissionNotification.PreviewProps = {
    subject: "Contact form submission!",
    fields: { name: "John", email: "john@example.com", message: "Hello!" },
} as SubmissionNotificationProps;

export default SubmissionNotification;

const main = {
    backgroundColor: "#ffffff",
};

const container = {
    paddingLeft: "12px",
    paddingRight: "12px",
    margin: "0 auto",
};

const link = {
    color: "#2754C5",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    textDecoration: "underline",
};

const text = {
    color: "#333",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    margin: "24px 0",
};

const footer = {
    color: "#898989",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
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
