import type React from "react";

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
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-semibold text-heading-black">{title}</h1>
        {description && (
          <p className="text-lg text-text-gray">{description}</p>
        )}
      </div>
      {actions && <div className="mt-2 sm:mt-0">{actions}</div>}
    </div>
  );
}


