import express from "express";

import {
  getTotalPatients,
  getAppointmentsSummary,
  getAppointmentStatus,
  getTopDoctors
} from "../controllers/analyticsController.js";

import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/patients/count",
  verifyUser,
  getTotalPatients
);

router.get(
  "/appointments/summary",
  verifyUser,
  getAppointmentsSummary
);

router.get(
  "/appointments/status",
  verifyUser,
  getAppointmentStatus
);

router.get(
  "/doctors/top",
  verifyUser,
  getTopDoctors
);

export default router;