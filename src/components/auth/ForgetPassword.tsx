"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, KeyRound, Lock } from "lucide-react";

import {
  sendResetCodeAction,
  verifyResetCodeAction,
  resetPasswordAction,
} from "@/actions/forgetPass.action";

type Step = "email" | "code" | "reset";

export default function ForgotPasswordDialog() {
  const [step, setStep] = useState<Step>("email");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const savedEmailRef = useRef("");

  async function handleSendCode() {
    const email = emailRef.current?.value || "";
    if (!email.trim()) return toast.error("Enter your email");

    setLoading(true);
    try {
      const response = await sendResetCodeAction(email);
      if (response?.statusMsg === "success") {
        savedEmailRef.current = email;
        setStep("code");
        toast.success(response.message);
      } else {
        toast.error(response?.message || "Error");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode() {
    const code = codeRef.current?.value || "";
    if (!code.trim()) return toast.error("Enter the code");

    setLoading(true);
    try {
      const response = await verifyResetCodeAction(code);
      console.log(response);
      
      if (response?.status === "Success") {
        setStep("reset");
      } else {
        toast.error(response?.status);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword() {
    const email = savedEmailRef.current;
    const newPassword = passwordRef.current?.value || "";
    if (!newPassword.trim()) return toast.error("Enter new password");

    setLoading(true);
    try {
      const response = await resetPasswordAction(email, newPassword);
      if (response?.token) {
        toast.success("Password reset Successfully");
      } else {
        toast.error("Error");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleContinue() {
    if (step === "email") return handleSendCode();
    if (step === "code") return handleVerifyCode();
    return handleResetPassword();
  }

  const title =
    step === "email"
      ? "Forgot Password"
      : step === "code"
      ? "Verify Code"
      : "Reset Password";

  const icon =
    step === "email" ? (
      <Mail className="h-4 w-4" />
    ) : step === "code" ? (
      <KeyRound className="h-4 w-4" />
    ) : (
      <Lock className="h-4 w-4" />
    );

  const buttonText =
    step === "email" ? "Send Code" : step === "code" ? "Verify" : "Reset";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <a className="ml-auto text-sm underline cursor-pointer">
          Forgot your password?
        </a>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-accent/5">
              {icon}
            </span>
            {title}
          </DialogTitle>
          <DialogDescription>
            {step === "email" && "Enter your email to receive a reset code."}
            {step === "code" && "Enter the code sent to your email."}
            {step === "reset" && "Enter your new password."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          <div className="rounded-2xl border bg-accent/5 p-4 space-y-3">
            {step === "email" && (
              <>
                <Label>Email</Label>
                <Input ref={emailRef} className="bg-white" type="email" />
              </>
            )}

            {step === "code" && (
              <>
                <Label>Verification code</Label>
                <Input ref={codeRef} className="bg-white" />
              </>
            )}

            {step === "reset" && (
              <>
                <Label>New password</Label>
                <Input ref={passwordRef} type="password" className="bg-white" />
              </>
            )}
          </div>
        </div>

        <DialogFooter className="mt-4 gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-3xl">
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={handleContinue} disabled={loading} className="rounded-3xl">
            {loading && <Loader2 className="animate-spin mr-2" />}
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}