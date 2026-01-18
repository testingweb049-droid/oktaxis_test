// Re-export FleetType from types folder for backward compatibility
export type { FleetType } from "@/types/fleet.types";

// Discounts are now managed from backend - pricing settings
export const discounts: Record<string, number> = {};
