'use client';
import AuthBox from "../../components/AuthBox";
import AuthForm from "../../components/AuthForm";
import formfields from "../../utils/formFields";
import { internalRoutes } from "../../utils/internalRoutes";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AdminLoginLeftImg from "../../assets/LoginSigupImgs/AdminLoginLeftImg.png";
import useServices from "../../hooks/useServices";
import adminApi from "../../services/adminApi";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function AdminForgotPassword() {
    const router = useRouter();
    const {
        loading: resetLoading,
        error: resetError,
        success: resetSuccess,
        callApi: resetPasswordApi,
    } = useServices(adminApi.changeAdminPassword);
    const [countdown, setCountdown] = useState(5);
    const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState(false);

    useEffect(() => {
        if (isPasswordResetSuccess) {
            if (countdown > 0) {
                const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
                return () => clearTimeout(timer);
            } else if (countdown === 0 && isPasswordResetSuccess) {
                router.push(internalRoutes.adminLogin);
            }
        }
    }, [countdown, isPasswordResetSuccess, navigate]);

    const handleFormSubmit = async (data) => {
        console.log("hitting admin forgot password", data);
        const userId = Cookies.get("tempId");
        const formData1 = new FormData();
        formData1.append("newPassword", data.password);
        const response = await resetPasswordApi(userId, formData1);
        if (response) {
            console.log(response);
            setIsPasswordResetSuccess(true);
        }
        console.log(response);
    };

    return (
        <div className="w-full h-auto md:h-[100vh] flex flex-col md:flex-row justify-center gap-4 items-center">
            <div className=" w-full md:w-[50%] h-full flex justify-center items-center bg-highlight">
                <img
                    className="w-full md:w-auto md:h-full object-contain "
                    src={AdminLoginLeftImg?.src || AdminLoginLeftImg}
                    alt="Admin Forgot Password"
                />
            </div>
            <div className="w-[90%] md:w-[50%] flex justify-center items-center">
                <AuthBox>
                    <div className="text-center">
                        <h4 className="text-primary text-3xl">Reset Password</h4>
                        <h4 className="text-primary text-xl">Enter your details</h4>
                    </div>
                    {resetError && <p className="text-red-500">{resetError}</p>}
                    {resetSuccess && (
                        <p className="text-green-500">{resetSuccess}</p>
                    )}
                    {resetLoading && (
                        <p className="text-gray-500">Processing...</p>
                    )}
                    {isPasswordResetSuccess && (
                        <div className="text-center">
                            <h4 className="text-base text-green-500">
                                Password Reset Successful!
                            </h4>
                            <p className=" text-base text-green-500">
                                Redirecting to login page in {countdown} seconds...
                            </p>
                        </div>
                    )}

                    <AuthForm
                        stages={formfields.adminForgotPassword}
                        handleFormSubmit={handleFormSubmit}
                        isDisabled={isPasswordResetSuccess || resetLoading}
                        role="admin"
                        formType="adminForgotPassword"
                    />
                    {isPasswordResetSuccess && (
                        <div className="text-center">
                            <h4 className="text-primary text-xl">
                                Password Reset Successful!
                            </h4>
                            <p className="text-primary text-base">
                                Redirecting to login page in {countdown} seconds...
                            </p>
                        </div>
                    )}

                    <div className="flex gap-2 font-semibold">
                        <h5>Remembered your password?</h5>
                        <Link href={internalRoutes.adminLogin}>
                            <button className="btn-transparent">Sign In</button>
                        </Link>
                    </div>
                </AuthBox>
            </div>
        </div>
    );
}

export default AdminForgotPassword;
