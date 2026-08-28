import { Lightbulb, CarFront, BatteryCharging, Cog, Droplet, Filter, Wrench, type LucideIcon } from 'lucide-react';

export const categoryIcons: Record<string, LucideIcon> = {
  optika: Lightbulb,
  kuzov: CarFront,
  elektrika: BatteryCharging,
  motor: Cog,
  masla: Droplet,
  filtra: Filter,
  'vse-dlya-to': Wrench,
  hodovaya: Cog,
};

export function getCategoryIcon(slug: string): LucideIcon {
  return categoryIcons[slug] ?? Wrench;
}
