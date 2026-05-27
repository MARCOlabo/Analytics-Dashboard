import adapterAPI from "../services/adapterService.js";
import mrmsAPI from "../services/mrmsService.js";

export const getTotalPatients = async (req, res) => {

  try {
    const response = await adapterAPI.get("/api/patients");
    const patients = response.data;

    res.status(200).json({
      totalPatients: patients.length
    });

  } catch (error) {

    res.status(503).json({
      message: "Adapter Layer unavailable"
    });
  }
};

export const getAppointmentsSummary = async (req, res) => {

  try {
    const response = await adapterAPI.get("/api/appointments");
    const appointments = response.data;
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    const dailyAppointments = appointments.filter(app => {

      return new Date(app.date).toDateString()
      === today.toDateString();

    });

    const weeklyAppointments = appointments.filter(app => {

      return new Date(app.date) >= lastWeek;

    });

    res.status(200).json({
      dailyAppointments: dailyAppointments.length,
      weeklyAppointments: weeklyAppointments.length
    });

  } catch (error) {

    res.status(503).json({
      message: "Unable to retrieve appointments"
    });
  }
};

export const getAppointmentStatus = async (req, res) => {

  try {
    const response = await adapterAPI.get("/api/appointments");
    const appointments = response.data;
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    const completedDaily = appointments.filter(app => {

      return app.status === "completed" &&
      new Date(app.date).toDateString()
      === today.toDateString();
    });

    const completedWeekly = appointments.filter(app => {

      return app.status === "completed" &&
      new Date(app.date) >= lastWeek;
    });

    const cancelledDaily = appointments.filter(app => {

      return app.status === "cancelled" &&
      new Date(app.date).toDateString()
      === today.toDateString();
    });

    const cancelledWeekly = appointments.filter(app => {

      return app.status === "cancelled" &&
      new Date(app.date) >= lastWeek;
    });

    res.status(200).json({
      completed: {
        daily: completedDaily.length,
        weekly: completedWeekly.length
      },
      cancelled: {
        daily: cancelledDaily.length,
        weekly: cancelledWeekly.length
      }
    });

  } catch (error) {

    res.status(503).json({
      message: "Unable to retrieve appointment analytics"
    });
  }
};

export const getTopDoctors = async (req, res) => {

  try {
    const response = await mrmsAPI.get("/api/records");
    const records = response.data;
    const doctorMap = {};

    records.forEach(record => {
      const doctor = record.doctorName;
      if (!doctorMap[doctor]) {
        doctorMap[doctor] = 0;
      }
      doctorMap[doctor]++;
    });

    const topDoctors = Object.entries(doctorMap)
      .map(([doctorName, count]) => ({
        doctorName,
        appointmentsHandled: count
      }))
      .sort((a, b) => b.appointmentsHandled - a.appointmentsHandled)
      .slice(0, 3);

    res.status(200).json({
      topDoctors
    });

  } catch (error) {
    res.status(503).json({
      message: "MRMS unavailable"
    });
  }
};