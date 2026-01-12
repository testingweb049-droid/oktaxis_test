/* eslint-disable react-refresh/only-export-components */
"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import { AdminSidebarContext } from "./admin-shell";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function AdminPageHeader({
  title,
  description,
  actions,
}: AdminPageHeaderProps) {
  const sidebar = React.useContext(AdminSidebarContext);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 md:left-64 lg:left-72 z-30 border-b border-border/60 bg-white">
        <div className="mx-4 md:mx-8 flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 py-5 md:py-4">
          <div className="flex items-center justify-between gap-2 md:gap-3">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-heading-black leading-tight">
                {title}
              </h1>
              {description && (
                <p className="mt-1 text-sm text-text-gray">{description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => sidebar?.setOpen(true)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-heading-black text-white border-white/30 shadow-md md:hidden"
              aria-label="Open admin navigation"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>

          {actions && (
            <div className="w-full md:w-auto md:flex md:items-center md:justify-end">
              {actions}
            </div>
          )}
        </div>
      </div>
      {/* Spacer to offset the fixed header height so content starts below it */}
      <div className="h-[86px] md:h-[56px]" />
    </>
  );
}
