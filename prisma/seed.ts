import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // 1. Create roles
  const admin = await prisma.role.create({
    data: {
      name: "admin",
    },
  });

  const panitia = await prisma.role.create({
    data: {
      name: "panitia",
    },
  });

  console.log("Roles created: ", { admin, panitia });

  // 2. Create users
  const adminUser = await prisma.user.create({
    data: {
      username: "admin",
      name: "Admin",
      password: "admin",
      roleId: admin.id,
    },
  });

  const panitiaUser = await prisma.user.create({
    data: {
      username: "panitia",
      name: "Panitia",
      password: "panitia",
      roleId: panitia.id,
    },
  });

  console.log("Users created: ", { adminUser, panitiaUser });

  // 3. Create Seminar
  const seminar = await prisma.seminar.create({
    data: {
      name: "Tech Conference 2025",
      date: new Date("2025-03-01T09:00:00.000Z"),
    },
  });

  console.log("Seminar created: ", seminar);

  // 4. Create Session
  const session1 = await prisma.session.create({
    data: {
      name: "AI and Machine Learning",
      date: new Date("2025-03-01T10:00:00.000Z"),
      capacity: 100,
      startTime: new Date("2025-03-01T10:00:00.000Z"),
      endTime: new Date("2025-03-01T12:00:00.000Z"),
      registrationDeadline: new Date("2025-02-28T23:59:59.000Z"),
      seminarId: seminar.id,
    },
  });

  const session2 = await prisma.session.create({
    data: {
      name: "Dummy Session",
      date: new Date("2025-03-01T10:00:00.000Z"),
      capacity: 100,
      startTime: new Date("2025-03-01T10:00:00.000Z"),
      endTime: new Date("2025-03-01T12:00:00.000Z"),
      registrationDeadline: new Date("2025-02-28T23:59:59.000Z"),
      seminarId: seminar.id,
    },
  });

  console.log("Sessions created: ", { session1, session2 });

  // 5. Create Participant
  const participant1 = await prisma.participant.create({
    data: {
      name: "Charlie Johnson",
      email: "charlie@example.com",
    },
  });

  const participant2 = await prisma.participant.create({
    data: {
      name: "David Smith",
      email: "david@example.com",
    },
  });

  const participant3 = await prisma.participant.create({
    data: {
      name: "Eva Brown",
      email: "eva@example.com",
    },
  });

  console.log("Participants created: ", {
    participant1,
    participant2,
    participant3,
  });

  // 6. Create Registration
  await prisma.registrationSessionList.create({
    data: {
      participantId: participant1.id,
      sessionId: session1.id,
    },
  });

  await prisma.registrationSessionList.create({
    data: {
      participantId: participant2.id,
      sessionId: session1.id,
    },
  });

  await prisma.registrationSessionList.create({
    data: {
      participantId: participant3.id,
      sessionId: session2.id,
    },
  });

  console.log("Registrations created");
};

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
