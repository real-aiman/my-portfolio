import { Marquee } from "../ui/Marquee";
import { TECH_MARQUEE_ITEMS } from "../../data/site";

export function TechTicker() {
  return <Marquee items={TECH_MARQUEE_ITEMS} />;
}
