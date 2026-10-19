export const CREW_ROLES = ["Director", "Writer", "Producer"] as const;
export type CrewRole = (typeof CREW_ROLES)[number];
