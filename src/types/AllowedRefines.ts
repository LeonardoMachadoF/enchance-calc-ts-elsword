export type AllowedRefines = 8 | 9 | 10 | 11 | 12;
export type AllowedRefinesFinal = AllowedRefines & Exclude<AllowedRefines, 8>;