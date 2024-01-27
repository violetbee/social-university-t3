import { publicProcedure, router } from "../trpc";
import {
  getSchoolClubDetails,
  getSchoolClubDetailsProps,
} from "../../../apis/school-club/GET/school-club";
import {
  getSchoolClubs,
  getSchoolClubsProps,
} from "../../../apis/school-club/GET/school-clubs";

export const schoolClubRouter = router({
  getSchoolClub: publicProcedure
    .input(getSchoolClubDetailsProps)
    .query(async ({ input, ctx }) => getSchoolClubDetails(input, ctx)),
  getAllSchoolClubs: publicProcedure
    .input(getSchoolClubsProps)
    .query(async ({ input }) => getSchoolClubs(input)),
});
