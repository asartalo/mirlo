import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./components/ErrorPage";
import "./i18n";

// import Signup from "./components/Signup";
import Login from "./components/Login";
import { GlobalStateProvider } from "./state/GlobalState";
import Profile from "./components/Profile";
import Manage from "./components/ManageArtist/Manage";
import { SnackBarContextProvider } from "state/SnackbarContext";
import { ThemeProvider } from "@emotion/react";
import { theme } from "utils/theme";
import Admin from "components/Admin/Admin";
import AdminUsers from "components/Admin/Users";
import AdminTrackGroups from "components/Admin/Trackgroups";
import AdminTracks from "components/Admin/Tracks";
import ManageArtist from "components/ManageArtist/ManageArtist";
import Home from "components/Home";
import Artist from "components/Artist/Artist";
import TrackGroupWidget from "components/Widget/TrackGroupWidget";
import TrackWidget from "components/Widget/TrackWidget";
import Collection from "components/Profile/Collection";
import Post from "components/Post";
import PasswordReset from "components/PasswordReset";
import TrackGroup from "components/TrackGroup/TrackGroup";
import About from "components/About";
import { AuthWrapper } from "components/AuthWrapper";
import Signup from "components/Signup";
import { ArtistProvider } from "state/ArtistContext";
import FAQ from "components/FAQ";
import ManageTrackGroup from "components/ManageArtist/ManageTrackGroup";
import Releases from "components/Releases";
import ManageContainer from "components/ManageArtist/ManageContainer";
import ManageArtistContainer from "components/ManageArtist/ManageArtistContainer";
import ArtistContainer from "components/Artist/ArtistContainer";
import ProfileContainer from "components/Profile/ProfileContainer";
import WishlistCollection from "components/Profile/WishlistCollection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> },
      { path: "pages/about", element: <About /> },
      { path: "pages/faq", element: <FAQ /> },

      { path: "widget/track/:id", element: <TrackWidget /> },
      { path: "widget/trackgroup/:id", element: <TrackGroupWidget /> },
      { path: "post/:postId", element: <Post /> },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "password-reset",
        element: <PasswordReset />,
      },
      {
        path: "profile",
        element: (
          <AuthWrapper>
            <ProfileContainer />
          </AuthWrapper>
        ),
        children: [
          {
            path: "",
            element: <Profile />,
          },
          {
            path: "collection",
            element: <Collection />,
          },
          {
            path: "wishlist",
            element: <WishlistCollection />,
          },
        ],
      },

      {
        path: "manage",
        element: (
          <AuthWrapper>
            <ManageContainer />
          </AuthWrapper>
        ),
        children: [
          {
            path: "",
            element: (
              <AuthWrapper>
                <Manage />
              </AuthWrapper>
            ),
          },
          {
            path: "artists/:artistId",
            element: (
              <AuthWrapper>
                <ArtistProvider managedArtist>
                  <ManageArtistContainer />
                </ArtistProvider>
              </AuthWrapper>
            ),
            children: [
              {
                path: "",
                element: (
                  <AuthWrapper>
                    <ArtistProvider managedArtist>
                      <ManageArtist />
                    </ArtistProvider>
                  </AuthWrapper>
                ),
              },
              {
                path: "release/:trackGroupId",
                element: (
                  <AuthWrapper>
                    <ArtistProvider managedArtist>
                      <ManageTrackGroup />
                    </ArtistProvider>
                  </AuthWrapper>
                ),
              },
              {
                path: "new-release",
                element: (
                  <AuthWrapper>
                    <ArtistProvider managedArtist>
                      <ManageTrackGroup />
                    </ArtistProvider>
                  </AuthWrapper>
                ),
              },
            ],
          },
        ],
      },

      {
        path: "admin",
        element: (
          <AuthWrapper>
            <Admin />
          </AuthWrapper>
        ),
        children: [
          {
            path: "users",
            element: (
              <AuthWrapper>
                <AdminUsers />
              </AuthWrapper>
            ),
          },
          {
            path: "trackGroups",
            element: (
              <AuthWrapper>
                <AdminTrackGroups />
              </AuthWrapper>
            ),
          },
          {
            path: "tracks",
            element: (
              <AuthWrapper>
                <AdminTracks />
              </AuthWrapper>
            ),
          },
        ],
      },
      {
        path: "releases",
        element: <Releases />,
      },
      {
        path: ":artistId",
        element: (
          <ArtistProvider>
            <ArtistContainer />
          </ArtistProvider>
        ),
        children: [
          {
            path: "",
            element: <Artist />,
          },
          {
            path: "release/:trackGroupId",
            element: <TrackGroup />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStateProvider>
        <SnackBarContextProvider>
          <RouterProvider router={router} />
        </SnackBarContextProvider>
      </GlobalStateProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
