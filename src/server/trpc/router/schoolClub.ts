import { publicProcedure, router } from "../trpc";
import {
  getSchoolClubDetails,
  getSchoolClubDetailsProps,
} from "../../api/school-club/GET/detail";
import {
  getSchoolClubs,
  getSchoolClubsProps,
} from "../../api/school-club/GET/list";

export const schoolClubRouter = router({
  getSchoolClub: publicProcedure
    .input(getSchoolClubDetailsProps)
    .query(async ({ input, ctx }) => getSchoolClubDetails(input, ctx)),
  getAllSchoolClubs: publicProcedure
    .input(getSchoolClubsProps)
    .query(async ({ input, ctx }) => getSchoolClubs(input, ctx)),
});
