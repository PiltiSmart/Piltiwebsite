"use client";

import React from "react";

export default function TrademarksPage() {
    return (
        <div className="pt-24 pb-32">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-[36px] font-semibold mb-12">Trademarks</h1>
                <div className="prose dark:prose-invert max-w-none text-[#262626] dark:text-muted-foreground space-y-8">
                    <section>
                        <h2 className="text-[24px] font-semibold mb-4 text-[#262626] dark:text-foreground">General Guidelines</h2>
                        <p className="text-[15px] leading-relaxed">
                            PiltiSmart trademarks and brand elements are valuable assets that represent
                            our reputation for innovation and quality.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-[24px] font-semibold mb-4 text-[#262626] dark:text-foreground">Registered Trademarks</h2>
                        <ul className="list-disc pl-6 space-y-2 text-[15px]">
                            <li>PiltiSmart&trade;</li>
                            <li>SmartySwitch&trade;</li>
                            <li>SmartyApp&trade;</li>
                        </ul>
                    </section>

                    <section>
                        <p className="text-[15px] leading-relaxed">
                            All other product names and company names mentioned herein may be the trademarks
                            of their respective owners.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
