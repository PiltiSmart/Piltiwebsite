"use client";

import React from "react";

export default function PrivacyPage() {
    return (
        <div className="pt-24 pb-32">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-[36px] font-semibold mb-12">Privacy Statement</h1>
                <div className="prose dark:prose-invert max-w-none text-[#262626] dark:text-muted-foreground space-y-8">
                    <section>
                        <h2 className="text-[24px] font-semibold mb-4 text-[#262626] dark:text-foreground">Introduction</h2>
                        <p className="text-[15px] leading-relaxed">
                            Your privacy is important to us. This privacy statement explains the personal data
                            PiltiSmart processes, how PiltiSmart processes it, and for what purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[24px] font-semibold mb-4 text-[#262626] dark:text-foreground">Personal Data We Collect</h2>
                        <p className="text-[15px] leading-relaxed">
                            PiltiSmart collects data from you, through our interactions with you and through
                            our products. You provide some of this data directly, such as when you create
                            a PiltiSmart account, or register a smart device.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[24px] font-semibold mb-4 text-[#262626] dark:text-foreground">How We Use Personal Data</h2>
                        <p className="text-[15px] leading-relaxed">
                            PiltiSmart uses the data we collect to provide you with rich, interactive experiences.
                            In particular, we use data to provide our products, which includes updating, securing,
                            and troubleshooting, as well as providing support.
                        </p>
                    </section>

                    <section className="bg-[#F2F2F2] dark:bg-muted/10 p-8 border-l-4 border-[#0078D4]">
                        <p className="text-[14px] italic">
                            Last updated: February 2026. This policy is subject to change as our smart services evolve.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
