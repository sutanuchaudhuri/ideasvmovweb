import React from "react";
function MyProfile({ signOut, user }) {
  console.log(user);
  return (
    <>
      <h1>Hello {user.username}</h1>
      <label>Token</label>
      <div style={{ width: "50" }}>
        {" "}
        {user.signInUserSession.idToken.jwtToken}
      </div>
      <div>
        <button onClick={signOut}>Sign out</button>
      </div>
    </>
  );
}
export default MyProfile;