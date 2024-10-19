"use server";

import { Errorable, NetworkErroable, PassableError } from "@/types";
import { InstantFormSchema, InstantFormSchemaType } from "@/lib/schemas";

import { Form } from "@prisma/client";
import InstantFormCreateNotification from "../../emails/instant-form-create-notification";
import { ZodError } from "zod";
import db from "@/lib/db/db";
import { getMailTransport } from "@/app/api/submit/utils";
import { render } from "@react-email/components";

export async function submitInstantForm(data: InstantFormSchemaType): Promise<NetworkErroable<null, ZodError | null>> {
    const parsedData = InstantFormSchema.safeParse(data);

    if (!parsedData.success) {
        return { success: false, error: parsedData.error, message: "Fill the form correctly" };
    }

    const { email } = parsedData.data;

    let form: Form;

    try {
        form = await db.form.create({
            data: { email },
        });
    } catch (error) {
        console.error(error);
        return { message: "Failed to created the form.", error: null, success: false };
    }

    const emailComponent = InstantFormCreateNotification({ accessKey: form.apiKey });

    const [emailHtml, emailText] = await Promise.all([
        render(emailComponent),
        render(emailComponent, {
            plainText: true,
        }),
    ]);

    const mailOptions = {
        from: "",
        to: form.email,
        subject: "Your Access Key for Formsubmit",
        text: emailText,
        html: emailHtml,
    };

    try {
        const transporter = getMailTransport();
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(`mail error`);
        console.log(error);
        return { message: "Failed to send the email notification.", error: null, success: false };
    }

    return {
        success: true,
        message: "The Access Key has been sent to your email!",
        data: null,
    };
}
