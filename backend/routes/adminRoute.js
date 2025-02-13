const express = require("express");
const {
  addHealthCareOrganisation,
  getAllHealthCareOrganizations,
  getUsers,
  getDoctors,
  getDashboardAnalytics,
  approveHospital,
  getPendingHospitals,
} = require("../controller/admin.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const prisma = require('../config/connectDB')
const router = express.Router();
router.get("/pending-hospitals",getPendingHospitals);
router.post("/approveHospital",approveHospital);
router.post("/add", authMiddleware, addHealthCareOrganisation);
router.get("/org", authMiddleware, getAllHealthCareOrganizations);
router.get("/users", authMiddleware, getUsers);
router.get("/doctor", authMiddleware, getDoctors);
router.get("/analytics/dashboard", authMiddleware, getDashboardAnalytics);

router.delete("/organizations/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const organizationId = parseInt(id);

    await prisma.$transaction(async (tx) => {
      const doctors = await tx.doctor.findMany({
        where: { organizationId },
        select: { id: true }
      });

      const doctorIds = doctors.map(d => d.id);

      await tx.appointment.deleteMany({
        where: { doctorId: { in: doctorIds } }
      });

      await tx.schedule.deleteMany({
        where: { doctorId: { in: doctorIds } }
      });

      await tx.doctor.deleteMany({
        where: { organizationId }
      });
      await tx.organization.delete({
        where: { id: organizationId }
      });
    });

    res.status(200).json({
      message: "Organization and all related records deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting organization:", error);
    res.status(500).json({
      error: "Failed to delete organization",
      details: error.message
    });
  }
});


router.put("/organizations/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    address,
    latitude,
    longitude,
    contact,
    status,
    email,
    password,
    services,
    accessId,
    specialities,
  } = req.body;

  try {
    // Update the organization by ID
    const updatedOrganization = await prisma.organization.update({
      where: { id: parseInt(id) }, // Ensure id is parsed to an integer
      data: {
        name,
        address,
        latitude,
        longitude,
        contact,
        status,
        email,
        password,
        services,
        accessId,
        specialities,
      },
    });

    res.status(200).json({
      message: "Organization updated successfully",
      organization: updatedOrganization,
    });
  } catch (error) {
    console.error("Error updating organization:", error);
    res.status(500).json({
      error: "Failed to update organization",
      details: error.message,
    });
  }
});
module.exports = router;