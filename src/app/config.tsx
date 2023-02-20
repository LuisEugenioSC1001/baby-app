import AddGiftDialog from "./pages/AddGiftDialog";
import AttendancePage from "./pages/AttendancePage";
import GiftsDialogPage from "./pages/GiftsDialogPage";
import GiftsPage from "./pages/GiftsPage";
import HomePage from "./pages/HomePage";
import MessagePage from "./pages/MessagePage";
import QRDialog from "./pages/QRDialog";
import ThanksPage from "./pages/ThanksPage";
import VideoPage from "./pages/VideoPage";

export default [
  {
    path: "home",
    element: <HomePage />,
  },
  {
    path: "message",
    element: <MessagePage />,
  },
  {
    path: "video",
    element: <VideoPage />,
  },
  {
    path: "attendance",
    element: <AttendancePage />,
  },
  {
    path: "gifts/:id",
    element: <GiftsPage />,
    children: [
      {
        path: "list",
        element: <GiftsDialogPage />,
      },
      {
        path: "create-gift",
        element: <AddGiftDialog />,
      },
      {
        path: "qr-code",
        element: <QRDialog />,
      },
    ],
  },
  {
    path: "thanks",
    element: <ThanksPage />,
  },
];
