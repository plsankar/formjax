import type { Errorable, Fields, ParsedRequestResponse } from "@/types";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const fieldsSchema = z.object({
    access_key: z
        .string({
            required_error: "Access Key is required",
            invalid_type_error: "Access Key must be a string",
        })
        .min(3, { message: "Access Key must be at least 3 characters long" }),
    subject: z
        .string({
            required_error: "Subject is required",
            invalid_type_error: "Subject must be a string",
        })
        .min(3, { message: "Subject must be at least 3 characters long" })
        .default("New Form Submission!"),
});

export async function parseSubmitRequest(request: Request): Promise<ParsedRequestResponse> {
    const contentType = request.headers.get("Content-Type")?.toLowerCase();

    if (!contentType || contentType.length === 0) {
        return [null, "`Content-Type` is empty."];
    }

    let fields: any | null = null;

    try {
        if (contentType.includes("application/json")) {
            fields = await request.json();
        } else if (contentType.includes("application/x-www-form-urlencoded")) {
            const formData = await request.formData();
            fields = Object.fromEntries(formData.entries());
        } else if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();
            fields = Object.fromEntries(formData.entries());
        } else {
            return [null, "`Content-Type` is not recognized."];
        }
    } catch (error) {
        console.log(error);
        return [null, "Unable to parse the data."];
    }

    if (!fields) {
        return [null, "Unable to parse the data."];
    }

    console.log(fields);

    const [_fields, errors] = validateSubmitFields(fields);

    console.log(_fields);
    if (errors) {
        return [null, errors];
    }

    return [{ contentType, fields: _fields! }, null];
}

export function submitError(message: string, request: Request) {
    const accept = request.headers.get("Accept")?.toLowerCase() || "application/json";
    if (!accept.includes("text/html")) {
        return NextResponse.json({ success: false, message });
    } else {
        const url = new URL("/form", request.url);
        url.searchParams.append("message", message);
        url.searchParams.append("type", "error");
        return NextResponse.redirect(url);
    }
}

function validateSubmitFields(fields: any): Errorable<Fields, string> {
    const validated = fieldsSchema.safeParse(fields);
    if (!validated.success) {
        return [null, validated.error.errors.map((error) => error.message).join("\n")];
    }
    return [fields, null];
}

export function getMailTransport() {
    const transporter = nodemailer.createTransport({
        port: 587,
        // name: "example.com",
        // host: "example.com",
        // port: 587, // Use 465 for secure SMTP
        // secure: false, // True for 465, false for other ports
        // auth: {
        //     user: "mailer@example.com",
        //     pass: "H!ERX*ZHSn1f", // Replace with your email account’s password
        // },
        // tls: {
        //     rejectUnauthorized: false,
        // },
    });

    return transporter;
}
