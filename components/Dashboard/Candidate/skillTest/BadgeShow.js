import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Badge from "./Badge";

const BadgeShow = () => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const [result, setResult] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://corporate-zone-backend-main.vercel.app/skill/${loggedInUser?.email}`
      )
      .then(function (response) {
        setResult(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [loggedInUser?.email]);

  return (
    <>
      {result.length === 0 ? (
        <div>
          <p className="font-semibold text-red-700 leading-8">
            You have no skill test badges.
            <br />
            Go to the&nbsp;
            <Link href={`/dashboard/skillTest`}>
              <a className="bg-blue-600 text-white rounded cursor-pointer p-2">
                Skill Test
              </a>
            </Link>
            &nbsp;to earn the skill badge.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-3">
          {result?.map((r) => (
            <Badge key={r._id} badge={r?.technology} />
          ))}
        </div>
      )}
    </>
  );
};

export default BadgeShow;
