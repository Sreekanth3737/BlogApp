import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAction } from "../../../redux/slices/users/usersSlice";
import LoadingComponent from "../../../utils/LoadingComponent";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.users);
  const { usersList, loading, appErr, serverErr,block,unBlock } = users;
  useEffect(() => {
    dispatch(fetchAllUsersAction());
  }, [block,unBlock]);

  //data from store
  
  return (
    <>
      <section class="py-8 bg-white min-h-screen">
        {loading ? (
          <LoadingComponent />
        ) : appErr || serverErr ? (
          <h3 className="text-red-500 text-center text-lg">
            {appErr} {serverErr}
          </h3>
        ) : usersList?.length <= 0 ? (
          <h2>No User Found</h2>
        ) : (
          usersList?.map((user) => (
            <>
              <UsersListItem user={user} />
            </>
          ))
        )}
      </section>
    </>
  );
};

export default UsersList;
