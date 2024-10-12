import nodemailer from 'nodemailer';

import httpResponseMessages from "@/consts/response-messages";
import { APIError } from '@/middlewares/error.middleware';
import httpStatusCodes from '@/consts/status-codes';

class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT) || 587,
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
        });
    }

    async sendVerificationEmail(email: string, verificationToken: string): Promise<void> {
        const verificationUrl = `${process.env.FRONTEND_URL}/verify?token=${verificationToken}`;

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Verify Your Email',
            html: `<p>Please verify your email by clicking the link below:</p>
                   <a href="${verificationUrl}">Verify Email</a>`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            throw new APIError(httpStatusCodes.InternalServerError, httpResponseMessages.EmailSendError);
        }
    }

    async sendChangePasswordEmail(email: string, changePasswordToken: string): Promise<void> {
        const changePasswordUrl = `${process.env.FRONTEND_URL}/change-password?token=${changePasswordToken}`;

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Change Your Password',
            html: `<p>You requested a password change. Click the link below to change your password:</p>
                   <a href="${changePasswordUrl}">Change Password</a>`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            throw new APIError(httpStatusCodes.InternalServerError, httpResponseMessages.EmailSendError);
        }
    }
}

export const emailService = new EmailService();