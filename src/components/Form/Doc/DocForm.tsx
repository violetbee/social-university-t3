import { SharePost } from "../../../types/app";
import { Dispatch, SetStateAction } from "react";
import { trpc } from "../../../utils/trpc";

const DocForm = ({
  setForm,
}: {
  setForm: Dispatch<SetStateAction<SharePost>>;
}) => {
  const { data } = trpc.department.getAllDepartments.useQuery({
    schoolId: "clf456me60002vx80nqxcnz7y",
  });
  return (
    <div>
      {data &&
        data.map((department) => {
          return (
            <div key={department.departmentId}>
              <p>{department.departmentId}</p>
            </div>
          );
        })}
    </div>
  );
};

export default DocForm;
