import { Errorable, ParsedRequest } from "@/types";
import { getMailTransport, parseSubmitRequest, submitError } from "./utils";

import { Form } from "@prisma/client";
import { NextResponse } from "next/server";
import { SubmissionNotification } from "../../../../emails/submission-notification";
import db from "@/lib/db/db";
import { render } from "@react-email/components";

export async function POST(request: Request) {
    const [parsedRequest, error] = await parseSubmitRequest(request);

    if (error != null) {
        return submitError(error, request);
    }

    const [form, authenticatdError] = await authenticateForm(parsedRequest);

    if (authenticatdError != null) {
        return submitError(authenticatdError, request);
    }

    const transporter = getMailTransport();

    const { subject, ...fields } = parsedRequest.fields;

    const emailComponent = SubmissionNotification({ subject, fields });

    const [emailHtml, emailText] = await Promise.all([
        render(emailComponent),
        render(emailComponent, {
            plainText: true,
        }),
    ]);

    const mailOptions = {
        from: "",
        to: form.email,
        subject: parsedRequest.fields.subject,
        text: emailText,
        html: emailHtml,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(`mail error`);
        console.log(error);
        return submitError("Failed to connect to the email server!", request);
    }

    try {
        await db.submission.create({
            data: {
                formId: form.id,
            },
        });
    } catch (error) {
        console.log(`submission increment error`);
        console.log(error);
    }

    return NextResponse.json(parsedRequest);
}

// TODO: check form status
async function authenticateForm(data: ParsedRequest): Promise<Errorable<Form, string>> {
    const accessKey = data.fields["access_key"];
    let form: Form | null;
    try {
        form = await db.form.findUnique({
            where: {
                apiKey: accessKey,
            },
        });
    } catch (error) {
        return [null, "Unknown Error!, Please try again later"];
    }

    if (!form) {
        return [null, "The form is not found!"];
    }

    return [form, null];
}
