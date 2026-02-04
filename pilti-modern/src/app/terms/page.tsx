"use client";

import React from "react";

export default function TermsPage() {
    return (
        <div className="pt-24 pb-32">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-[36px] font-semibold mb-12">Terms of Use</h1>
                <div className="prose dark:prose-invert max-w-none text-[#262626] dark:text-muted-foreground space-y-8">
                    <section>
                        <h2 className="text-[24px] font-semibold mb-4 text-[#262626] dark:text-foreground">Acceptance of Terms</h2>
                        <p className="text-[15px] leading-relaxed">
                            By accessing or using PiltiSmart services, you agree to be bound by these Terms of Use.
                            If you do not agree, do not use the services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[24px] font-semibold mb-4 text-[#262626] dark:text-foreground">Use of Services</h2>
                        <p className="text-[15px] leading-relaxed">
                            You may use our smart devices and cloud platform only as permitted by law and these terms.
                            You are responsible for any activity that occurs through your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[24px] font-semibold mb-4 text-[#262626] dark:text-foreground">Software License</h2>
                        <p className="text-[15px] leading-relaxed">
                            Some of our services allow you to download client software. PiltiSmart gives you a
                            personal, worldwide, royalty-free, non-assignable and non-exclusive license to use
                            the software provided to you.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
