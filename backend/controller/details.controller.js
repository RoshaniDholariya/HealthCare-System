const crypto = require("crypto");
const prisma = require("../config/connectDB");

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
const IV = process.env.IV

if (Buffer.from(ENCRYPTION_KEY, "hex").length !== 32) {
  throw new Error("Invalid ENCRYPTION_KEY. Must be 32 bytes in hexadecimal format.");
}

if (Buffer.from(IV, "hex").length !== 16) {
  throw new Error("Invalid IV. Must be 16 bytes in hexadecimal format.");
}

const encrypt = (text) => {
  if (!text) return null;
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY, "hex"),
    Buffer.from(IV, "hex")
  );
  let encrypted = cipher.update(text.toString(), "utf8", "hex"); // Ensure string input
  encrypted += cipher.final("hex");
  return encrypted;
};

const decrypt = (text) => {
  if (!text) return null; // Handle null/undefined
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY, "hex"),
    Buffer.from(IV, "hex")
  );
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};


const addDetails = async (req, res) => {
  const { userId, healthDetails, insuranceDetails } = req.body;

  if (!userId || !healthDetails || !insuranceDetails) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ message: "User not found" });

  try {
    const encryptedHealthStatus = encrypt(healthDetails.healthStatus);
    const encryptedBloodType = encrypt(healthDetails.bloodType);
    const encryptedAllergies = healthDetails.allergies ? encrypt(JSON.stringify(healthDetails.allergies)) : null;
    const encryptedChronicConditions = healthDetails.chronicConditions
      ? encrypt(JSON.stringify(healthDetails.chronicConditions))
      : null;
    const encryptedEmergencyContactName = healthDetails.emergencyContactName
      ? encrypt(healthDetails.emergencyContactName)
      : null;
    const encryptedEmergencyContactNumber = healthDetails.emergencyContactNumber
      ? encrypt(healthDetails.emergencyContactNumber)
      : null;
    const encryptedInsuranceProvider = encrypt(insuranceDetails.insuranceProvider);
    const encryptedPolicyNumber = encrypt(insuranceDetails.policyNumber);

    const newHealthInsurance = await prisma.healthData.create({
      data: {
        userId,
        healthStatus: encryptedHealthStatus,
        bloodType: encryptedBloodType,
        allergies: encryptedAllergies,
        chronicConditions: encryptedChronicConditions,
        emergencyContactName: encryptedEmergencyContactName,
        emergencyContactNumber: encryptedEmergencyContactNumber,
        insuranceProvider: encryptedInsuranceProvider,
        policyNumber: encryptedPolicyNumber,
        policyStartDate: new Date(insuranceDetails.policyStartDate),
        policyEndDate: new Date(insuranceDetails.policyEndDate),
      },
    });

    res.status(201).json({ message: "Details added successfully", data: newHealthInsurance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

const getUserDetails = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const healthData = await prisma.healthData.findMany({
      where: { userId: parseInt(userId) },
    });

    if (!healthData || healthData.length === 0) {
      return res.status(404).json({ message: "No health data found for this user" });
    }

    const decryptedData = healthData.map((data) => ({
      id: data.id,
      healthStatus: decrypt(data.healthStatus),
      bloodType: decrypt(data.bloodType),
      allergies: data.allergies ? JSON.parse(decrypt(data.allergies)) : null,
      chronicConditions: data.chronicConditions ? JSON.parse(decrypt(data.chronicConditions)) : null,
      emergencyContactName: data.emergencyContactName ? decrypt(data.emergencyContactName) : null,
      emergencyContactNumber: data.emergencyContactNumber ? decrypt(data.emergencyContactNumber) : null,
      insuranceProvider: decrypt(data.insuranceProvider),
      policyNumber: decrypt(data.policyNumber),
      policyStartDate: data.policyStartDate,
      policyEndDate: data.policyEndDate,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }));

    res.status(200).json({ message: "Data retrieved successfully", data: decryptedData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
const getAppointment = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: parseInt(userId) },
      include: {
        doctor: {
          select: {
            firstname: true,
            lastname: true,
            organization: {
              select: {
                name: true, // Assuming name is the organization's name field
              },
            },
          },
        },
      },
    });

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this user" });
    }

    // Combine doctor’s first and last name into a full name and include organization name
    const formattedAppointments = appointments.map((appointment) => ({
      ...appointment,
      doctorName: `${appointment.doctor.firstname} ${appointment.doctor.lastname}`,
      organizationName: appointment.doctor.organization.name,
    }));

    res.status(200).json({
      message: "Appointments retrieved successfully",
      data: formattedAppointments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

const userDetails = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: {
        appointments: {
          where: { userId: parseInt(userId) },
          include: {
            doctor: {
              select: {
                firstname: true,
                lastname: true,
                specialty: true,
              },
            },
            organization: {
              select: {
                name: true,
                address: true,
              },
            },
          },
        },
      },
    });
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const healthData = await prisma.healthData.findMany({
      where: { userId: parseInt(userId) },
    });

    const decryptedHealthData = healthData.map((data) => ({
      id: data.id,
      healthStatus: decrypt(data.healthStatus),
      bloodType: decrypt(data.bloodType),
      allergies: data.allergies ? JSON.parse(decrypt(data.allergies)) : null,
      chronicConditions: data.chronicConditions ? JSON.parse(decrypt(data.chronicConditions)) : null,
      emergencyContactName: data.emergencyContactName ? decrypt(data.emergencyContactName) : null,
      emergencyContactNumber: data.emergencyContactNumber ? decrypt(data.emergencyContactNumber) : null,
      insuranceProvider: decrypt(data.insuranceProvider),
      policyNumber: decrypt(data.policyNumber),
      policyStartDate: data.policyStartDate,
      policyEndDate: data.policyEndDate,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }));

    const response = {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      verifications: user.userVerification,
      appointments: user.appointments.map((appt) => ({
        id: appt.id,
        date: appt.date,
        startTime: appt.startTime,
        endTime: appt.endTime,
        status: appt.status,
        doctor: appt.doctor,
        organization: appt.organization,
      })),
      healthData: decryptedHealthData,
    };

    res.status(200).json({ message: "User details retrieved successfully", data: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};



module.exports = { addDetails, getUserDetails, getAppointment, userDetails };