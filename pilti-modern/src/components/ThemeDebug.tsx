"use client";

import React from 'react';

export default function ThemeDebug() {
    return (
        <div className="fixed bottom-4 left-4 p-4 bg-card border border-border rounded-lg shadow-xl z-[9999] text-xs font-mono opacity-50 hover:opacity-100 transition-opacity">
            <div className="mb-2 font-bold text-foreground">Theme Debug</div>
            <div className="flex gap-2 items-center mb-1">
                <div className="w-4 h-4 bg-background border border-border"></div>
                <span>bg</span>
            </div>
            <div className="flex gap-2 items-center mb-1">
                <div className="w-4 h-4 bg-primary rounded"></div>
                <span>primary</span>
            </div>
            <div className="flex gap-2 items-center">
                <div className="w-4 h-4 bg-secondary-text rounded"></div>
                <span>muted</span>
            </div>
        </div>
    );
}
