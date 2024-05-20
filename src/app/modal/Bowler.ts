export interface Bowler {
  id: number;
  firstName: string;
  lastName: string;
  team: string;
  initials: string;
}

export function findBowlerByInitials(
  bowlers: Bowler[],
  initials: string,
): Bowler | undefined {
  return bowlers
    .filter((bowler: Bowler) => {
      return bowler.initials === initials;
    })
    .at(0);
}
